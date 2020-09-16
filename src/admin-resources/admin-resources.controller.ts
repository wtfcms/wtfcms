import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  BadRequestException,
  Body,
  Param,
} from '@nestjs/common';
import { AdminResource, AdminGroup, AdminUser } from 'src/entities';
import { AdminResourcesService } from './admin-resources.service';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { AdminUsersService } from 'src/admin-users/admin-users.service';
import { data } from './data';

@Controller('admin-resources')
export class AdminResourcesController {
  constructor(
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: EntityRepository<AdminUser>,
    @InjectRepository(AdminResource)
    private readonly adminResourcesRepository: EntityRepository<AdminResource>,
    @InjectRepository(AdminGroup)
    private readonly adminGroupRepository: EntityRepository<AdminGroup>,
    private readonly adminResourcesService: AdminResourcesService,
  ) {}

  @Get('getListByPower')
  async getListByPower() {
    return data;
    const payload = {
      isPaging: '0',
    };

    Object.assign(payload, {
      pageSize: 1000,
    });
    let manageCates = await this.adminResourcesRepository.find({});
    /**
     * 通过ID查找管理员信息
     * 通过管理员的group字段，查出该管理员所在用户组
     * 通过用户组的记录的对应的权限，到admin-resource表查询具体权限
     *
     */
    const id = '5f60d8b9c1975903bad7214f';
    const adminPower = await this.getAdminPower(id);
    console.log(manageCates, adminPower);
    return this.renderNoPowerMenus(manageCates, adminPower);

    // return adminPower
  }

  @Get(':id')
  findOne() {
    return 'wtfcms3';
  }

  @Get()
  async find() {
    // return await this.adminResourcesRepository.find({});
    return 'wtfcms1';
  }

  @Post()
  async create(@Body() body) {
    const adminResource = new AdminResource();
    wrap(adminResource).assign(body);
    await this.adminResourcesRepository.persistAndFlush(adminResource);
    return adminResource;
  }

  private async getAdminPower(id: string) {
    const adminUser = await this.adminUserRepository.findOne(
      {
        id,
      },
      ['group'],
    );

    return adminUser.group.power || {};
  }

  private async renderNoPowerMenus(manageCates, adminPower, buildTree = true) {
    let newResources = [],
      newRootCates = [];

    let rootCates = manageCates.filter((item) => {
      return item.parentId === '0';
    });

    let menuCates = manageCates.filter((item) => {
      return item.type === '0' && item.parentId !== '0';
    });

    let optionCates = manageCates.filter((item) => {
      return item.type !== '0';
    });

    if (adminPower.length) {
      // 是否显示子菜单
      for (let i = 0; i < menuCates.length; i++) {
        let resourceObj = JSON.parse(JSON.stringify(menuCates[i]));
        let cateFlag = this.checkNoAllPower(
          resourceObj,
          optionCates,
          adminPower,
        );
        if (!cateFlag) {
          newResources.push(resourceObj);
        }
      }

      // 是否显示大菜单
      for (const cate of rootCates) {
        let filterSubCates = newResources.filter((item) => {
          return item.parentId === cate._id;
        });
        if (filterSubCates.length) {
          newResources.push(cate);
        }
      }
    }
    let allResources = newResources.concat(newRootCates);
    let renderResources = buildTree
      ? this.buildTree(allResources)
      : allResources;
    return renderResources;
  }

  /**
   * 将一维的扁平数组转换为多层级对象
   * @param  {[type]} list 一维数组，数组中每一个元素需包含id和parentId两个属性
   * @return {[type]} tree 多层级树状结构
   */
  private buildTree(list) {
    let currentArr = [];
    let temp = {};
    let tree = {};
    for (let i in list) {
      temp[list[i]._id] = list[i];
    }
    for (let i in temp) {
      if (temp[i].parentId && temp[i].parentId != '0') {
        if (!temp[temp[i].parentId].children) {
          temp[temp[i].parentId].children = new Array();
        }
        let currentTemp = this.renderTemp(temp[i]);
        temp[temp[i].parentId].children.push(currentTemp);
      } else {
        tree[temp[i]._id] = this.renderTemp(temp[i], true);
      }
    }
    for (var item in tree) {
      currentArr.push(tree[item]);
    }
    return currentArr;
  }

  // 子菜单都无权限校验
  private checkNoAllPower(resourceId, childCates, power) {
    console.log(resourceId, childCates, power);
    let cateFlag = true;
    let rootCates = childCates.filter((doc) => {
      return doc.parentId == resourceId;
    });
    for (const cate of rootCates) {
      if (power.indexOf(cate._id) > -1) {
        cateFlag = false;
        break;
      }
    }
    return cateFlag;
  }

  private renderTemp(temp, parent = false) {
    let renderTemp: any = {};
    if (parent) {
      renderTemp.alwaysShow = true;
    }
    renderTemp.path = '/admin/' + temp.routePath;
    renderTemp.hidden = !temp.enable;
    renderTemp.icon = temp.icon;
    renderTemp.name = temp.comments;
    renderTemp.children = temp.children;
    renderTemp.api = temp.api;
    renderTemp.redirect = temp.parentId == '0' ? 'noRedirect' : '';
    renderTemp.meta = {
      title: temp.comments,
    };
    if (renderTemp.icon) {
      renderTemp.meta.icon = temp.icon;
    }

    return renderTemp;
  }
}
