import { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { AppBar, Toolbar, Button, Container } from "@mui/material";

import LoginForm from "./components/LoginForm";
import Blog from "./components/Blog";
import BlogView from "./components/BlogView";
import BlogForm from "./components/BlogFormTemp";
import Notification from "./components/Notification";

import blogService from "./services/blogs";

const Navigation = ({ user, setUser }) => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("loggedBloglistUser");
    setUser(null);
    navigate("/");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Button color="inherit" component={Link} to="/">
          blogs
        </Button>

        {user ? (
          <>
            <Button color="inherit" component={Link} to="/create">
              create
            </Button>

            <span style={{ marginLeft: "auto", marginRight: 15 }}>
              {user.name} logged in
            </span>

            <Button color="inherit" onClick={logout}>
              logout
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/login">
            login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

const BlogList = ({ blogs }) => {
  return (
    <div>
      <h2>blogs</h2>

      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
    </div>
  );
};

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [notification, setNotification] = useState(null);

  const [user, setUser] = useState(() => {
    const loggedUser = localStorage.getItem("loggedBloglistUser");

    return loggedUser ? JSON.parse(loggedUser) : null;
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      return;
    }

    blogService.getAll().then((blogs) => {
      setBlogs(blogs);
    });
  }, [user]);

  const showNotification = (message) => {
    setNotification(message);

    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  const createBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(
        blogObject,
        user.token
      );

      setBlogs(blogs.concat(returnedBlog));

      showNotification(
        `a new blog "${returnedBlog.title}" was added`
      );

      navigate("/");
    } catch {
      showNotification("creating blog failed");
    }
  };

  const likeBlog = async (blog) => {
    if (!user) {
      return;
    }

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    };

    try {
      const returnedBlog = await blogService.update(
        blog.id,
        updatedBlog,
        user.token
      );

      setBlogs(
        blogs.map((b) =>
          b.id === blog.id ? returnedBlog : b
        )
      );
    } catch {
      showNotification("liking blog failed");
    }
  };

  const deleteBlog = async (blog) => {
    if (!user) {
      return;
    }

    if (
      window.confirm(
        `Remove blog ${blog.title} by ${blog.author}?`
      )
    ) {
      try {
        await blogService.remove(blog.id, user.token);

        setBlogs(
          blogs.filter((b) => b.id !== blog.id)
        );

        showNotification("blog deleted");

        navigate("/");
      } catch {
        showNotification("deleting blog failed");
      }
    }
  };

  return (
    <>
      <Navigation
        user={user}
        setUser={setUser}
      />

      <Container>
        <Notification message={notification} />

        <Routes>
          <Route
            path="/"
            element={<BlogList blogs={blogs} />}
          />

          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <LoginForm
                  setUser={setUser}
                  showNotification={showNotification}
                />
              )
            }
          />

          <Route
            path="/blogs/:id"
            element={
              <BlogView
                blogs={blogs}
                user={user}
                likeBlog={likeBlog}
                deleteBlog={deleteBlog}
              />
            }
          />

          <Route
            path="/create"
            element={
              user ? (
                <BlogForm
                  createBlog={createBlog}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </Container>
    </>
  );
};

const AppWithRouter = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWithRouter;