import { Author } from "../models/author";



export let getAuthors = async (req: any, res: any) => {
    try {
        let authors = await Author.find({});

        return res.json(authors);
    } catch (error) {
        res.json(error)
    }
}