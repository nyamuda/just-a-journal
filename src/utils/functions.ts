import * as dotenv from "dotenv";
import axios from "axios";
import jwt, { JwtPayload, Secret, JsonWebTokenError } from "jsonwebtoken";
import Joi from "joi";
import { Date } from "mongoose";
import { Request, Response } from "express";
dotenv.config();



export interface IPost {
    title: string,
    content: string,
    tags: Array<string>,
    summary: string,
    status: string,
    comments: Array<object>,
    like_count: number,
    author: object,
    category: string
}

type JWTPayload = {
    email: String,
    admin: Boolean,
    author_id: String
}

type errorMessage = {
    error: boolean,
    message: string
}

export type AuthorObject = {
    _id?: number,
    name: string,
    email: string,
    admin: boolean,
    password: string
    updated_at?: Date,
    created_at?: Date
}
type Tag = {
    name: string
}


//get the id of the user from the token
export let getIdFromToken = (req: Request, res: Response): string => {

    let header_value = req.body.token || req.headers.authorization;

    let decoded: any = jwt.decode(header_value);

    return decoded.author_id;
    // jwt.verify(header_value, process.env.SECRET!, (err: any, decoded: any) => {
    //     if (err) {
    //         return { error: true, message: err };
    //     }

    //     return decoded.author_id;
    // });




}

//add new tags to the database
export let addNewTags = (old_tags: Array<string>, new_tags: Array<string>): Array<Tag> => {

    let tags_to_add: Array<Tag> = [];

    //before adding the new tags
    //check to see if they don't already exist
    new_tags.forEach(new_tag => {
        if (old_tags.includes(new_tag)) { return; }

        tags_to_add.push({ name: new_tag });

    })

    return tags_to_add;

}

export let validateUpdatePost = (author: object): errorMessage => {

    let schema = Joi.object({
        title: Joi.string().min(3),
        content: Joi.string().min(3),
        tags: Joi.array(),
        summary: Joi.string().min(3),
        status: Joi.string().valid('draft', 'publish'),
        category: Joi.string(),
    })

    let { value, error } = schema.validate(author);

    if (error) {
        return { error: true, message: error.details[0].message };
    }
    return {
        error: false,
        message: "No errors"
    }
}


export let validatePost = (post: object): errorMessage => {

    let schema = Joi.object({
        title: Joi.string().min(3).required(),
        content: Joi.string().min(3).required(),
        tags: Joi.array(),
        summary: Joi.string().min(3),
        status: Joi.string().valid('draft', 'publish'),
        category: Joi.string()
    })

    let { value, error } = schema.validate(post);
    if (error) {
        return { error: true, message: error.details[0].message };
    }
    return {
        error: false,
        message: "No errors"
    }


}


export let validateContent = (comment: object): errorMessage => {

    let schema = Joi.object({

        content: Joi.string().min(3).required(),
    })

    let { value, error } = schema.validate(comment);
    if (error) {
        return { error: true, message: error.details[0].message };
    }
    return {
        error: false,
        message: "No errors"
    }

}


export let validateUpdateContent = (comment: object): errorMessage => {

    let schema = Joi.object({

        content: Joi.string().min(3)
    })

    let { value, error } = schema.validate(comment);
    if (error) {
        return { error: true, message: error.details[0].message };
    }
    return {
        error: false,
        message: "No errors"
    }

}

export let validateUpdateAuthor = (author: object): errorMessage => {

    let schema = Joi.object({
        name: Joi.string().min(2),
        email: Joi.string().email()
    })

    let { value, error } = schema.validate(author);

    if (error) {
        return { error: true, message: error.details[0].message };
    }
    return {
        error: false,
        message: "No errors"
    }
}


export let validateLoginDetails = (email: string, password: string): errorMessage => {

    let schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8)
    })

    let { value, error } = schema.validate({ email, password });

    //if there is a validation error
    if (error) {
        return { error: true, message: error.details[0].message };
    }
    return {
        error: false,
        message: "No errors"
    }
}


export let validateRegisterDetails = (name: string, email: string, password: string): errorMessage => {

    let schema = Joi.object({
        name: Joi.string().required().min(2),
        email: Joi.string().email().required(),
        password: Joi.string().required().min(8)
    })

    let { value, error } = schema.validate({ name, email, password });

    //if there is a validation error
    if (error) {
        return { error: true, message: error.details[0].message };
    }
    return {
        error: false,
        message: "No errors"
    }
}

export let getGitHubToken = async (code: string) => {
    let options: object = {
        method: "POST",
        url: "https://github.com/login/oauth/access_token",
        data: {
            client_id: `${process.env.ClientID}`,
            client_secret: `${process.env.ClientSecret}`,
            code: code
        },
        headers: {
            "Accept": "application/json"
        }
    }

    let response = await axios(options);
    let responseOK = response && response.status === 200 && response.statusText == "OK";
    if (responseOK) {
        return response.data.access_token;
    }

}

export let getGithubUser = async (token: string) => {
    let options: object = {
        method: "GET",
        url: "https://api.github.com/user",
        headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`
        }
    }
    let response = await axios(options);
    let responseOK = response && response.status == 200 && response.statusText == "OK";
    if (responseOK) {
        return response.data;
    }
}

export let createJWT = (payload: JWTPayload): string => {

    let SECRET: Secret = process.env.SECRET!;

    let access_token: string = jwt.sign(payload, SECRET, { expiresIn: "24h" });


    return access_token;
}