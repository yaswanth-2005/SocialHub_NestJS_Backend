import { Model } from 'mongoose';
import { UserDocument } from './schemas/user.schema';
import { CreateUserDto } from '../auth/dto/create-user.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<UserDocument>);
    create(createUserDto: CreateUserDto): Promise<UserDocument>;
    findByEmail(email: string): Promise<UserDocument>;
    findById(id: string): Promise<UserDocument>;
    findAll(): Promise<UserDocument[]>;
    followUser(userId: string, followUserId: string): Promise<UserDocument>;
    unfollowUser(userId: string, unfollowUserId: string): Promise<UserDocument>;
    getFollowing(userId: string): Promise<string[]>;
}
