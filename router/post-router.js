const express = require("express");
const router = express.Router();
const { userpost } = require("../controllers/auth-controller");
const Post = require('../models/post-model');
const postcontrollers = require("../controllers/post-controller");

router.route('/sharexperiences/visapost').get(postcontrollers.posts);
router.route("/sharexperiences/getblog/:userId").get(postcontrollers.getBlogById);

module.exports = router;
