import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression, SchedulerRegistry } from '@nestjs/schedule';
import { CronJob } from 'cron';

@Injectable()
export class CronService {
    constructor(private schedulerRegistry: SchedulerRegistry) { }
    private readonly logger = new Logger(CronService.name);
    addCron(name: string) {
        const job = new CronJob(CronExpression.EVERY_MINUTE, () => {
            this.logger.debug(`Maneul tetiklendi cron job çalıştı ${name}`);
        });
        this.schedulerRegistry.addCronJob(name, job);
        job.start();
        this.logger.debug(`yeni  cron job eklendi Name: ${name}`);
    }
    stopCron(name: string) {
        const job = this.schedulerRegistry.getCronJob(name);
        job.stop();
        this.logger.debug(`cron job durduruldu Name: ${name}`);
    }
    deleteCron(name: string) {
        this.schedulerRegistry.deleteCronJob(name);
        this.logger.debug(`cron job silindi Name: ${name}`);
    }

    @Cron(CronExpression.EVERY_MINUTE, {name: 'auto_cronjob'})
    handleAutoCronjob() {
        this.logger.debug('otomatik cron job çalıştı');
    }
}
