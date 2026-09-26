import { useState } from "react";

const BlogForm = ({ createBlog, setShowForm }) => {
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

    setShowForm(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          title:
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          author:
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>

      <div>
        <label>
          url:
          <input
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>

      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;