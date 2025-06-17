import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from '../auth/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async create(createUserDto: CreateUserDto): Promise<UserDocument> {
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }

  async findByEmail(email: string): Promise<UserDocument> {
    return this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<UserDocument> {
    return this.userModel.findById(id).exec();
  }

  async findAll(): Promise<UserDocument[]> {
    return this.userModel.find().select('-password').exec();
  }

  async followUser(userId: string, followUserId: string): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $addToSet: { following: followUserId } },
      { new: true }
    ).exec();
  }

  async unfollowUser(userId: string, unfollowUserId: string): Promise<UserDocument> {
    return this.userModel.findByIdAndUpdate(
      userId,
      { $pull: { following: unfollowUserId } },
      { new: true }
    ).exec();
  }

  async getFollowing(userId: string): Promise<string[]> {
    const user = await this.userModel.findById(userId).select('following').exec();
    return user?.following || [];
  }
}