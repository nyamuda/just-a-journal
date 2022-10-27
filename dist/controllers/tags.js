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
exports.getAllTags = exports.updateTagById = exports.deleteTagById = exports.addTag = exports.getTagById = void 0;
const models_1 = require("../models");
const functions_1 = require("../utils/functions");
//find tag by id
let getTagById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let tag = yield models_1.Tag.findById(req.params.tagId);
        return res.json(tag);
    }
    catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    }
});
exports.getTagById = getTagById;
//add a tag
let addTag = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate post data first
    let valid_details = (0, functions_1.validateName)(req.body);
    //if there is an error
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message });
    }
    let { name } = req.body;
    //mo errors
    //add the tag
    models_1.Tag.create({ name })
        .then(tag => {
        return res.status(201).json({ message: 'The tag was successfully created.', _id: tag._id });
    })
        .catch(err => {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    });
});
exports.addTag = addTag;
//delete a tag
let deleteTagById = (req, res) => {
    models_1.Tag.findByIdAndDelete(req.params.tagId)
        .then(val => {
        return res.json({ message: 'The delete operation was successful. ' });
    })
        .catch(err => {
        return res.status(500).json({ message: 'Sorry, the delete operation failed. ', error: err });
    });
};
exports.deleteTagById = deleteTagById;
//update tag
let updateTagById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validate the post data
        let valid_details = (0, functions_1.validateNameUpdate)(req.body);
        //if there is an error
        if (valid_details.error) {
            return res.status(400).json({ message: valid_details.message });
        }
        let { name } = req.body;
        //if there are no errors
        //update the tag
        models_1.Tag.findByIdAndUpdate(req.params.tagId, { name })
            .then(val => {
            return res.json({ message: 'The update operation was successful.' });
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: error });
    }
});
exports.updateTagById = updateTagById;
//get all  tags
let getAllTags = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let all_tags = yield models_1.Tag.find({});
        return res.json(all_tags);
    }
    catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    }
});
exports.getAllTags = getAllTags;
