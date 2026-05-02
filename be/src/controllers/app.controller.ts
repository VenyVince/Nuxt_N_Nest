import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { AppService } from '../services/app.service';

// Accept Request.
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      //옵션없이 사용시 multer 기본동작으로 사용됨
      storage: diskStorage({
        destination: './upload',
        filename: (req, file, callback) => {
          // 추후 동일 명 파일 덮어씌움을 방지하기 위해 callback(null, file.originalname); 에서 아래로 변경
          callback(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.appService.appUploadJob(file);
  }

  @Get('result/:id')
  getResult(@Param('id') id: string) {
    return this.appService.getResult(id);
  }
}
