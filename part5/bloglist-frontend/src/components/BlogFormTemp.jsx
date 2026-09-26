import { useState } from "react";
import {
  TextField,
  Button,
  Paper,
  Stack,
} from "@mui/material";

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    await createBlog({
      title,
      author,
      url,
    });

    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        marginTop: 3,
        maxWidth: 500,
      }}
    >
      <h2>create new blog</h2>

      <form onSubmit={handleSubmit}>
        <Stack spacing={2}>
          <TextField
            label="title:"
            value={title}
            onChange={({ target }) =>
              setTitle(target.value)
            }
          />

          <TextField
            label="author:"
            value={author}
            onChange={({ target }) =>
              setAuthor(target.value)
            }
          />

          <TextField
            label="url:"
            value={url}
            onChange={({ target }) =>
              setUrl(target.value)
            }
          />

          <Button
            type="submit"
            variant="contained"
          >
            create
          </Button>
        </Stack>
      </form>
    </Paper>
  );
};

export default BlogForm;