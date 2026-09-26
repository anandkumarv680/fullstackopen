const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const middleware = require("../utils/middleware");

blogRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });

  response.json(blogs);
});

blogRouter.post("/", middleware.userExtractor, async (request, response) => {
  const user = request.user;

  const blog = new Blog({
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog);
});

blogRouter.delete(
  "/:id",
  middleware.userExtractor,
  async (request, response) => {
    const user = request.user;

    const blog = await Blog.findById(request.params.id);

    if (!blog) {
      return response.status(404).json({
        error: "blog not found",
      });
    }

    if (blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({
        error: "only creator can delete the blog",
      });
    }

    await Blog.findByIdAndDelete(request.params.id);

    response.status(204).end();
  },
);

blogRouter.put("/:id", async (request, response) => {
  const body = request.body;

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, {
    new: true,
    runValidators: true,
  }).populate("user");

  response.json(updatedBlog);

  response.json(updatedBlog);
});

module.exports = blogRouter;
