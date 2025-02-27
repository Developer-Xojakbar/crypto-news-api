import { Controller, Get, Param, Query } from '@nestjs/common';
import { NewsService } from '../service';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get()
    async getAllNews() {
        return this.newsService.getAllNews();
    }

    @Get(':ticker')
    async getOneNews(
        @Param('ticker') ticker: string,
        @Query('startDate') startDate: number,
        @Query('endDate') endDate: number,
    ) {
        return this.newsService.getOneNews(ticker, startDate, endDate);
    }
}
