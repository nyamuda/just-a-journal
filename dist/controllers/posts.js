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
exports.getPostByCategory = exports.getPostByStatus = exports.getPostByTags = exports.deletPostById = exports.updatePostById = exports.getPostById = exports.addPost = exports.getAllPosts = void 0;
const models_1 = require("../models");
const models_2 = require("../models");
const functions_1 = require("../utils/functions");
const functions_2 = require("../utils/functions");
const models_3 = require("../models");
const functions_3 = require("../utils/functions");
//get all posts written by the author
let getAllPosts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //get the id of the user from the token provided
        // let author_id = getIdFromToken(req, res);
        let all_posts = yield models_1.Post.find({});
        return res.json(all_posts);
    }
    catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    }
});
exports.getAllPosts = getAllPosts;
//add a post
let addPost = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate post data first
    let valid_details = (0, functions_1.validatePost)(req.body);
    //if there is an error
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message });
    }
    //if there are no errors
    //get the tags (if there any) and add them to the database first
    let new_tag_names = req.body.tags;
    if (new_tag_names) {
        //get all the existing
        let old_tags = yield models_3.Tag.find({});
        //get the names of the tags
        let old_tag_names = old_tags.map(val => val.name);
        //get the tags to add
        //the ones that are not already in the database
        let tags_to_add = (0, functions_3.addNewTags)(old_tag_names, new_tag_names);
        models_3.Tag.insertMany(tags_to_add);
    }
    //get the id of the user from the token provided
    let author_id = (0, functions_2.getIdFromToken)(req, res);
    //get the author details from the database
    let author = yield models_2.Author.findById(author_id);
    //add the post to the database
    let postBody = {
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        summary: req.body.summary,
        status: req.body.status,
        category: req.body.category,
        author
    };
    models_1.Post.create(postBody)
        .then((post) => __awaiter(void 0, void 0, void 0, function* () {
        //add the post to the set of Author.posts
        let updatedAuthor = yield models_2.Author.findOneAndUpdate({ _id: author_id }, { $addToSet: { posts: post } });
        return res.status(201).json({ message: 'The post was successfully created.' });
    }))
        .catch(err => {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    });
});
exports.addPost = addPost;
//find post by id
let getPostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let post = yield models_1.Post.findById(req.params.id);
        return res.json(post);
    }
    catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    }
});
exports.getPostById = getPostById;
//update an existing post
let updatePostById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate the post data
    let valid_details = (0, functions_2.validateUpdatePost)(req.body);
    //if there is an error
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message });
    }
    let { title, summary, tags, status, category } = req.body;
    //get the id of the user from the token provided
    let author_id = (0, functions_2.getIdFromToken)(req, res);
    //if there are no errors
    //update the post
    models_1.Post.findByIdAndUpdate(req.params.id, { title, summary, tags, status, category }).then((post) => __awaiter(void 0, void 0, void 0, function* () {
        // update the post in Author.posts
        let updatedModel = yield models_2.Author.findOneAndUpdate({ _id: author_id, 'posts._id': req.params.id }, {
            $set: {
                'posts.$.title': title,
                'posts.$.summary': summary,
                'posts.$.tags': tags,
                'posts.$.status': status,
                'posts.$.category': category
            }
        });
        return res.json({ message: 'The update operation was successful.' });
    })).catch(err => {
        return res.status(500).json({ message: 'Sorry, the update operation failed.', error: err });
    });
});
exports.updatePostById = updatePostById;
//delete an author
let deletPostById = (req, res) => {
    //get the id of the user from the token provided
    let author_id = (0, functions_2.getIdFromToken)(req, res);
    models_1.Post.findByIdAndDelete(req.params.id)
        .then((val) => __awaiter(void 0, void 0, void 0, function* () {
        //remove the post from Author.posts
        let updatedModel = yield models_2.Author.findOneAndUpdate({ _id: author_id }, {
            $pull: {
                posts: {
                    _id: req.params.id
                }
            }
        });
        return res.json({ message: 'The delete operation was successful. ' });
    }))
        .catch(err => {
        return res.status(500).json({ message: 'Sorry, the delete operation failed. ', error: err });
    });
};
exports.deletPostById = deletPostById;
let getPostByTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // //get the id of the user from the token provided
        // let author_id = getIdFromToken(req, res);
        //all the posts
        let all_posts = yield models_1.Post.find({});
        //get the provided tags
        let tags_string = req.query.tags;
        //if no tags were provided
        if (!tags_string) {
            return res.json(all_posts);
        }
        //convert into array
        let tags_for_filter = tags_string.split(",");
        //the array will contain the ids of the matched posts
        let posts_ids = [];
        for (let i = 0; i < tags_for_filter.length; i++) {
            //filtering the posts and removing duplicates
            let matched_posts = all_posts.filter(post => {
                if (!posts_ids.includes(post.id)) {
                    posts_ids.push(post._id);
                    return post.tags.includes(tags_for_filter[i]);
                }
            });
            return res.json(matched_posts);
        }
    }
    catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    }
});
exports.getPostByTags = getPostByTags;
//get posts by status
let getPostByStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let matchedPosts = yield models_1.Post.find({ status: req.query.status });
        return res.json(matchedPosts);
    }
    catch (error) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: error });
    }
});
exports.getPostByStatus = getPostByStatus;
//get posts by category
let getPostByCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let matchedPosts = yield models_1.Post.find({ category: req.query.categoru });
        return res.json(matchedPosts);
    }
    catch (error) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: error });
    }
});
exports.getPostByCategory = getPostByCategory;
