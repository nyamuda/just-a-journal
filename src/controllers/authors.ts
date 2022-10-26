import { Author } from "../models/author";
import { Request, Response } from "express";
import { validateUpdateAuthor } from "../utils/functions";



//get all authors
export let getAuthors = async (req: Request, res: Response) => {
    try {
        let authors = await Author.find({});
        return res.json(authors);
    } catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err })
    }
}

//get author by id
export let getAuthorById = async (req: Request, res: Response) => {

    let author = await Author.findById(req.params.authorId)
        .then(val => res.json(val))
        .catch(err => {
            res.status(500).json({ message: 'Sorry, the operation failed.', error: err })
        });

    return author;
}

//update existing author
export let updateAuthorById = (req: Request, res: Response) => {
    //validate the data
    let valid_details = validateUpdateAuthor(req.body);

    //if there are any errors
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message });
    }

    //if there are no valiation errors,
    //update the author
    Author.findByIdAndUpdate(req.params.authorId, {
        email: req.body.email,
        name: req.body.name
    }).then(val => {
        return res.json({ message: 'The update operation was successful.' })
    }).catch(err => {
        console.log(err);
        return res.status(500).json({ message: 'Sorry, the update operation failed.', error: err })
    })



}

//delete an author
export let deletAuthorById = (req: Request, res: Response) => {

    Author.findByIdAndDelete(req.params.authorId)
        .then(val => {
            return res.json({ message: 'The delete operation was successful. ' })
        })
        .catch(err => {
            return res.status(500).json({ message: 'Sorry, the delete operation failed. ', error: err })
        })

}




