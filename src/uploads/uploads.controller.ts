import { Body, Controller, Post } from '@nestjs/common';
import dayjs from 'dayjs';
import fs from 'fs';
import path from 'path'

@Controller('uploads')
export class UploadsController {

  /**
   * 上传封面图
   * return 存放图片的URI
   */
  @Post('uploadCover')
  async uploadCover(@Body('base64') base64) {
    console.log(base64)
    const savePath = this.genImagePath()
    const dataBuffer = new Buffer(base64, 'base64');
    fs.writeFileSync(savePath, dataBuffer, 'binary');
    const resultPath = path.join('static', savePath)
    return {
      status: 200,
      // data: '/static/upload/images/20201002/16016148680294425.png',
      data: resultPath,
      message: '',
    };
  }

  /**
   * return 图片生成的地址
   */
  private genImagePath() {
    const uplaodBasePath = path.join(process.cwd(), 'public', 'upload')
    const dateStr = dayjs().format('YYYYMMDD');

    let savePath = path.join(uplaodBasePath, 'images');
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath);
    }

    savePath = path.join(uplaodBasePath, 'images', dateStr);
    if (!fs.existsSync(savePath)) {
      fs.mkdirSync(savePath);
    }

    const imageName = Date.now() + '' + Number.parseInt((Math.random() * 10000).toString()) + '.png';
    return path.join(savePath, imageName);
  }
}
