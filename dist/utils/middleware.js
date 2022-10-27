"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ensureAuthorizedUpdateDeleteComment = exports.ensureAuthorizedUpdateDeletePost = exports.ensureAdmin = exports.ensureRightUser = exports.ensureLogin = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
const post_1 = require("../models/post");
const comment_1 = require("../models/comment");
dotenv.config();
//ensure you're a logged in user --- middleware
let ensureLogin = (req, res, next) => {
    try {
        let header_value = req.body.token || req.headers.authorization;
        let SECRET = process.env.SECRET;
        let token = jsonwebtoken_1.default.verify(header_value, SECRET);
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized", error });
    }
};
exports.ensureLogin = ensureLogin;
//ensure you're the right user --- middleware
let ensureRightUser = (req, res, next) => {
    try {
        let header_value = req.body.token || req.headers.authorization;
        let SECRET = process.env.SECRET;
        let token = jsonwebtoken_1.default.verify(header_value, SECRET);
        //if its the right user
        if (token.author_id === req.params.authorId) {
            return next();
        }
        //check if you're the admin
        if (token.admin) {
            return next();
        }
        return res.status(403).json({ message: "You do not have the authority to carry out this action." });
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized", error });
    }
};
exports.ensureRightUser = ensureRightUser;
//ensure you're an admin --- middleware
let ensureAdmin = (req, res, next) => {
    try {
        let header_value = req.body.token || req.headers.authorization;
        let SECRET = process.env.SECRET;
        let token = jsonwebtoken_1.default.verify(header_value, SECRET);
        //if the user is not an admin, or if admin=false
        if (!token.admin) {
            return res.status(401).json({ message: "You do not have the authority to carry out this action." });
        }
        return next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized", error });
    }
};
exports.ensureAdmin = ensureAdmin;
//ensure you're authorized to update/delete a post
let ensureAuthorizedUpdateDeletePost = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let header_value = req.body.token || req.headers.authorization;
        let SECRET = process.env.SECRET;
        let token = jsonwebtoken_1.default.verify(header_value, SECRET);
        //get the item you're trying to update
        let post = yield post_1.Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: "The item you're trying to update/delete does not exist." });
        }
        //get the id of the author who made the post
        let post_author_id = post.author["_id"].toString();
        //check if you're the admin or if you're the one who wrote the post
        if (token.admin || token.author_id === post_author_id) {
            return next();
        }
        return res.status(403).json({ message: "You do not have the authority to carry out this action." });
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized", error });
    }
});
exports.ensureAuthorizedUpdateDeletePost = ensureAuthorizedUpdateDeletePost;
//ensure you're authorized to update/delete a comment
let ensureAuthorizedUpdateDeleteComment = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let header_value = req.body.token || req.headers.authorization;
        let SECRET = process.env.SECRET;
        let token = jsonwebtoken_1.default.verify(header_value, SECRET);
        //get the item you're trying to update
        let comment = yield comment_1.Comment.findById(req.params.commentId);
        if (!comment) {
            return res.status(404).json({ message: "The item you're trying to update/delete does not exist." });
        }
        //get the id of the author who made the comment
        let comment_author_id = comment.author["_id"].toString();
        //check if you're the admin or if you're the one who wrote the comment
        if (token.admin || token.author_id === comment_author_id) {
            return next();
        }
        return res.status(403).json({ message: "You do not have the authority to carry out this action." });
    }
    catch (error) {
        return res.status(403).json({ message: "Unauthorized", error });
    }
});
exports.ensureAuthorizedUpdateDeleteComment = ensureAuthorizedUpdateDeleteComment;
