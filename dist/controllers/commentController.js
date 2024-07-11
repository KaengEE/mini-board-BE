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
const commentModel_1 = require("../models/commentModel");
// 게시글에 댓글 추가하는 addCommentToPost
const addCommentToPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { post_id, content, password } = req.body;
        console.log(`Received request with password: ${password}`);
        const newComment = yield (0, commentModel_1.createComment)({ post_id, content, password });
        res.status(200).json(newComment);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add comment' });
    }
});
// 게시글에 맞는 댓글 조회
const getComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield (0, commentModel_1.getCommentByPostId)(Number(req.params.post_id));
        res.status(200).json(comment);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});
// // 댓글 id로 댓글 조회
// const getCommentById = async(id:number): Promise<Comment | null> => {
//     const result = await pool.query('SELECT * FROM comments WHERE id = $1', [id]);
//     return result.rows[0] || null;
// }
// 댓글 1개 조회
const getCommentOne = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const comment = yield (0, commentModel_1.getCommentById)(Number(req.params.id));
        res.status(200).json(comment);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch comments' });
    }
});
// 댓글 수정
const updateCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { content, password } = req.body;
    try {
        const updatedComment = yield (0, commentModel_1.updateComment)(id, content, password);
        if (updatedComment) {
            res.status(200).json(updatedComment);
        }
        else {
            res.status(404).json({ message: "댓글이 없습니다." });
        }
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to update comment' });
    }
});
// 댓글 삭제
const deleteCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const { password } = req.body;
    try {
        //비밀번호 일치여부 확인
        const comment = yield (0, commentModel_1.getCommentById)(id);
        if (!comment) {
            return res.status(404).json({ message: "댓글이 없습니다." });
        }
        // 일치시 삭제
        yield (0, commentModel_1.deleteComment)(id, password);
        res.status(200).json({ message: '댓글 삭제 완료' });
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to delete comment' });
    }
});
exports.default = { addCommentToPost, getComment, updateCommentById, deleteCommentById, getCommentOne };
