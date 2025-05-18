import { Controller, Param, Post } from '@nestjs/common';
import{ CronService } from './cron.service';

@Controller('cron')
export class CronController {
    constructor(private readonly cronService: CronService) {}

    @Post('add/:name')
    addCronjob(@Param('name') name: string) {
        this.cronService.addCron(name);
        return true;
    }

    @Post('stop/:name')
    stopCronjob(@Param('name') name: string) {
        this.cronService.stopCron(name);
        return true;
    }

    @Post('delete/:name')
    deleteCronjob(@Param('name') name: string) {
        this.cronService.deleteCron(name);
        return true;
    }

    
}
