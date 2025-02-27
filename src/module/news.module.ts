import { Module } from '@nestjs/common';
import { NewsService } from '../service';
import { NewsController } from '../controller';
import { PrismaService } from '../prisma';

@Module({
    controllers: [NewsController],
    providers: [NewsService, PrismaService],
})
export class NewsModule {}
