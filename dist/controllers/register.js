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
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerAuthor = void 0;
const functions_1 = require("../utils/functions");
const models_1 = require("../models");
const bcrypt = __importStar(require("bcrypt"));
let registerAuthor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { name, email, password } = req.body;
    //validate the register details
    let valid_details = (0, functions_1.validateRegisterDetails)(name, email, password);
    //if there is an error
    if (valid_details.error) {
        return res.status(401).json({ message: valid_details.message });
    }
    //check to see if there user is not already in the database
    let old_author = yield models_1.Author.findOne({ email });
    //if the user is already registered
    if (!old_author) {
        return res.status(409).json({ message: "A user with that email is already registered. Please log in." });
    }
    //if there no errors
    //hash the password
    let hashed_password = yield bcrypt.hash(password, 10);
    //add the  user to the database
    models_1.Author.create({ name, email, password: hashed_password })
        .then(val => {
        //create an access token
        let token = (0, functions_1.createJWT)({ email, admin: false });
        return res.status(201).json({ token });
    })
        .catch(err => {
        return res.json({ message: "Sorry, registration failed.", error: err });
    });
});
exports.registerAuthor = registerAuthor;
