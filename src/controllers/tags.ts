import { Tag } from "../models";
import { Request, Response } from "express";
import { validateName, validateNameUpdate } from "../utils/functions";



//find tag by id
export let getTagById = async (req: Request, res: Response) => {
    try {
        let tag = await Tag.findById(req.params.id);
        return res.json(tag);
    } catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err })
    }
}

//add a tag
export let addTag = async (req: Request, res: Response) => {
    //validate post data first
    let valid_details = validateName(req.body);

    //if there is an error
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message });
    }

    let { name } = req.body;

    //mo errors
    //add the tag
    Tag.create({ name })
        .then(tag => {

            return res.status(201).json({ message: 'The tag was successfully created.', _id: tag._id })
        })
        .catch(err => {
            res.status(500).json({ message: 'Sorry, the operation failed.', error: err })
        })

}



//delete a tag
export let deleteTagById = (req: Request, res: Response) => {


    Tag.findByIdAndDelete(req.params.id)
        .then(val => {
            return res.json({ message: 'The delete operation was successful. ' })
        })
        .catch(err => {
            return res.status(500).json({ message: 'Sorry, the delete operation failed. ', error: err })
        })

}


//update tag
export let updateTagById = async (req: Request, res: Response) => {
    try {
        //validate the post data
        let valid_details = validateNameUpdate(req.body);

        //if there is an error
        if (valid_details.error) {
            return res.status(400).json({ message: valid_details.message });
        }
        let { name } = req.body;


        //if there are no errors
        //update the tag
        Tag.findByIdAndUpdate(req.params.id, { name })
            .then(val => {
                return res.json({ message: 'The update operation was successful.' })



            })
    } catch (error) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: error })
    }

}


//get all  tags
export let getAllTags = async (req: Request, res: Response) => {

    try {
        let all_tags = await Tag.find({});
        return res.json(all_tags);
    } catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err })
    }

}

