
import { Router } from 'express';
import commentController from '../controllers/commentController';

const router = Router();

// 게시글에 댓글 추가
router.post('/', commentController.addCommentToPost);

// 게시글에 맞는 댓글 조회
router.get('/:post_id', commentController.getComment);

// 댓글 1개조회
router.get('/detail/:id', commentController.getCommentOne);

// 댓글 수정
router.put('/:id', commentController.updateCommentById);

// 댓글 삭제
router.delete('/:id', commentController.deleteCommentById);

export default router;
