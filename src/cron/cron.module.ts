import { Module } from '@nestjs/common';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [CronService],
  controllers: [CronController]
})
export class CronModule {}
