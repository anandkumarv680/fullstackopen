import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import userEvent from "@testing-library/user-event";
import { test, expect, vi } from "vitest";
import Blog from "./Blog";

test("renders title and author, but not URL or likes by default", () => {
  const blog = {
    title: "The Joel Test",
    author: "Joel Spolsky",
    url: "https://example.com",
    likes: 5,
    user: {
      name: "Anand",
      username: "anand",
    },
    id: "123",
  };

  const likeBlog = vi.fn();
  const deleteBlog = vi.fn();

  render(
    <Blog
      blog={blog}
      likeBlog={likeBlog}
      deleteBlog={deleteBlog}
    />
  );

  expect(screen.getByText("The Joel Test")).toBeInTheDocument();
  expect(screen.getByText("Joel Spolsky")).toBeInTheDocument();

  expect(
    screen.queryByText("https://example.com")
  ).not.toBeInTheDocument();

  expect(
    screen.queryByText("likes 5")
  ).not.toBeInTheDocument();
});

test("renders URL and likes when view button is clicked", async () => {
  const blog = {
    title: "The Joel Test",
    author: "Joel Spolsky",
    url: "https://example.com",
    likes: 5,
    user: {
      name: "Anand",
      username: "anand",
    },
    id: "123",
  };

  const likeBlog = vi.fn();
  const deleteBlog = vi.fn();

  render(
    <Blog
      blog={blog}
      likeBlog={likeBlog}
      deleteBlog={deleteBlog}
    />
  );

  const user = userEvent.setup();

  const viewButton = screen.getByText("view");

  await user.click(viewButton);

  expect(
    screen.getByText("https://example.com")
  ).toBeInTheDocument();

  expect(
    screen.getByText("likes 5")
  ).toBeInTheDocument();
});

test("calls like handler twice when like button is clicked twice", async () => {
  const blog = {
    title: "The Joel Test",
    author: "Joel Spolsky",
    url: "https://example.com",
    likes: 5,
    user: {
      name: "Anand",
      username: "anand",
    },
    id: "123",
  };

  const likeBlog = vi.fn();
  const deleteBlog = vi.fn();

  render(
    <Blog
      blog={blog}
      likeBlog={likeBlog}
      deleteBlog={deleteBlog}
    />
  );

  const user = userEvent.setup();

  // First show the details
  await user.click(screen.getByText("view"));

  // Find and click like twice
  const likeButton = screen.getByText("like");

  await user.click(likeButton);
  await user.click(likeButton);

  expect(likeBlog).toHaveBeenCalledTimes(2);
});