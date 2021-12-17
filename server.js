const express = require("express");
const app = express();
const database=require("./dbConnection/dbConnection")
const port =3000;
const employeeRout = require("./routers/employeeRouter");
const companyRout = require("./routers/companyRouter");
const swaggerUI =require("swagger-ui-express")
const swaggerJsDoc=require("swagger-jsdoc")

//importing Body Parser
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());



app.use("/employee", employeeRout);



app.use("/company", companyRout);



app.get("/", (req, res)=>{
    res.send("welcome to my world");
});

const swaggerDefinition ={
    info:{
        title:"Goyal_ji",
        version:"2.0.0",
        description:"api docs",
        contact:{
            name:"tushar"
        },
    },
    server:[`http://localhost:${port}`],
    basePath:"",
};
var options={
    swaggerDefinition:swaggerDefinition,
    apis:["./routers/*.js"],

};
const swaggerDocs=swaggerJsDoc(options);
app.get("/swagger-json",function(req,res){
    res.setHeader=("contant-type","application/json");
    res.send(swaggerDocs);
});
app.use("/api-docs",swaggerUI.serve,swaggerUI.setup(swaggerDocs))
app.listen(port, (error, result)=>{
    if(error){
        console.log(`Server is not listening on port "${port}"`);
    } else{
        console.log(`Server is listening on port "${port}"`);
    }
});