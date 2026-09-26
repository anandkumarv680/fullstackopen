const { test, expect, beforeEach, describe } = require("@playwright/test");

const testUser = {
  username: "testuser",
  password: "password123",
  name: "Test User",
};

const secondUser = {
  username: "seconduser",
  password: "password123",
  name: "Second User",
};


// ======================================================
// BLOG APP
// ======================================================

describe("Blog app", () => {
  // ----------------------------------------------------
  // Runs before every test
  // ----------------------------------------------------

  beforeEach(async ({ page, request }) => {
    // Empty database
    await request.post("http://localhost:3003/api/testing/reset");

    // Create first test user
    await request.post("http://localhost:3003/api/users", {
      data: testUser,
    });

    // Create second user
    await request.post("http://localhost:3003/api/users", {
      data: secondUser,
    });

    // Open frontend
    await page.goto("/");
  });


  // ====================================================
  // 5.17
  // ====================================================

  test("Login form is shown", async ({ page }) => {
    await expect(
      page.getByText("Log in to application")
    ).toBeVisible();

    await expect(
      page.getByRole("button", { name: "login" })
    ).toBeVisible();
  });


  // ====================================================
  // 5.18
  // ====================================================

  describe("Login", () => {

    test("succeeds with correct credentials", async ({ page }) => {
      await page.getByLabel("username:").fill(testUser.username);

      await page.getByLabel("password:").fill(testUser.password);

      await page.getByRole("button", {
        name: "login",
      }).click();

      await expect(
        page.getByText("Test User logged in")
      ).toBeVisible();
    });


    test("fails with wrong credentials", async ({ page }) => {
      await page.getByLabel("username:").fill(testUser.username);

      await page.getByLabel("password:").fill("wrongpassword");

      await page.getByRole("button", {
        name: "login",
      }).click();

      // Wrong login should keep us on login page
      await expect(
        page.getByText("Log in to application")
      ).toBeVisible();

      await expect(
        page.getByRole("button", {
          name: "login",
        })
      ).toBeVisible();
    });
  });


  // ====================================================
  // 5.19
  // ====================================================

  describe("When logged in", () => {

    beforeEach(async ({ page }) => {
      await page.getByLabel("username:").fill(testUser.username);

      await page.getByLabel("password:").fill(testUser.password);

      await page.getByRole("button", {
        name: "login",
      }).click();

      await expect(
        page.getByText("Test User logged in")
      ).toBeVisible();
    });


    test("a new blog can be created", async ({ page }) => {
      await page.getByRole("button", {
        name: "create new blog",
      }).click();

      await page.getByLabel("title:").fill("My Test Blog");

      await page.getByLabel("author:").fill("Anand");

      await page
        .getByLabel("url:")
        .fill("https://example.com");

      await page.getByRole("button", {
        name: "create",
      }).click();

      const blog = page.locator(".blog").filter({
        hasText: "My Test Blog",
      });

      await expect(blog).toBeVisible();

      await expect(
        blog.getByText("Anand")
      ).toBeVisible();
    });


    // ==================================================
    // 5.20
    // ==================================================

    test("a blog can be liked", async ({ page }) => {
      // Create blog
      await page.getByRole("button", {
        name: "create new blog",
      }).click();

      await page.getByLabel("title:").fill("Like Test Blog");

      await page.getByLabel("author:").fill("Anand");

      await page
        .getByLabel("url:")
        .fill("https://example.com/like");

      await page.getByRole("button", {
        name: "create",
      }).click();


      // Find created blog
      const blog = page.locator(".blog").filter({
        hasText: "Like Test Blog",
      });

      await expect(blog).toBeVisible();


      // Open details
      await blog.getByRole("button", {
        name: "view",
      }).click();


      // Initial likes should be 0
      await expect(
        blog.getByText("likes 0")
      ).toBeVisible();


      // Like
      await blog.getByRole("button", {
        name: "like",
      }).click();


      // Likes should now be 1
      await expect(
        blog.getByText("likes 1")
      ).toBeVisible();
    });


    // ==================================================
    // 5.21
    // ==================================================

    test("user who created the blog can delete it", async ({ page }) => {
      // Create blog
      await page.getByRole("button", {
        name: "create new blog",
      }).click();

      await page.getByLabel("title:").fill("Delete Test Blog");

      await page.getByLabel("author:").fill("Anand");

      await page
        .getByLabel("url:")
        .fill("https://example.com/delete");

      await page.getByRole("button", {
        name: "create",
      }).click();


      // Find blog
      const blog = page.locator(".blog").filter({
        hasText: "Delete Test Blog",
      });

      await expect(blog).toBeVisible();


      // Open details
      await blog.getByRole("button", {
        name: "view",
      }).click();


      // Handle browser confirmation dialog
      page.once("dialog", async (dialog) => {
        await dialog.accept();
      });


      // Delete
      await blog.getByRole("button", {
        name: "remove",
      }).click();


      // Blog should disappear
      await expect(
        page.locator(".blog").filter({
          hasText: "Delete Test Blog",
        })
      ).not.toBeVisible();
    });


    // ==================================================
    // 5.22
    // ==================================================

    test("only creator sees the delete button", async ({ page }) => {
      // ----------------------------------------------
      // Create blog as first user
      // ----------------------------------------------

      await page.getByRole("button", {
        name: "create new blog",
      }).click();

      await page.getByLabel("title:").fill("Ownership Test Blog");

      await page.getByLabel("author:").fill("Anand");

      await page
        .getByLabel("url:")
        .fill("https://example.com/ownership");

      await page.getByRole("button", {
        name: "create",
      }).click();


      const blog = page.locator(".blog").filter({
        hasText: "Ownership Test Blog",
      });

      await expect(blog).toBeVisible();


      // ----------------------------------------------
      // Creator should see remove button
      // ----------------------------------------------

      await blog.getByRole("button", {
        name: "view",
      }).click();

      await expect(
        blog.getByRole("button", {
          name: "remove",
        })
      ).toBeVisible();


      // ----------------------------------------------
      // Logout
      // ----------------------------------------------

      await page.getByRole("button", {
        name: "logout",
      }).click();


      // ----------------------------------------------
      // Login as second user
      // ----------------------------------------------

      await page.getByLabel("username:").fill(
        secondUser.username
      );

      await page.getByLabel("password:").fill(
        secondUser.password
      );

      await page.getByRole("button", {
        name: "login",
      }).click();


      await expect(
        page.getByText("Second User logged in")
      ).toBeVisible();


      // ----------------------------------------------
      // Find the same blog
      // ----------------------------------------------

      const sameBlog = page.locator(".blog").filter({
        hasText: "Ownership Test Blog",
      });

      await expect(sameBlog).toBeVisible();


      // Open details
      await sameBlog.getByRole("button", {
        name: "view",
      }).click();


      // ----------------------------------------------
      // Second user should NOT see remove
      // ----------------------------------------------

      await expect(
        sameBlog.getByRole("button", {
          name: "remove",
        })
      ).not.toBeVisible();
    });


    // ==================================================
    // 5.23
    // ==================================================

    test("blogs are ordered according to likes", async ({ page }) => {

      // ----------------------------------------------
      // Create Blog 1
      // ----------------------------------------------

      await page.getByRole("button", {
        name: "create new blog",
      }).click();

      await page.getByLabel("title:").fill("Blog One");

      await page.getByLabel("author:").fill("Anand");

      await page
        .getByLabel("url:")
        .fill("https://example.com/one");

      await page.getByRole("button", {
        name: "create",
      }).click();


      // ----------------------------------------------
      // Create Blog 2
      // ----------------------------------------------

      await page.getByRole("button", {
        name: "create new blog",
      }).click();

      await page.getByLabel("title:").fill("Blog Two");

      await page.getByLabel("author:").fill("Anand");

      await page
        .getByLabel("url:")
        .fill("https://example.com/two");

      await page.getByRole("button", {
        name: "create",
      }).click();


      // ----------------------------------------------
      // Create Blog 3
      // ----------------------------------------------

      await page.getByRole("button", {
        name: "create new blog",
      }).click();

      await page.getByLabel("title:").fill("Blog Three");

      await page.getByLabel("author:").fill("Anand");

      await page
        .getByLabel("url:")
        .fill("https://example.com/three");

      await page.getByRole("button", {
        name: "create",
      }).click();


      // ----------------------------------------------
      // Blog One -> 1 like
      // ----------------------------------------------

      let blog = page.locator(".blog").filter({
        hasText: "Blog One",
      });

      await blog.getByRole("button", {
        name: "view",
      }).click();

      await blog.getByRole("button", {
        name: "like",
      }).click();


      // ----------------------------------------------
      // Blog Two -> 2 likes
      // ----------------------------------------------

      blog = page.locator(".blog").filter({
        hasText: "Blog Two",
      });

      await blog.getByRole("button", {
        name: "view",
      }).click();

      await blog.getByRole("button", {
        name: "like",
      }).click();

      await blog.getByRole("button", {
        name: "like",
      }).click();


      // ----------------------------------------------
      // Blog Three -> 3 likes
      // ----------------------------------------------

      blog = page.locator(".blog").filter({
        hasText: "Blog Three",
      });

      await blog.getByRole("button", {
        name: "view",
      }).click();

      await blog.getByRole("button", {
        name: "like",
      }).click();

      await blog.getByRole("button", {
        name: "like",
      }).click();

      await blog.getByRole("button", {
        name: "like",
      }).click();


      // ----------------------------------------------
      // Check order
      // ----------------------------------------------

      const blogs = page.locator(".blog");

      await expect(blogs.nth(0)).toContainText("Blog Three");

      await expect(blogs.nth(1)).toContainText("Blog Two");

      await expect(blogs.nth(2)).toContainText("Blog One");
    });
  });
});