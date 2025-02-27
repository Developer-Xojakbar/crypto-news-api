import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { PrismaService } from './prisma/prisma.service';
import { NewsModule } from './module/news.module';
import { NewsCron } from './cron';

@Module({
    imports: [NewsModule, ScheduleModule.forRoot()],
    providers: [NewsCron, PrismaService],
})
export class AppModule {}
