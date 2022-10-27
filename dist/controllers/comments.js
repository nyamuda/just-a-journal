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
exports.getCommentById = exports.deleteCommentById = exports.updateCommentById = exports.addComment = void 0;
const models_1 = require("../models");
const functions_1 = require("../utils/functions");
let addComment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate post data first
    let valid_details = (0, functions_1.validateContent)(req.body);
    //if there is an error
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message });
    }
    //get the id of the user from the token provided
    let author_id = (0, functions_1.getIdFromToken)(req, res);
    //get the author details from the database
    let author = yield models_1.Author.findById(author_id);
    //get the post the comment is for
    let post = yield models_1.Post.findById(req.params.postId);
    //add the post to the database
    let commentBody = {
        content: req.body.content,
        author,
        post
    };
    models_1.Comment.create(commentBody)
        .then((comment) => __awaiter(void 0, void 0, void 0, function* () {
        //add the comment to the set of Post.comments
        let updatedPost = yield models_1.Post.findOneAndUpdate({ _id: req.params.postId }, { $addToSet: { comments: comment } });
        return res.status(201).json({ message: 'The comment was successfully created.', _id: comment._id });
    }))
        .catch(err => {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    });
});
exports.addComment = addComment;
let updateCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validate the post data
        let valid_details = (0, functions_1.validateUpdateContent)(req.body);
        //if there is an error
        if (valid_details.error) {
            return res.status(400).json({ message: valid_details.message });
        }
        let { content } = req.body;
        //get the comment
        let old_comment = yield models_1.Comment.findById(req.params.commentId);
        //get the id of the post the comment is for
        let post_id = old_comment.post._id;
        //if there are no errors
        //update the post
        models_1.Comment.findByIdAndUpdate(req.params.commentId, { content }).then((comment) => __awaiter(void 0, void 0, void 0, function* () {
            // update the comment in Post.comments
            let updatedModel = yield models_1.Post.findOneAndUpdate({ _id: post_id, ' comments._id': req.params.commentId }, {
                $set: {
                    'posts.$.content': content
                }
            });
            return res.json({ message: 'The update operation was successful.' });
        }));
    }
    catch (error) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: error });
    }
});
exports.updateCommentById = updateCommentById;
//delete an comment
let deleteCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //get the comment
    let old_comment = yield models_1.Comment.findById(req.params.commentId);
    //get the id of the post the comment is for
    let post_id = old_comment.post._id;
    models_1.Comment.findByIdAndDelete(req.params.commentId)
        .then((val) => __awaiter(void 0, void 0, void 0, function* () {
        //remove the comment from Post.comments
        let updatedModel = yield models_1.Post.findOneAndUpdate({ _id: post_id }, {
            $pull: {
                comments: {
                    _id: req.params.commentId
                }
            }
        });
        return res.json({ message: 'The delete operation was successful. ' });
    }))
        .catch(err => {
        return res.status(500).json({ message: 'Sorry, the delete operation failed. ', error: err });
    });
});
exports.deleteCommentById = deleteCommentById;
//find comment by id
let getCommentById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let comment = yield models_1.Comment.findById(req.params.commentId);
        return res.json(comment);
    }
    catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    }
});
exports.getCommentById = getCommentById;
