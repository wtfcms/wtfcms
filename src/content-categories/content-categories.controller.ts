import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { BadGatewayException, BadRequestException, Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { ContentCategory } from 'src/entities';
import { ObjectIdIsValid } from '@app/shared';
import { FindOptionsDto } from '@app/shared/dtos/query.dto';

@Controller('content-categories')
export class ContentCategoriesController {
  constructor(
    @InjectRepository(ContentCategory)
    private readonly contentCategoryRepository: EntityRepository<
      ContentCategory
    >,
  ) {}

  @Get()
  async find(@Query() findOption: FindOptionsDto) {
    console.log(findOption);
    const [collection, count] = await this.contentCategoryRepository.findAndCount(
      {},
      {
        populate: ['parentContentCategory', 'contents'],
        ...findOption
      },
    );
    // console.log(findOption, query);
    return {
      collection,
      count,
      ...findOption,
      // ...query,
    };
  }
  
  // @Get()
  // async findAll() {
  //   const contentCategories = await this.contentCategoryRepository.findAll();
  //   return {
  //     data: contentCategories,
  //     status: 200,
  //     message: '',
  //   };
  //   return {
  //     status: 200,
  //     data: [
  //       {
  //         uid: 0,
  //         type: '2',
  //         sortId: 1,
  //         parentId: '0',
  //         enable: true,
  //         defaultUrl: 'app',
  //         homePage: 'ui',
  //         sortPath: '0,KT-ntFCBx',
  //         _id: '5f7a971db777e22372f40608',
  //         name: '宠物公益领养',
  //         contentTemp: 'NF5XTITnf',
  //         comments: '22222222',
  //         sImg: '',
  //         date: '2020-07-30 13:03:19',
  //         __v: 0,
  //         keywords: null,
  //         id: 'KT-ntFCBx',
  //       },
  //     ],
  //     message: '',
  //   };
  // }

  @Post()
  async create(@Body() fields) {
    let parentContentCategory;
    const contentCategory = new ContentCategory();
    contentCategory.name = fields.name;

    // 兼容中文逗号
    if (fields.keywords) {
      const reg = new RegExp('，', 'g');
      contentCategory.keywords = fields.keywords.replace(reg, ',');
    }

    contentCategory.sortId = fields.sortId;

    // 针对子类自动继承父类的模板
    // if (fields.parentId != '0') {
    //   let parentCate = await ctx.service.contentCategory.item(ctx, {
    //     query: {
    //       _id: fields.parentId,
    //     },
    //   });

    //   if (!_.isEmpty(parentCate)) {
    //     formObj.contentTemp = parentCate.contentTemp;
    //   }
    // }
    if (fields.parentId && ObjectIdIsValid(fields.parentId)) {
      parentContentCategory = await this.contentCategoryRepository.findOne({
        id: fields.parentId,
      });
      contentCategory.parentContentCategory = parentContentCategory;
    }

    contentCategory.enable = fields.enable;
    contentCategory.defaultUrl = fields.defaultUrl;
    // contentCategory.contentTemp = fields.contentTemp
    contentCategory.comments = fields.comments;
    contentCategory.sImg = fields.sImg;
    contentCategory.type = fields.type;

    // ctx.validate(contentCategoryRule(ctx), formObj);

    // let cateObj = await ctx.service.contentCategory.create(formObj);
    // // 更新sortPath defaultUrl
    // let newQuery = {};
    // if (fields.parentId == '0') {
    //   newQuery.sortPath = '0,' + cateObj._id;
    // } else {
    //   let parentObj = await ctx.service.contentCategory.item(ctx, {
    //     query: {
    //       _id: fields.parentId,
    //     },
    //     files: 'sortPath defaultUrl',
    //   });
    //   newQuery.sortPath = parentObj.sortPath + ',' + cateObj._id;
    //   newQuery.defaultUrl = parentObj.defaultUrl + '/' + fields.defaultUrl;
    // }
    // await ctx.service.contentCategory.update(ctx, cateObj._id, newQuery);

    // ctx.helper.renderSuccess(ctx);

    await this.contentCategoryRepository.persistAndFlush(contentCategory);

    if (fields.parentId && ObjectIdIsValid(fields.parentId)) {
      contentCategory.sortPath =
        parentContentCategory.sortPath + ',' + contentCategory.id;
      contentCategory.defaultUrl =
        parentContentCategory + '/' + fields.defaultUrl;
    } else {
      contentCategory.sortPath = '0' + ',' + contentCategory.id;
    }

    await this.contentCategoryRepository.flush();

    return contentCategory;
  }

  @Delete(':ids')
  async delete(@Param('ids') ids) {
    if (ids.includes(',')) {
      // const idList = ids.split(',');
      // await this.contentTagRepository.nativeDelete({
      //   id: {
      //     $in: idList,
      //   },
      // });
      // return null;
    } else {
      const contentCategoryRepository = await this.contentCategoryRepository.findOne({
        id: ids
      }, ['contents', 'subContentCategories'])
      console.log(contentCategoryRepository)

      if (contentCategoryRepository.contents && contentCategoryRepository.contents.length) {
        throw new BadRequestException('请先删除该分类下的文章！')
      }

      if (contentCategoryRepository.subContentCategories && contentCategoryRepository.subContentCategories.length) {
        throw new BadGatewayException('请先删除该分类下的子分类！')
      }

      await this.contentCategoryRepository.removeAndFlush(contentCategoryRepository)

      return null;
    }
  }
}
