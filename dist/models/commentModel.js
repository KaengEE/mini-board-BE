"use strict";
// 게시판 별 댓글 모델
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
exports.getCommentById = exports.deleteComment = exports.updateComment = exports.getCommentByPostId = exports.createComment = void 0;
const index_1 = require("../index");
// 댓글 생성
const createComment = (comment) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield index_1.pool.query('INSERT INTO comments (post_id, content,password) VALUES ($1, $2,$3) RETURNING *', [comment.post_id, comment.content, comment.password]);
    return result.rows[0];
});
exports.createComment = createComment;
//게시글별 댓글 조회
const getCommentByPostId = (post_id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield index_1.pool.query('SELECT * FROM comments WHERE post_id = $1', [post_id]);
    return result.rows;
});
exports.getCommentByPostId = getCommentByPostId;
// 댓글 id로 댓글 조회
const getCommentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield index_1.pool.query('SELECT * FROM comments WHERE id = $1', [id]);
    return result.rows[0] || null;
});
exports.getCommentById = getCommentById;
// 비밀번호 일치 시 수정/삭제 가능!
// 댓글 수정
const updateComment = (id, content, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //댓글 id로 해당 댓글 가져오기
        const comment = yield getCommentById(id);
        //비밀번호확인
        if (comment && comment.password == password) {
            const result = yield index_1.pool.query('UPDATE comments SET content = $1 WHERE id = $2 RETURNING *', [content, id]);
            return result.rows[0] || null;
        }
        else {
            throw new Error("비밀번호가 틀렸습니다");
        }
    }
    catch (error) {
        console.error("Error updating comment:", error);
        throw error;
    }
});
exports.updateComment = updateComment;
// 댓글 삭제
const deleteComment = (id, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //댓글 id로 해당 댓글 가져오기
        const comment = yield getCommentById(id);
        //비밀번호 확인
        if (comment && comment.password == password) {
            const result = yield index_1.pool.query('DELETE FROM comments WHERE id = $1', [id]);
        }
    }
    catch (error) {
        console.error("Error deleting comment:", error);
        throw error;
    }
});
exports.deleteComment = deleteComment;
