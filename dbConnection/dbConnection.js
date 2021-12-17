const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost:27017/test`, {useNewUrlParser: true, useUnifiedTopology: true}, (connectionError, connectionResult)=>{
    if(connectionError){
        console.log("DB  is not connected yet");
    } else{
        console.log("DB  has been connected successfully");
    }
});