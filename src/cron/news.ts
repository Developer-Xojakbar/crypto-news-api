import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';
import * as mockNewsData from './mock_news.json';

@Injectable()
export class NewsCron {
    constructor(private readonly prisma: PrismaService) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async fetchAndSaveNews() {
        const randomIndex = Math.floor(Math.random() * mockNewsData.length);
        const randomNews = mockNewsData[randomIndex];

        try {
            await this.prisma.news.create({
                data: {
                    title: randomNews.title,
                    description: randomNews.description,
                    date: randomNews.date,
                    platform: randomNews.platform,
                    author: randomNews.author,
                    ticker: randomNews.ticker,
                    sentiment: randomNews.sentiment,
                },
            });
            console.log(`Новость добавлена: ${randomNews.title}`);
        } catch (error) {
            console.error('Ошибка при записи новости в БД:', error);
        }
    }
}
