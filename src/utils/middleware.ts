import jwt, { JwtPayload, Secret, JsonWebTokenError } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import * as dotenv from "dotenv";
import { Post } from '../models/post';
import { Comment } from '../models/comment';
dotenv.config();



//ensure you're a logged in user --- middleware
export let ensureLogin = (req: Request, res: Response, next: NextFunction) => {
    try {
        let header_value = req.body.token || req.headers.authorization;
        let SECRET: Secret = process.env.SECRET!;
        let token = jwt.verify(header_value, SECRET);
        return next()

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error });
    }
}

//ensure you're an admin --- middleware
export let ensureAdmin = (req: Request, res: Response, next: NextFunction) => {
    try {
        let header_value = req.body.token || req.headers.authorization;
        let SECRET: Secret = process.env.SECRET!;
        let token: any = jwt.verify(header_value, SECRET);

        //if the user is not an admin, or if admin=false
        if (!token.admin) {
            return res.status(401).json({ message: "You do not have the authority to carry out this action." })
        }

        return next()

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error })
    }
}

//ensure you're authorized to update/delete a post
export let ensureAuthorizedUpdateDeletePost = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let header_value = req.body.token || req.headers.authorization;
        let SECRET: Secret = process.env.SECRET!;
        let token: any = jwt.verify(header_value, SECRET);


        //get the item you're trying to update
        let post: any = await Post.findById(req.params.id);



        if (!post) {
            return res.status(404).json({ message: "The item you're trying to update/delete does not exist." })
        }

        //get the id of the author who made the post
        let post_author_id = post.author["_id"].toString();

        //check if you're the admin or if you're the one who wrote the post
        if (token.admin || token.author_id === post_author_id) {
            return next();
        }
        return res.status(403).json({ message: "You do not have the authority to carry out this action." });



    } catch (error) {
        return res.status(401).json({ message: "Unauthorized", error })
    }


}


//ensure you're authorized to update/delete a comment
export let ensureAuthorizedUpdateDeleteComment = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let header_value = req.body.token || req.headers.authorization;
        let SECRET: Secret = process.env.SECRET!;
        let token: any = jwt.verify(header_value, SECRET);


        //get the item you're trying to update
        let comment: any = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: "The item you're trying to update/delete does not exist." })
        }

        //get the id of the author who made the comment
        let comment_author_id = comment.author["_id"].toString();

        //check if you're the admin or if you're the one who wrote the comment
        if (token.admin || token.author_id === comment_author_id) {
            return next();
        }
        return res.status(403).json({ message: "You do not have the authority to carry out this action." });


    } catch (error) {
        return res.status(403).json({ message: "Unauthorized", error })
    }


}