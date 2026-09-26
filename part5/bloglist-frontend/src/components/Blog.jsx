import { Link } from "react-router-dom";
import { Paper, Button } from "@mui/material";

const Blog = ({ blog }) => {
  return (
    <Paper
      className="blog"
      elevation={3}
      sx={{
        padding: 2,
        marginBottom: 2,
      }}
    >
      <div>
        <strong>
          {blog.title}
        </strong>{" "}
        {blog.author}

        <Button
          component={Link}
          to={`/blogs/${blog.id}`}
          size="small"
          sx={{ marginLeft: 2 }}
        >
          view
        </Button>
      </div>
    </Paper>
  );
};

export default Blog;