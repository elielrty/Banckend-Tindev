const Dev = require('../models/Dev');

module.exports = {
    async store(req, res) {
        const{user} = req.headers;
        const{devId} = req.params;
        
        const loggedDev = await Dev.findById(user); //usuario logado
        const targetDev = await Dev.findById(devId); //usuario alvo

        if(!targetDev) {
            return res.status(400).json({ erro: 'Dev not exist'});

        }

        loggedDev.dislikes.push(targetDev._id);

        await loggedDev.save();

        return res.json(loggedDev);
    }
}