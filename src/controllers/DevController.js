const axios = require('axios');
const Dev = require('../models/Dev');
module.exports = {
    async index(req, res){
        const {user} = req.headers;

        const loggedDev = await Dev.findById(user);

        const users = await Dev.find({
            $and: [
                {_id: { $ne: user}},
                { _id: { $nin: loggedDev.likes}},
                { _id: {$nin: loggedDev.dislikes}},    
            ],
        })

        return res.json(users);
    },

    async store(req, res) { //async é pqr a função é await
        const {username} = req.body;

        const userExists = await Dev.findOne({user: username})

        if(userExists){
            return res.json(userExists);

        }

        const response = await axios.get(`https://api.github.com/users/${username}`) // await falando  node que precisa executar primeiro par apode ir a proxima linha

        const {name,bio, avatar_url: avatar} = response.data;

        const dev = await Dev.create({
            name: name,
            user: username,
            bio: bio,
            avatar:avatar
        })

        return res.json(dev);
    }
};