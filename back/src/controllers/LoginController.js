const conectanobanco = require("../funcoes/database");

const usuarios = [ {"name":"Thiago","login":"thiago", "password":"uniplac", "key":"978546132", "keyTime":"0"}, {"name":"David","login":"david", "password":"uniplac", "keyTime":"798546123"}];

module.exports = {

    login(req, res) {
        var recive = req.body;
        var login = recive.login.replaceAll("'", "")
        login = recive.login.replaceAll("=", "")
        password = recive.password.replaceAll("=", "")
        
        for (var i = 0; i < usuarios.length; i++){
            if(login === usuarios[i].login){
                if(password === usuarios[i].password){
                    // entrou
                    const key = Math.floor(Math.random() * 10000000); 
                    const horario = new Date();
                    usuarios[i].key = key;
                    usuarios[i].keyTime = horario.getDate() + horario.getMonth() + horario.getFullYear() + horario.getHours() + horario.getMinutes();
                    return res.status(200).json({"entry":1, "name":usuarios[i].name, "key":usuarios[i].key})
                }
            }
        }
        return res.status(200).json({"entry":0})
    },

    session(req, res){
        const sendKey = req.body.key;
        for(var i = 0; i < usuarios.length; i++){
            if(sendKey * 1 === usuarios[i].key){
                const horario = new Date();
                const timeNow = horario.getDate() + horario.getMonth() + horario.getFullYear() + horario.getHours() + horario.getMinutes();
                if(usuarios[i].keyTime + 60 > timeNow){
                    return res.status(200).json({"key" : true})
                }
            }
            return res.status(200).json({"key" : false})
        } 
    }

};
