import { FindOptionsDto } from '@app/shared/dtos/query.dto';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import {
  BadGatewayException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  IsDefined,
  IsNotEmpty,
  isNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { ContentTag } from 'src/entities';

class FindDTO {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;
}

class UpdateOneDTO {
  @IsOptional()
  name: string;

  @IsOptional()
  alias: string;

  @IsOptional()
  comments: string;
}

@Controller('content-tags')
export class ContentTagsController {
  constructor(
    @InjectRepository(ContentTag)
    private readonly contentTagRepository: EntityRepository<ContentTag>,
  ) {}

  @Get(':id')
  async findOne(@Param('id') id) {
    return await this.contentTagRepository.findOne(id);
  }

  @Get()
  async find(@Query() findOption: FindOptionsDto, @Query() query: FindDTO) {
    console.log(findOption, query);
    const [collection, count] = await this.contentTagRepository.findAndCount(
      query,
      findOption,
    );
    console.log(findOption, query);
    return {
      collection,
      count,
      ...findOption,
      ...query,
    };
  }

  @Post()
  async create(@Body() body) {
    const contentTag = new ContentTag({ name: body.name });
    contentTag.comments = body.comments;
    contentTag.alias = body.alias;
    await this.contentTagRepository.persistAndFlush(contentTag);
    return contentTag;
  }

  @Put(':id')
  async updateOne(@Param('id') id, @Body() body: UpdateOneDTO) {
    const contentTag = await this.contentTagRepository.findOneOrFail(id);
    wrap(contentTag).assign(body);
    await this.contentTagRepository.flush();
    return contentTag;
  }

  @Delete(':ids')
  async delete(@Param('ids') ids) {
    if (ids.includes(',')) {
      const idList = ids.split(',');
      await this.contentTagRepository.nativeDelete({
        id: {
          $in: idList,
        },
      });
      return null;
    } else {
      const contentTag = this.contentTagRepository.getReference(ids);
      return this.contentTagRepository.remove(contentTag);
    }
  }
}
