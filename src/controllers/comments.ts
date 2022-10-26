import { Comment, Author, Post } from "../models";
import { Request, Response } from "express";
import { validateContent, validateUpdateContent, getIdFromToken } from "../utils/functions";





export let addComment = async (req: Request, res: Response) => {
    //validate post data first
    let valid_details = validateContent(req.body);

    //if there is an error
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message });
    }

    //get the id of the user from the token provided
    let author_id = getIdFromToken(req, res);
    //get the author details from the database
    let author = await Author.findById(author_id);

    //get the post the comment is for
    let post = await Post.findById(req.params.id);
    //add the post to the database
    let commentBody = {

        content: req.body.content,
        author,
        post
    }
    Comment.create(commentBody)
        .then(async (comment) => {
            //add the comment to the set of Post.comments
            let updatedPost = await Post.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { comments: comment } });
            return res.status(201).json({ message: 'The comment was successfully created.', _id: comment._id })
        })
        .catch(err => {
            res.status(500).json({ message: 'Sorry, the operation failed.', error: err })
        })

}


export let updateCommentById = async (req: Request, res: Response) => {
    try {
        //validate the post data
        let valid_details = validateUpdateContent(req.body);

        //if there is an error
        if (valid_details.error) {
            return res.status(400).json({ message: valid_details.message });
        }
        let { content } = req.body;




        //get the comment
        let old_comment: any = await Comment.findById(req.params.id);
        //get the id of the post the comment is for
        let post_id = old_comment.post._id;

        //if there are no errors
        //update the post
        Comment.findByIdAndUpdate(req.params.id, { content }).then(async comment => {
            // update the comment in Post.comments
            let updatedModel = await Post.findOneAndUpdate({ _id: post_id, ' comments._id': req.params.id },
                {
                    $set: {
                        'posts.$.content': content

                    }
                })
            return res.json({ message: 'The update operation was successful.' })



        })
    } catch (error) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: error })
    }

}


//delete an comment
export let deleteCommentById = async (req: Request, res: Response) => {



    //get the comment
    let old_comment: any = await Comment.findById(req.params.id);
    //get the id of the post the comment is for
    let post_id = old_comment.post._id;

    Comment.findByIdAndDelete(req.params.id)
        .then(async val => {
            //remove the comment from Post.comments
            let updatedModel = await Post.findOneAndUpdate({ _id: post_id },
                {
                    $pull: {
                        comments: {
                            _id: req.params.id
                        }
                    }
                })
            return res.json({ message: 'The delete operation was successful. ' })
        })
        .catch(err => {
            return res.status(500).json({ message: 'Sorry, the delete operation failed. ', error: err })
        })

}


//find comment by id
export let getCommentById = async (req: Request, res: Response) => {
    try {
        let comment = await Comment.findById(req.params.id);
        return res.json(comment);
    } catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err })
    }
}