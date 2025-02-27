import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllNews() {
        return this.prisma.news.findMany();
    }
}
