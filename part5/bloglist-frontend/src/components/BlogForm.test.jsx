import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { test, expect, vi } from "vitest";
import BlogForm from "./BlogFormTemp";

test("calls createBlog with correct details when a new blog is created", async () => {
  const createBlog = vi.fn();
  const setShowForm = vi.fn();

  render(
    <BlogForm
      createBlog={createBlog}
      setShowForm={setShowForm}
    />
  );

  const user = userEvent.setup();

  const titleInput = screen.getByLabelText("title:");
  const authorInput = screen.getByLabelText("author:");
  const urlInput = screen.getByLabelText("url:");

  await user.type(titleInput, "My New Blog");
  await user.type(authorInput, "Anand");
  await user.type(urlInput, "https://example.com");

  await user.click(screen.getByText("create"));

  expect(createBlog).toHaveBeenCalledWith({
    title: "My New Blog",
    author: "Anand",
    url: "https://example.com",
  });
});