const employeeModel = require("../models/employeeModel");
const jwt = require("jsonwebtoken");
module.exports = {
    tokenVerify: async (req, res, next)=>{
        try{
            var tokenVerifyResult=  jwt.verify(req.headers.token, "tushar1998")
               if(!tokenVerifyResult){
                    return res.send({responseCode: 404, responseMessage: "Invalid token: Token does't exist"});
                } else{
                    var findResult =await employeeModel.findOne({_id: tokenVerifyResult._id})
                        if(!findResult){
                            return res.send({responseCode: 404, responseMessage: "Invalid credentials: Data does't exist"});
                        } else{
                            if(tokenVerifyResult.status == "DELETE"){
                                return res.send({responseCode: 404, responseMessage: `${findResult.userType} has been Deleted....`});
                            } else if(tokenVerifyResult == "BLOCK"){
                                return res.send({responseCode: 404, responseMessage: `${findResult.userType} has been Blocked....`});
                            } else{
                                req.employeeId = tokenVerifyResult._id;
                                next();
                            }
                        }
                    
                }
            
        } catch(error){
            return res.send({responseCode: 500, responseMessage: "server error"});
        }
    }
}