import {
  Controller,
  Render,
  Get,
  Header,
  Response,
  Post, Query
} from '@nestjs/common';
import { SystemConfig, AdminUser } from 'src/entities';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/core';
import { JwtService } from '@nestjs/jwt';
const captcha = require('trek-captcha');

@Controller('api')
export class ApiController {
  constructor(
    @InjectRepository(SystemConfig)
    private readonly systemConfigRepository: EntityRepository<SystemConfig>,
    @InjectRepository(AdminUser)
    private readonly adminUserRepository: EntityRepository<AdminUser>,
    private readonly jwtService: JwtService,
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

  @Post('doLogin')
  async loginAction() {
    // try {
    /**
     * 1、获取系统配置--是否启用验证码
     * 如果启用了验证码则验证验证码
     * 2、如果参数验证
     * 3、验证通过到则到数据库查找用户
     * 4、找到用户同时
     */

    // const systemConfig = await this.systemConfigRepository.findOne({});

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

    const id = '5f60d8b9c1975903bad7214f';
    return this.jwtService.sign(
      {
        id,
      },
      {
        secret: 'wtfcms',
        expiresIn: '30d',
      },
    );
  }

  @Get('getUserSession')
  async getUserSession() {
    let noticeCounts = 0;
    // if (!_.isEmpty(ctx.service.systemNotify)) {
    //   noticeCounts = await ctx.service.systemNotify.count({
    //     systemUser: ctx.session.adminUserInfo._id,
    //     isRead: false,
    //   });
    // }

    // let adminUserInfo = await ctx.service.adminUser.item(ctx, {
    //   query: {
    //     _id: ctx.session.adminUserInfo._id,
    //   },
    //   populate: [
    //     {
    //       path: 'group',
    //       select: 'power _id enable name',
    //     },
    //     {
    //       path: 'targetEditor',
    //       select: 'userName _id',
    //     },
    //   ],
    //   files: 'enable password _id email userName logo',
    // });

    // let renderData = {
    //   noticeCounts,
    //   loginState: true,
    //   userInfo: adminUserInfo,
    // };
    const id = '5f60d8b9c1975903bad7214f';
    const adminUser = await this.adminUserRepository.findOne(id, [
      'group',
      'targetEditor',
    ]);
    const data = {
      noticeCounts,
      loginState: true,
      userInfo: adminUser,
    };

    return {
      data,
      message: '',
      status: 200,
    };
  }

  @Get('upload/ueditor')
  ueditor(@Query('callback') callback: string) {
    return `${callback}({"imageActionName":"uploadimage","imageFieldName":"upfile","imageMaxSize":2048000,"imageAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp"],"imageCompressEnable":true,"imageCompressBorder":1600,"imageInsertAlign":"none","imageUrlPrefix":"","imagePathFormat":"/upload/images/{yyyy}{mm}{dd}/{time}{rand:6}","scrawlActionName":"uploadscrawl","scrawlFieldName":"upfile","scrawlPathFormat":"/upload/images/{yyyy}{mm}{dd}/{time}{rand:6}","scrawlMaxSize":2048000,"scrawlUrlPrefix":"","scrawlInsertAlign":"none","snapscreenActionName":"uploadimage","snapscreenPathFormat":"/upload/images/{yyyy}{mm}{dd}/{time}{rand:6}","snapscreenUrlPrefix":"","snapscreenInsertAlign":"none","catcherLocalDomain":["127.0.0.1","localhost","img.baidu.com"],"catcherActionName":"catchimage","catcherFieldName":"source","catcherPathFormat":"/upload/images/{yyyy}{mm}{dd}/{time}{rand:6}","catcherUrlPrefix":"","catcherMaxSize":2048000,"catcherAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp"],"videoActionName":"uploadvideo","videoFieldName":"upfile","videoPathFormat":"/upload/video/{yyyy}{mm}{dd}/{time}{rand:6}","videoUrlPrefix":"","videoMaxSize":102400000,"videoAllowFiles":[".flv",".swf",".mkv",".avi",".rm",".rmvb",".mpeg",".mpg",".ogg",".ogv",".mov",".wmv",".mp4",".webm",".mp3",".wav",".mid"],"fileActionName":"uploadfile","fileFieldName":"upfile","filePathFormat":"/upload/file/{yyyy}{mm}{dd}/{time}{rand:6}","fileUrlPrefix":"","fileMaxSize":51200000,"fileAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp",".flv",".swf",".mkv",".avi",".rm",".rmvb",".mpeg",".mpg",".ogg",".ogv",".mov",".wmv",".mp4",".webm",".mp3",".wav",".mid",".rar",".zip",".tar",".gz",".7z",".bz2",".cab",".iso",".doc",".docx",".xls",".xlsx",".ppt",".pptx",".pdf",".txt",".md",".xml"],"imageManagerActionName":"listimage","imageManagerListPath":"/upload/images/","imageManagerListSize":20,"imageManagerUrlPrefix":"","imageManagerInsertAlign":"none","imageManagerAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp"],"fileManagerActionName":"listfile","fileManagerListPath":"/upload/file/","fileManagerUrlPrefix":"","fileManagerListSize":20,"fileManagerAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp",".flv",".swf",".mkv",".avi",".rm",".rmvb",".mpeg",".mpg",".ogg",".ogv",".mov",".wmv",".mp4",".webm",".mp3",".wav",".mid",".rar",".zip",".tar",".gz",".7z",".bz2",".cab",".iso",".doc",".docx",".xls",".xlsx",".ppt",".pptx",".pdf",".txt",".md",".xml"],"upload_path":"/home/wwwroot/cms/app/public","static_root_path":"cms"})`
    // return {"imageActionName":"uploadimage","imageFieldName":"upfile","imageMaxSize":2048000,"imageAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp"],"imageCompressEnable":true,"imageCompressBorder":1600,"imageInsertAlign":"none","imageUrlPrefix":"","imagePathFormat":"/upload/images/{yyyy}{mm}{dd}/{time}{rand:6}","scrawlActionName":"uploadscrawl","scrawlFieldName":"upfile","scrawlPathFormat":"/upload/images/{yyyy}{mm}{dd}/{time}{rand:6}","scrawlMaxSize":2048000,"scrawlUrlPrefix":"","scrawlInsertAlign":"none","snapscreenActionName":"uploadimage","snapscreenPathFormat":"/upload/images/{yyyy}{mm}{dd}/{time}{rand:6}","snapscreenUrlPrefix":"","snapscreenInsertAlign":"none","catcherLocalDomain":["127.0.0.1","localhost","img.baidu.com"],"catcherActionName":"catchimage","catcherFieldName":"source","catcherPathFormat":"/upload/images/{yyyy}{mm}{dd}/{time}{rand:6}","catcherUrlPrefix":"","catcherMaxSize":2048000,"catcherAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp"],"videoActionName":"uploadvideo","videoFieldName":"upfile","videoPathFormat":"/upload/video/{yyyy}{mm}{dd}/{time}{rand:6}","videoUrlPrefix":"","videoMaxSize":102400000,"videoAllowFiles":[".flv",".swf",".mkv",".avi",".rm",".rmvb",".mpeg",".mpg",".ogg",".ogv",".mov",".wmv",".mp4",".webm",".mp3",".wav",".mid"],"fileActionName":"uploadfile","fileFieldName":"upfile","filePathFormat":"/upload/file/{yyyy}{mm}{dd}/{time}{rand:6}","fileUrlPrefix":"","fileMaxSize":51200000,"fileAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp",".flv",".swf",".mkv",".avi",".rm",".rmvb",".mpeg",".mpg",".ogg",".ogv",".mov",".wmv",".mp4",".webm",".mp3",".wav",".mid",".rar",".zip",".tar",".gz",".7z",".bz2",".cab",".iso",".doc",".docx",".xls",".xlsx",".ppt",".pptx",".pdf",".txt",".md",".xml"],"imageManagerActionName":"listimage","imageManagerListPath":"/upload/images/","imageManagerListSize":20,"imageManagerUrlPrefix":"","imageManagerInsertAlign":"none","imageManagerAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp"],"fileManagerActionName":"listfile","fileManagerListPath":"/upload/file/","fileManagerUrlPrefix":"","fileManagerListSize":20,"fileManagerAllowFiles":[".png",".jpg",".jpeg",".gif",".bmp",".flv",".swf",".mkv",".avi",".rm",".rmvb",".mpeg",".mpg",".ogg",".ogv",".mov",".wmv",".mp4",".webm",".mp3",".wav",".mid",".rar",".zip",".tar",".gz",".7z",".bz2",".cab",".iso",".doc",".docx",".xls",".xlsx",".ppt",".pptx",".pdf",".txt",".md",".xml"],"upload_path":"/home/wwwroot/cms/app/public","static_root_path":"cms"}
    return {
      // imageActionName:"uploadimage"
      name: 'wujingquan'
    }
    // return [{name: 'wujingquan'}]
    // return `"{"name":"wujingquan"}"`
  }

  @Get('getMyTemplateList')
  async getMyTemplateList() {
    return {"status":200,"data":[{"alias":"dorawhite","version":["2.1.4"],"items":[{"forder":"1-stage-1","cateName":"contentList","detailName":"detail","isDefault":false,"_id":"NF5XTITnf","name":"123","date":"2020-07-30T05:17:15.460Z","__v":0},{"forder":"1-stage-default","cateName":"contentList","detailName":"detail","isDefault":false,"_id":"bladFxsFO","name":"456","date":"2020-07-30T05:31:26.412Z","__v":0},{"forder":"2-stage-default","cateName":"contentList","detailName":"detail","isDefault":true,"_id":"mmhoHbz96","name":"789","date":"2020-07-30T05:32:53.730Z","__v":0}],"sImg":"https://cdn.html-js.cn/cmsSource20181003155429.jpg","author":"doramart","using":true,"_id":"E1_CLUvEl","name":"dora简约","__v":1,"comment":"DoraCMS默认模板，用最基础的白色展现页面，希望大家喜欢","date":"2015-12-02T03:38:31.188Z"}],"message":""}
  }
}
