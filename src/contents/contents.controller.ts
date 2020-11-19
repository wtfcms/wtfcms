import { Collection, EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Content, ContentCategory, ContentTag } from 'src/entities';
import _ from 'lodash';
import xss from 'xss';
import { ObjectIdIsValid } from '@app/shared';

@Controller('contents')
export class ContentsController {
  constructor(
    @InjectRepository(Content)
    private readonly contentRepository: EntityRepository<Content>,
    @InjectRepository(ContentCategory)
    private readonly contentCategoryRepository: EntityRepository<
      ContentCategory
    >,
    @InjectRepository(ContentTag)
    private readonly contentTagRepository: EntityRepository<ContentTag>,
  ) {}

  @Get('getRandomContentImg')
  async getRandomContentImg() {
    return { status: 200, data: [], message: '' };
  }

  @Get()
  async findAll() {
    const content = await this.contentRepository.findAll(['tags']);
    // const content = await this.contentRepository.findAll();
    return {
      status: 200,
      message: '',
      data: content,
    };
  }

  @Post()
  async create(@Body() fields) {
    let targetKeyWords = [];
    if (fields.keywords) {
      if (fields.keywords.indexOf(',') >= 0) {
        targetKeyWords = fields.keywords.split(',');
      } else if (fields.keywords.indexOf('，') >= 0) {
        targetKeyWords = fields.keywords.split('，');
      }
    }

    const content = new Content();

    content.title = fields.title;
    content.stitle = fields.stitle;
    content.type = fields.type;
    
    const tt = await this.contentCategoryRepository.find({
      id: fields.categories
    })
    content.categories.set(tt)
    
    // content.categories.set(fields.categories.map((id) =>
    //   this.contentCategoryRepository.getReference(id),
    // ))
    content.sortPath = fields.sortPath;

    

    const { true: ids, false: nameList = [] } = _.groupBy(
      fields.tags,
      ObjectIdIsValid,
    );
    const tags = await this.contentTagRepository.find({
      $or: [{ id: ids }, { name: [...ids, ...nameList] }],
    });
    content.tags = fields.tags.map((item) => {
      console.log('item', item, typeof tags[0].id);
      let contentTag = tags.find((tag) => tag.name === item || tag.id === item);
      if (!contentTag) {
        contentTag = new ContentTag({ name: item });
      }
      return contentTag;
    });

    content.keywords = targetKeyWords;
    content.sImg = fields.sImg;
    content.sImgType = fields.sImgType
    content.cover = fields.cover
    // content.author = !_.isEmpty(ctx.session.adminUserInfo) ? ctx.session.adminUserInfo._id : ''
    content.state = fields.state,
    content.dismissReason = fields.dismissReason,
    content.isTop = fields.isTop,
    content.discription = xss(fields.discription),
    content.comments = fields.comments,
    content.simpleComments = xss(fields.simpleComments),
    // content.likeUserIds = [],
    content.type = fields.type

    // 设置显示模式
    // let checkInfo = siteFunc.checkContentType(formObj.simpleComments);
    // formObj.appShowType = checkInfo.type;
    // formObj.imageArr = checkInfo.imgArr;
    // formObj.videoArr = checkInfo.videoArr;
    // if (checkInfo.type == '3') {
    //     formObj.videoImg = checkInfo.defaultUrl;
    // }
    // formObj.simpleComments = siteFunc.renderSimpleContent(formObj.simpleComments, checkInfo.imgArr, checkInfo.videoArr);


    // 如果是管理员代发,则指定用户
    // if (ctx.session.adminUserInfo && fields.targetUser) {
    //   content.uAuthor = fields.targetUser;
    // }
    await this.contentRepository.persistAndFlush(content);
    // return content.id
    return content;

    // ctx.helper.renderSuccess(ctx, {
    //   data: {
    //     id: newContent._id,
    //   },
    // });
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
      // const content = this.contentRepository.getReference(ids)
      const content = await this.contentRepository.findOne(ids)
      await this.contentRepository.removeAndFlush(content)

      return null;
    }
  }

  private checkContentFormData(ctx, fields) {
    // let errMsg = '';
    // if (fields._id && !checkCurrentId(fields._id)) {
    //     errMsg = ctx.__("validate_error_params");
    // }
    // if (!validatorUtil.isRegularCharacter(fields.title)) {
    //     errMsg = ctx.__("validate_error_field", [ctx.__("label_content_title")]);
    // }
    // if (!validator.isLength(fields.title, 2, 50)) {
    //     errMsg = ctx.__("validate_rangelength", [ctx.__("label_content_title"), 2, 50]);
    // }
    // if (fields.stitle && !validator.isLength(fields.stitle, 2, 50)) {
    //     errMsg = ctx.__("validate_rangelength", [ctx.__("label_content_stitle"), 2, 50]);
    // }
    // if (!fields.tags) {
    //     errMsg = ctx.__("validate_selectNull", [ctx.__("label_content_tags")]);
    // }
    // if (!fields.categories) {
    //     errMsg = ctx.__("validate_userContent_category");
    // }
    // if (!fields.sImg) {
    //     errMsg = ctx.__("validate_selectNull", [ctx.__("lc_small_images")]);
    // }
    // if (!validator.isLength(fields.discription, 5, 300)) {
    //     errMsg = ctx.__("validate_rangelength", [ctx.__("label_content_dis"), 5, 300]);
    // }
    // if (fields.comments && !validator.isLength(fields.comments, 5, 100000)) {
    //     errMsg = ctx.__("validate_rangelength", [ctx.__("label_content_comments"), 5, 100000]);
    // }
    // if (errMsg) {
    //     throw new Error(errMsg);
    // }
  }

  private async getEnableCateList(isSingerPage) {
    const enableCates = await this.contentCategoryRepository.find({
      enable: true,
      type: isSingerPage ? '2' : '1',
    });
    let queryCate = enableCates.map((item) => {
      const reg = new RegExp(item.id, 'i');
      return item.id;
    });
    return queryCate;
  }
}
