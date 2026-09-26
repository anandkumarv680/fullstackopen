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
        title:
        <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>

      <div>
        author:
        <input
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>

      <div>
        url:
        <input value={url} onChange={({ target }) => setUrl(target.value)} />
      </div>

      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
