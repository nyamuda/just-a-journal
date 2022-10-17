import { Author } from "../models/author";
import { getGitHubToken, getGithubUser, createJWT } from "../utils/functions";



export let loginGithub = async (req: any, res: any) => {
    try {
        //get git access token
        let github_token = await getGitHubToken(req.query.code);

        //github user details
        let { name, email } = await getGithubUser(github_token);



        //check if author already exists in the database
        let old_author = await Author.findOne({ email: email });


        //if they don't exist
        //we create one
        if (!old_author) {
            Author.create({ name: name, email: email })
                .then(val => {
                    //create a token
                    let token = createJWT({
                        email: email,
                        admin: false
                    });
                    return res.json({ token });
                })
                .catch(err => {
                    return res.json({ "message": err });
                })
        }

        //if the author is already in the database
        let token = createJWT({
            email: email,
            admin: false
        });

        return res.json({ token });

    } catch (error) {
        return res.json(error);
    }


}