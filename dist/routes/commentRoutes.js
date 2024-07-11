"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const commentController_1 = __importDefault(require("../controllers/commentController"));
const router = (0, express_1.Router)();
// 게시글에 댓글 추가
router.post('/', commentController_1.default.addCommentToPost);
// 게시글에 맞는 댓글 조회
router.get('/:post_id', commentController_1.default.getComment);
// 댓글 1개조회
router.get('/detail/:id', commentController_1.default.getCommentOne);
// 댓글 수정
router.put('/:id', commentController_1.default.updateCommentById);
// 댓글 삭제
router.delete('/:id', commentController_1.default.deleteCommentById);
exports.default = router;
