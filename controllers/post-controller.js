const Post = require('../models/post-model');
const User = require('../models/user-model');
const posts = async (req, res) => {
    try {
        const response = await Post.find({}).populate('user');
        if (!response || response.length === 0) {
            return res.status(404).json({ msg: "No posts found" });
        }
        res.status(200).json({ msg: response });
    } catch (error) {
        console.log(`Error from posts controller: ${error}`);
        res.status(500).json({ error: "Internal Server Error" });
    }
};



  const getBlogById = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user first to ensure the user exists
        const user = await User.findById(userId).populate("blogs");
        if (!user) {
            return res.status(404).json({ success: false, message: `User not found with ID: ${userId}` });
        }

        // Find all posts belonging to the user
       // const blogs = await Post.find({ user: userId }).populate('user', '_id username');

        // Check if blogs is an object and convert it to an array
        // const blogsArray = Array.isArray(blogs) ? blogs : [blogs];
        
        return res.status(200).json(user);
        

      
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
    }
};





module.exports = {posts,getBlogById};