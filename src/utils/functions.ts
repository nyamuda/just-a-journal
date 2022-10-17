import * as dotenv from "dotenv";
import axios from "axios";
import jwt, { Secret } from "jsonwebtoken";
import Joi from "joi";
import { Date } from "mongoose";
dotenv.config();


type JWTPayload = {
    email: String,
    admin: Boolean
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
        name: Joi.string().required(),
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