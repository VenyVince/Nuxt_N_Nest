//Promise 타입 반환을 위한 data의 타입 선언
export type FileJobData = {
  originalname: string;
  filename: string;
  path: string;
  mimetype: string;
  size: number;
};

export type FileProcess = FileJobData & {
  processedAt: Date;
};

export type FileResultData = {
  jobId: string;
  state: string;
  result: FileProcess | null;
};
