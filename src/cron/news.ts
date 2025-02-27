import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from '../prisma/prisma.service';

const mockNewsData = [
    {
        title: 'Биткоин преодолевает отметку $30,000',
        description:
            'На фоне роста институциональных инвестиций стоимость Биткоина поднялась выше $30,000, что свидетельствует о продолжающемся доверии к цифровому активу.',
        date: 1672531200,
        platform: 'CoinDesk',
        author: 'CryptoAnalyst',
        ticker: 'BTC',
        sentiment: 1,
    },
    {
        title: 'Эфириум обновляется: переход на PoS завершен',
        description:
            'Сеть Ethereum успешно завершила переход на механизм Proof-of-Stake, снизив энергозатраты и открыв новые возможности для масштабирования.',
        date: 1672534800,
        platform: 'CryptoNews',
        author: 'EthereumExpert',
        ticker: 'ETH',
        sentiment: 1,
    },
];

@Injectable()
export class NewsCron {
    constructor(private readonly prisma: PrismaService) {}

    @Cron(CronExpression.EVERY_MINUTE)
    async fetchAndSaveNews() {
        const randomNews =
            mockNewsData[Math.floor(Math.random() * mockNewsData.length)];

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
