require("dotenv").config();
const express=require('express');
const cors=require('cors');
const app=express();
const authRoute=require("./router/auth-router");
const contactRoute=require("./router/contact-router");
// const foodRoute=require("./router/food-router")
const connectDb=require('./utils/db');
const errorMiddleware = require("./middlewares/error-middleware");
const adminRoute=require('./router/admin-router');
const postRoute=require('./router/post-router');
// const corsOptions={
//     origin:"http://localhost:3000/",
//     methods:"GET,POST,PUT,DELETE,PATCH,HEAD",
//     credentials:true,
// }
app.use(cors());
app.use(express.json());
app.use("/api/auth",authRoute);
app.use("/api/form",contactRoute);
// app.use("/api/data",foodRoute);
app.use("/api/admin",adminRoute);
app.use("/api/post",postRoute);
app.get("/",(req,res)=>{
    res.status(200).send("server is running");
});
// app.get("/register",(req,res)=>{
//     res.status(200).send("welcome to registration file");
// });
app.use(errorMiddleware);
const PORT=5000;
connectDb().then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running at port: ${PORT}`);
    });
});
