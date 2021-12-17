const mongoose = require("mongoose");
const bcryptJs = require("bcryptjs");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
const employeeSchema = new Schema({
    
    name: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    email: {
        type: String
    },
    userName: {
        type: String
    },
   
    password: {
        type: String
    },
   
    otp: {
        type: String
    },
    otpTime: {
        type: String
    },
   
    
    companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "company"
    },
  
    userType: {
        type: String,
        enum: ["ADMIN", "EMPLOYEE"],
        default: "EMPLOYEE"
    },
    status: {
        type: String,
        enum: ["ACTIVE", "DELETE", "BLOCK"],
        default: "ACTIVE"
    }
}, {timestamps: true});
employeeSchema.plugin(mongoosePaginate);
const employeeModel = mongoose.model("employee", employeeSchema);
module.exports = employeeModel;
employeeModel.findOne({userType: "ADMIN"}, (findError, findResult)=>{
    if(findError){
        console.log("Internal server error");
    } else if(findResult){
        console.log("ADMIN is already exist....");
    } else{
        let obj = {
            
            name: "tushargoyal",
            phoneNumber: "1231231230",
            email: "no-tushar@mobiloitte.com",
           
            userName: "tushar123",
            password: bcryptJs.hashSync("123"),
            
            userType: "ADMIN",
            
            
            status: "ACTIVE"
        }
        employeeModel(obj).save((saveError, saveResult)=>{
            if(saveError){
                console.log("Internal server error: Admin is not created yet....");
            } else{
                console.log("Admin has been created successfully...."+ saveResult);
            }
        });
    }
})
