// 게시판 별 댓글 모델

import {pool} from '../index';

interface Comment {
    id? : number;
    post_id : number;
    content : string;
    password: string; //비밀번호추가
}

// 댓글 생성
const createComment = async (comment: Comment): Promise<Comment> => {
    const result = await pool.query(
        'INSERT INTO comments (post_id, content,password) VALUES ($1, $2,$3) RETURNING *',
        [comment.post_id, comment.content, comment.password]
    );
    return result.rows[0];
}

//게시글별 댓글 조회
const getCommentByPostId = async (post_id:number): Promise<Comment[]> => {
    const result = await pool.query('SELECT * FROM comments WHERE post_id = $1', [post_id]);
    return result.rows;
}

// 댓글 id로 댓글 조회
const getCommentById = async(id:number): Promise<Comment | null> => {
    const result = await pool.query('SELECT * FROM comments WHERE id = $1', [id]);
    return result.rows[0] || null;
}

// 비밀번호 일치 시 수정/삭제 가능!
// 댓글 수정
const updateComment = async (id: number, content: string, password: string): Promise<Comment | null> => {
    
    try{
        //댓글 id로 해당 댓글 가져오기
        const comment = await getCommentById(id);

        //비밀번호확인
        if(comment && comment.password == password){
            const result = await pool.query(
                'UPDATE comments SET content = $1 WHERE id = $2 RETURNING *',
                [content, id]
            );
            return result.rows[0] || null;
        } else {
            throw new Error("비밀번호가 틀렸습니다");
        }
    } catch(error) {
        console.error("Error updating comment:", error);
        throw error;
    }

};

// 댓글 삭제
const deleteComment = async (id: number,password:string): Promise<void> => {
    try{
        //댓글 id로 해당 댓글 가져오기
        const comment = await getCommentById(id);

        //비밀번호 확인
        if(comment && comment.password == password){
            const result = await pool.query('DELETE FROM comments WHERE id = $1', [id]);
        }
    }catch(error){
        console.error("Error deleting comment:", error);
        throw error;
    }

};



export {Comment, createComment, getCommentByPostId, updateComment, deleteComment, getCommentById};