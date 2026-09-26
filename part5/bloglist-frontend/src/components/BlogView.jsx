import { useNavigate, useParams } from "react-router-dom";
import {
  Paper,
  Button,
  Stack,
} from "@mui/material";

const BlogView = ({
  blogs,
  user,
  likeBlog,
  deleteBlog,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const blog = blogs.find(
    (blog) => blog.id === id
  );

  if (!blog) {
    return <p>blog not found</p>;
  }

  const isCreator =
    user &&
    blog.user &&
    blog.user.username === user.username;

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        marginTop: 3,
      }}
    >
      <h2>{blog.title}</h2>

      <p>
        <strong>author:</strong> {blog.author}
      </p>

      <p>
        <strong>url:</strong>{" "}
        <a
          href={blog.url}
          target="_blank"
          rel="noreferrer"
        >
          {blog.url}
        </a>
      </p>

      <p>
        <strong>likes:</strong> {blog.likes}
      </p>

      <p>
        <strong>added by:</strong>{" "}
        {blog.user?.name}
      </p>

      <Stack direction="row" spacing={2}>
        {user && (
          <Button
            variant="contained"
            onClick={() => likeBlog(blog)}
          >
            like
          </Button>
        )}

        {isCreator && (
          <Button
            variant="outlined"
            color="error"
            onClick={() => deleteBlog(blog)}
          >
            remove
          </Button>
        )}

        <Button
          variant="outlined"
          onClick={() => navigate("/")}
        >
          back
        </Button>
      </Stack>
    </Paper>
  );
};

export default BlogView;