const model = require("../models");
const jwtHandler = require("../jwtMiddleware");
class employee{
    constructor(){
    }

async checkUserAuthentication(req, res){
    let user = await model.user.get({$and : [{"email": req.body.email},{"password": req.body.password}]
                                            }, 
                                            {"designation": 1,
                                            "name": 1,
                                            "_id": 1
                                        });
    if(user != null || user != []){
        let token = jwtHandler.tokenGenerator(user);
        if(token != null)
        return res.status('200').send({ auth: true, message: 'Valid Token.',jwtToken:token });    
        else if(token==null)
        res.status('503').send({ auth: false,message:'Some Error Occured while generating token'});
    }
    else{
        res.status('401').send(user);
    }
}
}
module.exports = new employee();