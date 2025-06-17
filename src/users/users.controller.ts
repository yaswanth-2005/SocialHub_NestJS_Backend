import {
  Controller,
  Get,
  Post,
  Param,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
@UseGuards(JwtAuthGuard)
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get('profile')
  async getProfile(@Request() req) {
    return this.usersService.findById(req.user.userId);
  }

  @Post('follow/:id')
  async followUser(@Request() req, @Param('id') followUserId: string) {
    return this.usersService.followUser(req.user.userId, followUserId);
  }

  @Delete('follow/:id')
  async unfollowUser(@Request() req, @Param('id') unfollowUserId: string) {
    return this.usersService.unfollowUser(req.user.userId, unfollowUserId);
  }

  @Get('following')
  async getFollowing(@Request() req) {
    return this.usersService.getFollowing(req.user.userId);
  }
}