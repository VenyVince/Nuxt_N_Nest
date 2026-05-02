import { BullModule } from '@nestjs/bullmq';
import { Module } from '@nestjs/common';
import { AppController } from '../controllers/app.controller';
import { FileProcessor } from '../processors/file.processor';
import { AppService } from '../services/app.service';

// Register to NestJS to warp Controller & Service.
@Module({
  imports: [
    BullModule.forRoot({ connection: { host: 'localhost', port: 6379 } }),
    BullModule.registerQueue({ name: 'Queue' }),
  ],
  controllers: [AppController],
  providers: [AppService, FileProcessor],
})
export class AppModule {}
