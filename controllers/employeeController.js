const employeeModel = require("../models/employeeModel");
const companyModel = require("../models/companyModel");

const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

module.exports = {
    signUp: async (req, res) => {
        try {
            let query = {$and: [{$or: [{phoneNumber: req.body.phoneNumber}, {email: req.body.email}]}, {status: {$ne: "DELETE"}}]}
            var findResult = await employeeModel.findOne(query)
            if (findResult) {
                // console.log(req.body);
                if (findResult.phoneNumber == req.body.phoneNumber) {
                    return res.send({responseCode: 409,responseMessage: "Phone Number is already present"});
                } else if (findResult.email == req.body.email) {
                    return res.send({responseCode: 409,responseMessage: "Email is already present"});
                }
            } else {
                var companyResult = await companyModel.findOne({companyName: req.body.companyName})
                console.log("==========>",companyResult._id);
                console.log(req.body.companyName);
                if (!companyResult) {
                    return res.send({responseCode: 404,responseMessage: "Company does not exist"});
                } else {
                    req.body.otp = Math.floor((Math.random() * 10000) + 10000);
                    req.body.userName = req.body.name + req.body.phoneNumber.slice(-4);
                    req.body.password = bcryptjs.hashSync(req.body.password);
                    req.body.otpTime = new Date().getTime();
                    req.body.companyId = companyResult._id;
                    var saveResult = await new employeeModel(req.body).save()
                    if (saveResult) {
                        let count = companyResult.number_of_employee + 1;
                        var updateResult = await companyModel.findByIdAndUpdate({_id: companyResult._id}, {$set: {number_of_employee: count}}, {new: true})
                        if (updateResult) {
                            return res.send({responseCode: 200,responseMessage: "data update succesfully",responseResult: updateResult})
                        }

                    }

                }

            }

        } catch (error) {
            console.log(error);
            res.send({responseCode: 500,responseMessage: "some went wrong",responseResult:error.message});
        }
    },
    logIn: async (req, res) => {
        try {
            let query = {$and: [{$or: [{phoneNumber: req.body.phoneNumber}, {email: req.body.email}]}, {status: {$in: "ACTIVE"}}]}
            var findResult = await employeeModel.findOne(query)
            if (!findResult) {
                return res.send({responseCode: 404,responseMessage: "User does not exist"});
            } else {

                let checkPassword = bcryptjs.compareSync(req.body.password, findResult.password);
                if (checkPassword) {let token = jwt.sign({_id: findResult._id}, "tushar1998", {expiresIn: "1d"});
                    return res.send({responseCode: 200,responseMessage: "Login successfully: Token has been created",responseResult: token});
                } else {
                    return res.send({responseCode: 400,responseMessage: "Invalid Password enter a valid password again"});
                }
            }


        } catch (error) {
            return res.send({responseCode: 500,responseMessage: "some went wrong"});
        }
    },
    listEmployee: async (req, res) => {
        try {
            var findResult = await companyModel.findOne({
                companyName: req.query.companyName
            })

            if (!findResult) {
                return res.send({
                    responseCode: 404,
                    responseMessage: "Company does not exist"
                });
            } else {
                var employeeResult = await employeeModel.find({
                    companyId: findResult._id
                }).populate("companyId")
                if (employeeResult.length == 0) {
                    return res.send({
                        responseCode: 404,
                        responseMessage: "Employee does not exist"
                    });
                } else {
                    return res.send({
                        responseCode: 200,
                        responseMessage: "List employees view successfully",
                        responseResult: employeeResult
                    });
                }

            }

        } catch (error) {
            return res.send({
                responseCode: 500,
                responseMessage: "some went wrong"
            });
        }
    },







}