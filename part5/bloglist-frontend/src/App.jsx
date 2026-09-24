import { useEffect, useState } from "react";
import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogForm from "./components/BlogFormTemp";
import Notification from "./components/Notification";
import blogService from "./services/blogs";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  const [user, setUser] = useState(() => {
    const loggedUser = localStorage.getItem("loggedBloglistUser");
    return loggedUser ? JSON.parse(loggedUser) : null;
  });

  const handleLogout = () => {
    localStorage.removeItem("loggedBloglistUser");
    setUser(null);
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      if (user) {
        const blogs = await blogService.getAll();
        setBlogs(blogs);
      }
    };

    fetchBlogs();
  }, [user]);

  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const createBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.create(blogObject, user.token);

      setBlogs(blogs.concat(newBlog));

      showNotification(`a new blog ${newBlog.title} added`);
    } catch{
      showNotification("creating blog failed");
    }
  };

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <LoginForm setUser={setUser} showNotification={showNotification} />
      </div>
    );
  }

  return (
    <div>
      <Notification message={notification} />

      <h2>blogs</h2>

      <p>
        {user.name} logged in <button onClick={handleLogout}>logout</button>
      </p>

      <BlogForm createBlog={createBlog} />

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
