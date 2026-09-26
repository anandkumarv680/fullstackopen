import {
  render,
  screen,
} from "@testing-library/react";

import "@testing-library/jest-dom/vitest";

import {
  test,
  expect,
  vi,
} from "vitest";

import {
  MemoryRouter,
  Routes,
  Route,
} from "react-router-dom";

import BlogView from "./BlogView";

const blog = {
  id: "123",
  title: "React testing",
  author: "Anand",
  url: "https://example.com",
  likes: 5,
  user: {
    username: "anand",
    name: "Anand Verma",
  },
};

const renderBlog = (user) => {
  render(
    <MemoryRouter
      initialEntries={["/blogs/123"]}
    >
      <Routes>
        <Route
          path="/blogs/:id"
          element={
            <BlogView
              blogs={[blog]}
              user={user}
              likeBlog={vi.fn()}
              deleteBlog={vi.fn()}
            />
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

test("blog information and likes are displayed to unauthenticated users", () => {
  renderBlog(null);

  expect(
    screen.getByText("React testing")
  ).toBeVisible();

  expect(
    screen.getByText("author: Anand")
  ).toBeVisible();

  expect(
    screen.getByText("likes: 5")
  ).toBeVisible();

  expect(
    screen.getByRole("button", {
      name: "like",
    })
  ).not.toBeInTheDocument();

  expect(
    screen.getByRole("button", {
      name: "remove",
    })
  ).not.toBeInTheDocument();
});

test("logged in non-creator sees only like button", () => {
  renderBlog({
    username: "anotheruser",
    name: "Another User",
  });

  expect(
    screen.getByRole("button", {
      name: "like",
    })
  ).toBeVisible();

  expect(
    screen.queryByRole("button", {
      name: "remove",
    })
  ).not.toBeInTheDocument();
});

test("creator sees like and delete buttons", () => {
  renderBlog({
    username: "anand",
    name: "Anand Verma",
  });

  expect(
    screen.getByRole("button", {
      name: "like",
    })
  ).toBeVisible();

  expect(
    screen.getByRole("button", {
      name: "remove",
    })
  ).toBeVisible();
});