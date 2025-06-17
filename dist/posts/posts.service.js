"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("./schemas/post.schema");
const users_service_1 = require("../users/users.service");
let PostsService = class PostsService {
    constructor(postModel, usersService) {
        this.postModel = postModel;
        this.usersService = usersService;
    }
    async create(createPostDto, userId) {
        const createdPost = new this.postModel(Object.assign(Object.assign({}, createPostDto), { author: userId }));
        return createdPost.save();
    }
    async findAll() {
        return this.postModel
            .find()
            .populate('author', 'username email')
            .sort({ createdAt: -1 })
            .exec();
    }
    async getTimeline(userId) {
        const followingUsers = await this.usersService.getFollowing(userId);
        return this.postModel
            .find({ author: { $in: followingUsers } })
            .populate('author', 'username email')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findByUser(userId) {
        return this.postModel
            .find({ author: userId })
            .populate('author', 'username email')
            .sort({ createdAt: -1 })
            .exec();
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        users_service_1.UsersService])
], PostsService);
//# sourceMappingURL=posts.service.js.map