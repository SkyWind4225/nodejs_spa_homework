const express = require("express");
const Post = require("../schemas/posts");
const Comment = require("../schemas/comment");
const router = express.Router();

// 댓글 생성 -> 미완(공백 처리 기능 미완)
router.post("/comments/:postId", async (req, res) => {
    const {postId} = req.params;
    const {commentId, content} = req.body;

    const comment = await Comment.find({commentId});
    if(comment.length){
        return res.status(400).json({ success : false, errorMassage: "해당 아이디 값의 댓글이 존재합니다"})
    }

    await Comment.create({postId: Number(postId), commentId, "createdAt" : new Date(), content})

    res.json({success: true});
})


// 댓글 목록 조회 -> 미완(조회, 공백 처리 기능 미완)
router.get("/comments/:postId", async (req, res) => {
    const {postId} = req.params;

    const [commentData] = await Comment.find({postId: Number(postId)}).sort({createdAt : -1});

    res.json({
        commentData,
    });
});


// 댓글 수정 -> 미완(공백 처리 기능 미완)
router.put("/comments/:commentId", async (req, res) => {
    const {commentId} = req.params;
    const {content} = req.body;

    const comment = await Comment.find({commentId: Number(commentId)});
    if(!comment.length){
        return res.status(400).json({ success : false, errorMassage: "해당 댓글이 존재하지 않습니다"})
    }

    await Comment.updateOne({commentId: Number(commentId)}, {$set: {content}});

    res.json({success: true});
});


//댓글 삭제
router.delete("/comments/:commentId", async (req, res) => {
    const {commentId} = req.params;

    const comment = await Comment.find({commentId: Number(commentId)});
    if(comment.length){
        await Comment.deleteOne({commentId: Number(commentId)});
    }

    res.json({success: true});
});

module.exports = router;