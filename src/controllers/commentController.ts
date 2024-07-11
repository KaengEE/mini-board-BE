import { Request, Response } from 'express';
import { createComment, getCommentByPostId, updateComment, deleteComment, getCommentById } from '../models/commentModel';

// 게시글에 댓글 추가하는 addCommentToPost
const addCommentToPost = async (req: Request, res: Response) => {
    try {
        const { post_id, content, password } = req.body;
        console.log(`Received request with password: ${password}`);
        const newComment = await createComment({ post_id, content, password });
        res.status(200).json(newComment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
}

// 게시글에 맞는 댓글 조회
const getComment = async (req: Request, res: Response) => {
    try {
        const comment = await getCommentByPostId(Number(req.params.post_id));
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
}

// // 댓글 id로 댓글 조회
// const getCommentById = async(id:number): Promise<Comment | null> => {
//     const result = await pool.query('SELECT * FROM comments WHERE id = $1', [id]);
//     return result.rows[0] || null;
// }

// 댓글 1개 조회
const getCommentOne = async(req:Request, res:Response) => {
    try {
        const comment = await getCommentById(Number(req.params.id));
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
    
}


// 댓글 수정
const updateCommentById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const { content, password } = req.body;
    try {
        const updatedComment = await updateComment(id, content, password);
        if (updatedComment) {
            res.status(200).json(updatedComment);
        } else {
            res.status(404).json({ message: "댓글이 없습니다." });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to update comment' });
    }
};



// 댓글 삭제
const deleteCommentById = async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    const {password} = req.body;
    try {
        //비밀번호 일치여부 확인
        const comment = await getCommentById(id);
        if(!comment){
            return res.status(404).json({message:"댓글이 없습니다."})
        }
        // 일치시 삭제
        await deleteComment(id, password);
        res.status(200).json({ message: '댓글 삭제 완료' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
};

export default { addCommentToPost, getComment, updateCommentById, deleteCommentById, getCommentOne };
