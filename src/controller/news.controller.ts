import { Controller, Get } from '@nestjs/common';
import { NewsService } from '../service';

@Controller('news')
export class NewsController {
    constructor(private readonly newsService: NewsService) {}

    @Get()
    async getAllNews() {
        return this.newsService.getAllNews();
    }
}
