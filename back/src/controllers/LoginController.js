const conectanobanco = require("../funcoes/database");

const usuarios = [ {"name":"Thiago","login":"thiago", "password":"uniplac"}, {"name":"David","login":"david", "password":"uniplac"}];

module.exports = {

    async login(req, res) {
        const recive = req.body;
        console.log(recive);
        for (var i = 0; i < usuarios.length; i++){
            if(recive.login === usuarios[i].login){
                if(recive.password === usuarios[i].password){
                    // entrou
                    return res.status(200).json({"entry":1, "name":usuarios[i].name})
                }
            }
        }
        return res.status(200).json({"entry":0})
    }

};
