import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class NewsService {
    constructor(private readonly prisma: PrismaService) {}

    async getAllNews() {
        return this.prisma.news.findMany();
    }

    async getOneNews(ticker: string, startDate: number, endDate: number) {
        const news = await this.prisma.news.findMany({
            where: {
                ticker,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
        });

        const newsByDate = news.reduce(
            (
                acc: Record<string, { count: number; sentimentSum: number }>,
                item,
            ) => {
                const date = new Date(item.date * 1000)
                    .toISOString()
                    .split('T')[0];
                if (!acc[date]) {
                    acc[date] = { count: 0, sentimentSum: 0 };
                }
                acc[date].count += 1;
                acc[date].sentimentSum += item.sentiment;
                return acc;
            },
            {},
        );

        const statistics = Object.entries(newsByDate).map(([date, data]) => {
            const typedData = data as { count: number; sentimentSum: number };
            return {
                date,
                count: typedData.count,
                averageSentiment: typedData.sentimentSum / typedData.count,
            };
        });

        return statistics;
    }
}
