const companyModel = require("../models/companyModel");
const employeeModel = require("../models/employeeModel");
module.exports = {
   
    createCompany:async (req, res)=>{
        try{
            let query = {
                $and: [{_id: req.employeeId}, {userType: "ADMIN"}]
            }
            var findResult=await employeeModel.findOne(query)
               if(!findResult){
                    return res.send({responseCode: 404, responseMessage: "Admin does not exist"});
                } else{
                   var findResult1=await  companyModel.findOne({companyName: req.body.companyName})
                         if(findResult1){
                            return res.send({responseCode: 409, responseMessage: "Company  already exist"});
                        } else{
                            console.log(req.body);
                            var saveResult=await new companyModel(req.body).save()
                               if(saveResult){
                                    return res.send({responseCode: 200, responseMessage: "Company created successfully", responseResult: saveResult});
                                }
                            
                        }
                    
                }
            
        } catch(error){
            console.log(error);
            return res.send({responseCode: 500, responseMessage: "some went wrong", responseResult: error.message});
        }
    },
    getCompanies:async (req, res)=>{
        try{
            
            var findResult =await companyModel.find({sort: {number_of_emplyee: -1}})
            console.log(findResult);
                if(findResult.length == null){
                    return res.send({responseCode: 404, responseMessage: "Company does not  exist"});
                } else{
                    return res.send({responseCode: 200, responseMessage: "Companies name list view successfully....", responseResult: findResult});
                }
            
        } catch(error){
            return res.send({responseCode: 500, responseMessage: "some went wrong"});
        }
    },
    searchCompany: async(req, res)=>{
        try{
            var findResult=await companyModel.find({companyName: { $regex: req.body.search, $options: 'i'}})
                if(findResult.length == 0){
                    return res.send({responseCode: 404, responseMessage: "Company does not exist"});
                } else{
                    return res.send({responseCode: 200, responseMessage: "list of Companies name successfully", responseResult: findResult});
                }
            
        } catch(error){
            return res.send({responseCode: 500, responseMessage: "some went wrong"});
        }
    }    
}