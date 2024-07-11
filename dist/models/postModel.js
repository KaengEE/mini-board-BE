"use strict";
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
exports.deletePost = exports.updatePost = exports.createPost = exports.getPostById = exports.getAllPosts = void 0;
// 게시판 글 모델 정의
const index_1 = require("../index");
;
//모든 post 가져오기
const getAllPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield index_1.pool.query("SELECT * FROM posts");
    return result.rows;
});
exports.getAllPosts = getAllPosts;
//id로 post 가져오기
// $쿼리 변수값
const getPostById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield index_1.pool.query('SELECT * FROM posts WHERE id = $1', [id]);
    return result.rows[0];
});
exports.getPostById = getPostById;
//post 생성
const createPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield index_1.pool.query('INSERT INTO posts (title, content,password) VALUES ($1,$2,$3) RETURNING *', [post.title, post.content, post.password]);
    return result.rows[0];
});
exports.createPost = createPost;
//post 수정
const updatePost = (id, title, content, password) => __awaiter(void 0, void 0, void 0, function* () {
    // 비밀번호 일치 여부 확인
    const existingPost = yield getPostById(id);
    if (!existingPost || existingPost.password !== password) {
        throw new Error('비밀번호가 일치하지 않습니다.');
    }
    // 비밀번호가 일치하면 업데이트
    const result = yield index_1.pool.query('UPDATE posts SET title = $1, content = $2 WHERE id = $3 RETURNING *', [title, content, id]);
    return result.rows[0];
});
exports.updatePost = updatePost;
//post 삭제
const deletePost = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    const post = yield getPostById(id);
    if (post) {
        console.log(`Database password: ${post.password}`);
        console.log(`Provided password: ${password}`);
    }
    //비밀번호 일치여부확인
    if (post && post.password === password) {
        yield index_1.pool.query('DELETE FROM posts WHERE id = $1', [id]);
    }
    else {
        throw new Error('비밀번호가 일치하지 않습니다.');
    }
});
exports.deletePost = deletePost;
