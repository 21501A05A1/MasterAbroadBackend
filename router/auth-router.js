// const express=require('express');
// const router=express.Router();
// const authcontrollers=require("../controllers/auth-controller");
// const signupSchema=require("../validators/auth-validator");
// const validate=require("../middlewares/validate-middleware");
// const models=require("../models/user-model");
// const authMiddleware=require("../middlewares/auth-middleware");
// // router.get("/",(req,res)=>{
// //     res.status(200).send("server is running using router");
// // });

// router.route("/").get(authcontrollers.home);
// router.route("/register").post(validate(signupSchema),authcontrollers.register);
// router.route("/login").post(authcontrollers.login);
// router.route('/user').get(authMiddleware,authcontrollers.user);
// module.exports=router;
const express=require('express');
const router=express.Router();
const authcontrollers=require("../controllers/auth-controller");
const signupSchema=require("../validators/auth-validator");
const validate=require("../middlewares/validate-middleware");
const models=require("../models/user-model");
const authMiddleware=require("../middlewares/auth-middleware");
// router.get("/",(req,res)=>{
//     res.status(200).send("server is running using router");
// });

router.route("/").get(authcontrollers.home);
router.route("/register").post(validate(signupSchema),authcontrollers.register);
router.route("/login").post(authcontrollers.login);
router.route('/user').get(authMiddleware,authcontrollers.user);
router.route("/userpost").post(authMiddleware,authcontrollers.userpost);
module.exports=router;
