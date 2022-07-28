const express = require("express");
const Post = require("../schemas/posts");
const router = express.Router();

// 전체 게시글 조회
router.get("/posts", async (req, res) => {
    const posts = await Post.find({},{_id: 0, postId: 0, password: 0, __v: 0, content: 0}).sort({createdAt : -1});

    res.json({
        posts
    });
});


// 게시글 작성
router.post("/posts", async (req, res) => {
    const {postId, title, user, password, content} = req.body;

    const posts = await Post.find({postId});
    if(posts.length){
        return res.status(400).json({success: false, errorMassage: "이미 있는 데이터입니다."});
    }

    const createPosts = await Post.create({postId, title, user, "createdAt" : new Date(), password, content});

    res.json({posts: createPosts});
});


// 게시글 상세 조회
router.get("/posts/:postId", async (req, res) => {
    const {postId} = req.params;

    const [postData] = await Post.find({postId: Number(postId)},{_id: 0, postId: 0, password: 0, __v: 0});

    res.json({
        postData,
    });
});


// 게시글 수정
router.put("/posts/:postId", async (req, res) => {
    const {postId} = req.params;
    const {title, password, content} = req.body;

    const posts = await Post.find({postId: Number(postId), password: password});
    if(!posts.length){
        return res.status(400).json({success: false, errorMassage: "존재하지 않는 게시글이거나 패스워드가 맞지 않습니다."});
    }

    await Post.updateOne({postId : Number(postId), password : password}, {$set: {title, content}});

    res.json({success : true});
});


// 게시글 삭제
router.delete("/posts/:postId", async (req, res) => {
    const {postId} = req.params;
    const {password} = req.body;

    const posts = await Post.find({postId: Number(postId), password: password});
    if(posts.length){
        await Post.deleteOne({ postId: Number(postId)});
    }

    res.json({success: true});
});

module.exports = router;