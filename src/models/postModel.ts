// 게시판 글 모델 정의
import { pool } from '../index';

interface Post {
    id?: number;
    title: string;
    content: string;
    password: string; //비밀번호
};

//모든 post 가져오기
const getAllPosts = async (): Promise<Post[]> => {
    const result = await pool.query("SELECT * FROM posts");
    return result.rows;
};

//id로 post 가져오기
// $쿼리 변수값
const getPostById = async(id:number): Promise<Post> => {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    return result.rows[0];
};

//post 생성
const createPost = async(post:Post): Promise<Post> => {
    const result = await pool.query(
        'INSERT INTO posts (title, content,password) VALUES ($1,$2,$3) RETURNING *',
        [post.title, post.content,post.password]
    );
    return result.rows[0];
};

//post 수정
const updatePost = async (id: number, title: string, content: string, password: string): Promise<Post> => {
    // 비밀번호 일치 여부 확인
    const existingPost = await getPostById(id);
    if (!existingPost || existingPost.password !== password) {
        throw new Error('비밀번호가 일치하지 않습니다.');
    }

    // 비밀번호가 일치하면 업데이트
    const result = await pool.query(
        'UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *',
        [title, content, id]
    );
    return result.rows[0];
};

//post 삭제
const deletePost = async (id: number, password: string): Promise<void> => {
    const post = await getPostById(id);

    if (post) {
        console.log(`Database password: ${post.password}`);
        console.log(`Provided password: ${password}`);
    }

    //비밀번호 일치여부확인
    if(post && post.password === password){
        await pool.query('DELETE FROM posts WHERE id = $1',[id]);
    } else {
        throw new Error('비밀번호가 일치하지 않습니다.');
    }

};

export { getAllPosts, getPostById, createPost, updatePost, deletePost, Post};