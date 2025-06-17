import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
export declare class PostsController {
    private postsService;
    constructor(postsService: PostsService);
    create(req: any, createPostDto: CreatePostDto): Promise<import("./schemas/post.schema").PostDocument>;
    findAll(): Promise<import("./schemas/post.schema").PostDocument[]>;
    getTimeline(req: any): Promise<import("./schemas/post.schema").PostDocument[]>;
    getMyPosts(req: any): Promise<import("./schemas/post.schema").PostDocument[]>;
}
