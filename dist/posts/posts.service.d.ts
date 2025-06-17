import { Model } from 'mongoose';
import { PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UsersService } from '../users/users.service';
export declare class PostsService {
    private postModel;
    private usersService;
    constructor(postModel: Model<PostDocument>, usersService: UsersService);
    create(createPostDto: CreatePostDto, userId: string): Promise<PostDocument>;
    findAll(): Promise<PostDocument[]>;
    getTimeline(userId: string): Promise<PostDocument[]>;
    findByUser(userId: string): Promise<PostDocument[]>;
}
