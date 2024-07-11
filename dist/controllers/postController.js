"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePost = exports.updatePost = exports.createPost = exports.getPosts = exports.getPost = void 0;
const postModel = __importStar(require("../models/postModel"));
//전체 포스터 가져오는 getPosts
const getPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postModel.getAllPosts();
        res.status(200).json(posts);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch posts' });
    }
});
exports.getPosts = getPosts;
//id에 맞는 포스터 가져오는 getPost
const getPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postModel.getPostById(Number(req.params.id));
        res.status(200).json(post);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});
exports.getPost = getPost;
//post 생성하는 createPost
const createPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, password } = req.body;
    try {
        const newPost = yield postModel.createPost({ title, content, password });
        res.status(201).json(newPost);
    }
    catch (err) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});
exports.createPost = createPost;
//해당 post 수정하는 updatePost
const updatePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, content, password } = req.body;
    try {
        const updatedPost = yield postModel.updatePost(Number(req.params.id), title, content, password);
        res.status(200).json(updatedPost);
    }
    catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
});
exports.updatePost = updatePost;
//post 삭제하는 deletePost
const deletePost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = Number(req.params.id);
    const { password } = req.body;
    try {
        yield postModel.deletePost(postId, password);
        res.status(204).send();
    }
    catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({ error: 'Failed to fetch post' });
    }
});
exports.deletePost = deletePost;
