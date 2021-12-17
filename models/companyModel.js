const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate");
const Schema = mongoose.Schema;
const companySchema = new Schema({
    companyName: {
        type: String
    },
    founder: {
        type: String
    },
    location:{
        type:String
    },
    number_of_employee: {
        type: Number,
        default: 0
    }
}, {timestamps: true});
companySchema.plugin(mongoosePaginate);
const companyModel = mongoose.model("company", companySchema);
module.exports = companyModel;