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
exports.loginGithub = void 0;
const author_1 = require("../models/author");
const functions_1 = require("../utils/functions");
let loginGithub = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let code = req.query.code;
        //get git access token
        let github_token = yield (0, functions_1.getGitHubToken)(code);
        //github user details
        let { name, email } = yield (0, functions_1.getGithubUser)(github_token);
        //check if author already exists in the database
        let old_author = yield author_1.Author.findOne({ email: email });
        //if they don't exist
        //we create one
        if (!old_author) {
            author_1.Author.create({ name: name, email: email })
                .then(val => {
                let id = val.toObject()._id.toString();
                //create a token
                let token = (0, functions_1.createJWT)({
                    email: email,
                    admin: false,
                    author_id: id
                });
                return res.json({ token });
            })
                .catch(err => {
                return res.json({ "message": err });
            });
        }
        else {
            //if the author is already in the database
            let author_id = old_author.toObject()._id.toString();
            let token = (0, functions_1.createJWT)({
                email: email,
                admin: false,
                author_id
            });
            return res.json({ token });
        }
    }
    catch (error) {
        return res.json(error);
    }
});
exports.loginGithub = loginGithub;
