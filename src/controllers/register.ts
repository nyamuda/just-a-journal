import { Request, Response } from "express";
import { validateRegisterDetails, createJWT } from "../utils/functions";
import { Author } from "../models";
import * as bcrypt from "bcrypt";




export let registerAuthor = async (req: Request, res: Response) => {
    let { name, email, password } = req.body;

    //validate the register details
    let valid_details = validateRegisterDetails(name, email, password);
    //if there is an error
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message });
    }

    //check to see if there user is not already in the database
    let old_author = await Author.findOne({ email });


    //if the user is already registered
    if (old_author) {
        return res.status(409).json({ message: "A user with that email is already registered. Please log in." })
    }

    //if there no errors
    //hash the password
    let hashed_password = await bcrypt.hash(password, 10);

    //add the  user to the database
    Author.create({ name, email, password: hashed_password })
        .then(val => {
            //create an access token
            let token = createJWT({ email, admin: false });

            return res.status(201).json({ token });
        })
        .catch(err => {
            return res.json({ message: "Sorry, registration failed.", error: err });
        })

}