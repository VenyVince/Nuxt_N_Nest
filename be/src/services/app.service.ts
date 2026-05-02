import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Job, Queue } from 'bullmq';
import 'multer';
import { FileProcess, FileResultData } from '../types/file.type';

// Real Work.
@Injectable()
export class AppService {
  constructor(
    @InjectQueue('Queue')
    //private: Queue는 Service의 내부 구현 내용이라, 해당 Queue는 클래스 내부에서만 사용케 함.
    //readonly: 생성 후 재할당 불가
    //TypeScript: private, protected, readonly
    private readonly fileQueue: Queue,
  ) {}
  async appUploadJob(file: Express.Multer.File) {
    //ref BullMQ Doc
    const job = await this.fileQueue.add('processFile', {
      originalname: file.originalname,
      filename: file.filename,
      path: file.path,
      mimetype: file.mimetype,
      size: file.size,
    });

    return {
      jobId: job.id,
    };
  }
  async getResult(jobId: string) {
    const job = await Job.fromId<FileResultData, FileProcess>(
      this.fileQueue,
      jobId,
    );
    if (!job) {
      return { jobId, state: 'not_found', result: null };
    }
    const state = await job.getState();
    if (state !== 'completed') {
      return { jobId, state, result: null };
    }
    return { jobId, state, result: job.returnvalue };
  }
}
