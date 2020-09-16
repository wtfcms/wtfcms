import {
  Controller,
  Render,
  Get,
  Header,
  Response,
  Post,
} from '@nestjs/common';
import { SystemConfig } from 'src/entities/SystemConfig';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
const captcha = require('trek-captcha');

@Controller('api')
export class ApiController {
  constructor(
    @InjectRepository(SystemConfig)
    private readonly systemConfigRepository: EntityRepository<SystemConfig>,
  ) {}

  @Get('getImgCode')
  async getImgCode(@Response() res) {
    const { token, buffer } = await captcha();
    res.type('image/png');
    res.send(buffer);
  }

  @Get('createQRCode')
  createQRCode() {}

  @Get('systemConfig/getConfig')
  list() {}

  @Post('admin/doLogin')
  async loginAction() {
    // try {
    /**
     * 1、获取系统配置--是否启用验证码
     * 如果启用了验证码则验证验证码
     * 2、如果参数验证
     * 3、验证通过到则到数据库查找用户
     * 4、找到用户同时
     */

    const systemConfig = await this.systemConfigRepository.findOne({});

    //   let user = await ctx.service.adminUser.item(ctx, {
    //     query: formObj,
    //     populate: [
    //       {
    //         path: 'group',
    //         select: 'power _id enable name',
    //       },
    //       {
    //         path: 'targetEditor',
    //         select: 'userName _id',
    //       },
    //     ],
    //     files: 'enable password _id email userName logo',
    //   });

    //   if (!_.isEmpty(user)) {
    //     let userPsd = user.password;
    //     // 兼容老的加密方式
    //     if (
    //       userPsd !==
    //         CryptoJS.MD5(
    //           this.app.config.salt_md5_key + fields.password,
    //         ).toString() &&
    //       fields.password !=
    //         ctx.helper.decrypt(userPsd, this.app.config.encrypt_key)
    //     ) {
    //       throw new Error(ctx.__('validate_login_notSuccess'));
    //     }

    //     if (!user.enable) {
    //       throw new Error(ctx.__('validate_user_forbiden'));
    //     }

    //     let adminUserToken = jwt.sign(
    //       {
    //         _id: user._id,
    //       },
    //       this.app.config.encrypt_key,
    //       {
    //         expiresIn: '30day',
    //       },
    //     );

    //     ctx.cookies.set(
    //       'admin_' + this.app.config.auth_cookie_name,
    //       adminUserToken,
    //       {
    //         path: '/',
    //         maxAge: this.app.config.adminUserMaxAge,
    //         signed: true,
    //         httpOnly: false,
    //       },
    //     ); //cookie 有效期30天

    //     // 记录登录日志
    //     let clientIp =
    //       ctx.header['x-forwarded-for'] ||
    //       ctx.header['x-real-ip'] ||
    //       ctx.request.ip;
    //     let loginLog = {
    //       type: 'login',
    //       logs: user.userName + ' login，ip:' + clientIp,
    //     };

    //     if (!_.isEmpty(ctx.service.systemOptionLog)) {
    //       await ctx.service.systemOptionLog.create(loginLog);
    //     }

    //     ctx.helper.renderSuccess(ctx, {
    //       data: {
    //         token: adminUserToken,
    //       },
    //     });
    //   } else {
    //     ctx.helper.renderFail(ctx, {
    //       message: ctx.__('validate_login_notSuccess'),
    //     });
    //   }
    // } catch (err) {
    //   // console.log('--err--', err)
    //   ctx.helper.renderFail(ctx, {
    //     message: err,
    //   });
    // }
  }
}
