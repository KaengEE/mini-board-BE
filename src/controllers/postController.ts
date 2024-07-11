import { Request, Response } from 'express';
import * as postModel from '../models/postModel';

//전체 포스터 가져오는 getPosts
const getPosts = async (req:Request, res:Response): Promise<void> =>{
    try {
        const posts = await postModel.getAllPosts();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ error : 'Failed to fetch posts'});
    }
};

//id에 맞는 포스터 가져오는 getPost
const getPost = async (req: Request, res: Response): Promise<void> => {
    try {
        const post = await postModel.getPostById(Number(req.params.id));
        res.status(200).json(post);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
};

//post 생성하는 createPost
const createPost = async (req:Request, res:Response): Promise<void> => {
    const { title, content, password } = req.body as postModel.Post;
    try {
        const newPost = await postModel.createPost({title, content, password});
        res.status(201).json(newPost);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch post' });
    }
}

//해당 post 수정하는 updatePost
const updatePost = async (req: Request, res: Response): Promise<void> => {
    const { title, content, password } = req.body as postModel.Post;
    try {
        const updatedPost = await postModel.updatePost(Number(req.params.id), title, content, password);
        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error updating post:', error);
        res.status(500).json({ error: 'Failed to update post' });
    }
};

//post 삭제하는 deletePost
const deletePost = async (req:Request,res:Response): Promise<void> => {
    const postId = Number(req.params.id);
    const { password } = req.body as postModel.Post;

    try {
        await postModel.deletePost(postId, password);
        res.status(204).send();
    } catch (err) {
        console.error('Error deleting post:', err);
        res.status(500).json({ error: 'Failed to fetch post' })
        
    }
}

export {getPost, getPosts, createPost, updatePost, deletePost};