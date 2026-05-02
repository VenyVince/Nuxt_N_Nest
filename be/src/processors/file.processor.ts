import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { access } from 'node:fs/promises';
import { FileJobData, FileProcess } from '../types/file.type';

//WorkerHost는 비동기 사용을 전제로 함.

@Processor('Queue')
export class FileProcessor extends WorkerHost {
  async process(job: Job<FileJobData>): Promise<FileProcess> {
    console.log(job.name);
    console.log(job.data);
    if (job.name !== 'processFile') {
      throw new Error(`Unknown job name: ${job.name}`);
    }

    //FileJobData에서 해당 내용들 중 하나를 꺼내서 쓸 수 있게 함. Like dto에서 값 꺼내는 코드.
    const { originalname, filename, path, mimetype, size } = job.data;

    await access(path);
    return {
      originalname,
      filename,
      path,
      mimetype,
      size,
      processedAt: new Date(),
    };
  }
}
