import { UsersService } from './users.service';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("./schemas/user.schema").UserDocument[]>;
    getProfile(req: any): Promise<import("./schemas/user.schema").UserDocument>;
    followUser(req: any, followUserId: string): Promise<import("./schemas/user.schema").UserDocument>;
    unfollowUser(req: any, unfollowUserId: string): Promise<import("./schemas/user.schema").UserDocument>;
    getFollowing(req: any): Promise<string[]>;
}
