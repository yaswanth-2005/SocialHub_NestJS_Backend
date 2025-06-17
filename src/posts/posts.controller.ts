import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
@UseGuards(JwtAuthGuard)
export class PostsController {
  constructor(private postsService: PostsService) {}

  @Post()
  async create(@Request() req, @Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto, req.user.userId);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get('timeline')
  async getTimeline(@Request() req) {
    return this.postsService.getTimeline(req.user.userId);
  }

  @Get('my-posts')
  async getMyPosts(@Request() req) {
    return this.postsService.findByUser(req.user.userId);
  }
}