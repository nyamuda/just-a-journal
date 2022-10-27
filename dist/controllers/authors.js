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
exports.deletAuthorById = exports.updateAuthorById = exports.getAuthorById = exports.getAuthors = void 0;
const models_1 = require("../models");
const functions_1 = require("../utils/functions");
//get all authors
let getAuthors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let authors = yield models_1.Author.find({});
        return res.json(authors);
    }
    catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    }
});
exports.getAuthors = getAuthors;
//get author by id
let getAuthorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let author = yield models_1.Author.findById(req.params.authorId)
        .then(val => res.json(val))
        .catch(err => {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    });
    return author;
});
exports.getAuthorById = getAuthorById;
//update existing author
let updateAuthorById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate the data
    let valid_details = (0, functions_1.validateUpdateAuthor)(req.body);
    //if there are any errors
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message });
    }
    //if there are no valiation errors,
    //update the author
    models_1.Author.findByIdAndUpdate(req.params.authorId, {
        email: req.body.email,
        name: req.body.name
    }).then(val => {
        // // update the author in Post.author
        // let updatedModel = await Post.updateMany(
        //     { 'author._id': req.params.authorId },
        //     {
        //         $set: {
        //             'author.$.email': req.body.email,
        //             'author.$.name': req.body.name
        //         }
        //     },
        //     {
        //         "multi": true
        //     }
        // )
        return res.json({ message: 'The update operation was successful.' });
    }).catch(err => {
        console.log(err);
        return res.status(500).json({ message: 'Sorry, the update operation failed.', error: err });
    });
});
exports.updateAuthorById = updateAuthorById;
//delete an author
let deletAuthorById = (req, res) => {
    models_1.Author.findByIdAndDelete(req.params.authorId)
        .then(val => {
        return res.json({ message: 'The delete operation was successful. ' });
    })
        .catch(err => {
        return res.status(500).json({ message: 'Sorry, the delete operation failed. ', error: err });
    });
};
exports.deletAuthorById = deletAuthorById;
