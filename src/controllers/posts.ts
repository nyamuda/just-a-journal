import { Post } from "../models";
import { Author } from "../models";
import { validatePost } from "../utils/functions";
import { validateUpdatePost, getIdFromToken } from "../utils/functions";
import { Request, Response } from "express";
import { Tag } from "../models";
import { addNewTags } from "../utils/functions";


//get all posts
export let getAllPosts = async (req: Request, res: Response) => {

    try {
        //get the id of the user from the token provided
        // let author_id = getIdFromToken(req, res);
        let all_posts = await Post.find({});
        return res.json(all_posts);
    } catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err })
    }

}


//add a post
export let addPost = async (req: Request, res: Response) => {
    //validate post data first
    let valid_details = validatePost(req.body);

    //if there is an error
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message });
    }

    //if there are no errors
    //get the tags (if there any) and add them to the database first

    let new_tag_names = req.body.tags;

    if (new_tag_names) {
        //get all the existing
        let old_tags = await Tag.find({});
        //get the names of the tags
        let old_tag_names: Array<string> = old_tags.map(val => val.name!);

        //get the tags to add
        //the ones that are not already in the database
        let tags_to_add = addNewTags(old_tag_names, new_tag_names);

        Tag.insertMany(tags_to_add);

    }



    //get the id of the user from the token provided
    let author_id = getIdFromToken(req, res);
    //get the author details from the database
    let author = await Author.findById(author_id);
    //add the post to the database
    let postBody = {
        title: req.body.title,
        content: req.body.content,
        tags: req.body.tags,
        summary: req.body.summary,
        status: req.body.status,
        category: req.body.category,
        author
    }
    Post.create(postBody)
        .then(async (post) => {
            //add the post to the set of Author.posts
            let updatedAuthor = await Author.findOneAndUpdate({ _id: author_id }, { $addToSet: { posts: post } });
            return res.status(201).json({ message: 'The post was successfully created.' })
        })
        .catch(err => {
            res.status(500).json({ message: 'Sorry, the operation failed.', error: err })
        })
}


//find post by id
export let getPostById = async (req: Request, res: Response) => {
    try {
        let post = await Post.findById(req.params.id);
        return res.json(post);
    } catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err })
    }
}

//update an existing post
export let updatePostById = async (req: Request, res: Response) => {
    //validate the post data
    let valid_details = validateUpdatePost(req.body);

    //if there is an error
    if (valid_details.error) {
        return res.status(400).json({ message: valid_details.message });
    }
    let { title, summary, tags, status, category } = req.body;


    //get the id of the user from the token provided
    let author_id = getIdFromToken(req, res);

    //if there are no errors
    //update the post
    Post.findByIdAndUpdate(req.params.id, { title, summary, tags, status, category }).then(async post => {
        // update the post in Author.posts
        let updatedModel = await Author.findOneAndUpdate({ _id: author_id, 'posts._id': req.params.id },
            {
                $set: {
                    'posts.$.title': title,
                    'posts.$.summary': summary,
                    'posts.$.tags': tags,
                    'posts.$.status': status,
                    'posts.$.category': category
                }
            })
        return res.json({ message: 'The update operation was successful.' })
    }).catch(err => {
        return res.status(500).json({ message: 'Sorry, the update operation failed.', error: err })
    })
}


//delete an author
export let deletPostById = (req: Request, res: Response) => {

    //get the id of the user from the token provided
    let author_id = getIdFromToken(req, res);

    Post.findByIdAndDelete(req.params.id)
        .then(async val => {
            let updatedModel = await Author.findOneAndUpdate({ _id: author_id },
                {
                    $pull: {
                        posts: {
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

export let getPostByTags = async (req: Request, res: Response) => {

    try {
        //get the id of the user from the token provided
        let author_id = getIdFromToken(req, res);
        //get all the posts by the author
        let author_posts = await Post.find({ author_id });

        //get the provided tags
        let tags_for_filter = req.body.tags;

        //the array will contain the ids of the matched posts
        let posts_ids: any = [];

        for (let i = 0; i < tags_for_filter.length; i++) {

            //filtering the posts and removing duplicates
            let matched_posts = author_posts.filter(post => {
                if (!posts_ids.includes(post.id)) {
                    posts_ids.push(post._id);
                    return post.tags.includes(tags_for_filter[i]);
                }
            })

            return res.json(matched_posts);

        }
    } catch (err) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: err });
    }
}

//get posts by status
export let getPostByStatus = async (req: Request, res: Response) => {
    try {
        let matchedPosts = await Post.find({ status: req.query.status });
        return res.json(matchedPosts);

    } catch (error) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: error })
    }
}

//get posts by category
export let getPostByCategory = async (req: Request, res: Response) => {
    try {
        let matchedPosts = await Post.find({ category: req.query.categoru });
        return res.json(matchedPosts);

    } catch (error) {
        res.status(500).json({ message: 'Sorry, the operation failed.', error: error })
    }
}

