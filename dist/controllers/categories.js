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
exports.getAllCategories = exports.updateCategoryById = exports.deleteCategoryById = exports.addCategory = exports.getCategoryById = void 0;
const models_1 = require("../models");
const functions_1 = require("../utils/functions");
//find category by id
let getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let category = yield models_1.Category.findById(req.params.categoryId);
        return res.json(category);
    }
    catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    }
});
exports.getCategoryById = getCategoryById;
//add a category
let addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //validate post data first
    let valid_details = (0, functions_1.validateName)(req.body);
    //if there is an error
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message });
    }
    let { name } = req.body;
    //mo errors
    //add the category
    models_1.Category.create({ name })
        .then(category => {
        return res.status(201).json({ message: 'The category was successfully created.', _id: category._id });
    })
        .catch(err => {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    });
});
exports.addCategory = addCategory;
//delete a category
let deleteCategoryById = (req, res) => {
    models_1.Category.findByIdAndDelete(req.params.categoryId)
        .then(val => {
        return res.json({ message: 'The delete operation was successful. ' });
    })
        .catch(err => {
        return res.status(500).json({ message: 'Sorry, the delete operation failed. ', error: err });
    });
};
exports.deleteCategoryById = deleteCategoryById;
//update category
let updateCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //validate the post data
        let valid_details = (0, functions_1.validateNameUpdate)(req.body);
        //if there is an error
        if (valid_details.error) {
            return res.status(400).json({ message: valid_details.message });
        }
        let { name } = req.body;
        //if there are no errors
        //update the category
        models_1.Category.findByIdAndUpdate(req.params.categoryId, { name })
            .then(val => {
            return res.json({ message: 'The update operation was successful.' });
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: error });
    }
});
exports.updateCategoryById = updateCategoryById;
//get all categories
let getAllCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let all_categories = yield models_1.Category.find({});
        return res.json(all_categories);
    }
    catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    }
});
exports.getAllCategories = getAllCategories;
