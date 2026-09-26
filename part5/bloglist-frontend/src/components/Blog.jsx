import { useState } from "react";

const Blog = ({ blog, likeBlog, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    padding: 10,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div className="blog" style={blogStyle}>
      <div>
        {blog.title} {blog.author}

        <button onClick={() => setShowDetails(!showDetails)}>
          {showDetails ? "hide" : "view"}
        </button>
      </div>

      {showDetails && (
        <div>
          <p>{blog.url}</p>

          <p>
            likes {blog.likes}
            <button onClick={() => likeBlog(blog)}>
              like
            </button>
          </p>

          <p>{blog.user?.name}</p>
        </div>
      )}

      {blog.user?.username === user?.username && (
        <button onClick={() => deleteBlog(blog)}>
          remove
        </button>
      )}
    </div>
  );
};

export default Blog;