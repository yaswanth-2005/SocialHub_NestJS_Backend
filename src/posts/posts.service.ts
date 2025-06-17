import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private usersService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto, userId: string): Promise<PostDocument> {
    const createdPost = new this.postModel({
      ...createPostDto,
      author: userId,
    });
    return createdPost.save();
  }

  async findAll(): Promise<PostDocument[]> {
    return this.postModel
      .find()
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async getTimeline(userId: string): Promise<PostDocument[]> {
    const followingUsers = await this.usersService.getFollowing(userId);
    
    return this.postModel
      .find({ author: { $in: followingUsers } })
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .exec();
  }

  async findByUser(userId: string): Promise<PostDocument[]> {
    return this.postModel
      .find({ author: userId })
      .populate('author', 'username email')
      .sort({ createdAt: -1 })
      .exec();
  }
}