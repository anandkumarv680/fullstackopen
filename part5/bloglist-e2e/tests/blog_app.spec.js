const {
  test,
  expect,
  describe,
} = require("@playwright/test");

const testUser = {
  username: "testuser",
  password: "password123",
  name: "Test User",
};

describe("Blog app", () => {
  beforeEach(async ({ page, request }) => {
    await request.post(
      "http://localhost:3003/api/testing/reset"
    );

    await request.post(
      "http://localhost:3003/api/users",
      {
        data: testUser,
      }
    );

    await page.goto("/");
  });

  test("login succeeds with correct credentials", async ({
    page,
  }) => {
    await page.getByRole("link", {
      name: "login",
    }).click();

    await page.getByLabel("username:").fill(
      testUser.username
    );

    await page.getByLabel("password:").fill(
      testUser.password
    );

    await page.getByRole("button", {
      name: "login",
    }).click();

    await expect(
      page.getByText("Test User logged in")
    ).toBeVisible();

    await expect(
      page.getByRole("button", {
        name: "logout",
      })
    ).toBeVisible();
  });

  test("login fails with wrong credentials", async ({
    page,
  }) => {
    await page.getByRole("link", {
      name: "login",
    }).click();

    await page.getByLabel("username:").fill(
      testUser.username
    );

    await page.getByLabel("password:").fill(
      "wrongpassword"
    );

    await page.getByRole("button", {
      name: "login",
    }).click();

    await expect(
      page.getByRole("button", {
        name: "login",
      })
    ).toBeVisible();
  });

  describe("when logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByRole("link", {
        name: "login",
      }).click();

      await page.getByLabel("username:").fill(
        testUser.username
      );

      await page.getByLabel("password:").fill(
        testUser.password
      );

      await page.getByRole("button", {
        name: "login",
      }).click();

      await expect(
        page.getByText("Test User logged in")
      ).toBeVisible();
    });

    test("a logged in user can create a blog", async ({
      page,
    }) => {
      await page.getByRole("link", {
        name: "create",
      }).click();

      await page.getByLabel("title:").fill(
        "My Test Blog"
      );

      await page.getByLabel("author:").fill(
        "Anand"
      );

      await page.getByLabel("url:").fill(
        "https://example.com"
      );

      await page.getByRole("button", {
        name: "create",
      }).click();

      await expect(
        page.getByText("My Test Blog")
      ).toBeVisible();
    });

    test("a logged in user can like blogs", async ({
      page,
    }) => {
      await page.getByRole("link", {
        name: "create",
      }).click();

      await page.getByLabel("title:").fill(
        "Like Test Blog"
      );

      await page.getByLabel("author:").fill(
        "Anand"
      );

      await page.getByLabel("url:").fill(
        "https://example.com/like"
      );

      await page.getByRole("button", {
        name: "create",
      }).click();

      await page.getByRole("link", {
        name: "view",
      }).click();

      await expect(
        page.getByText("likes: 0")
      ).toBeVisible();

      await page.getByRole("button", {
        name: "like",
      }).click();

      await expect(
        page.getByText("likes: 1")
      ).toBeVisible();
    });

    test("a logged in user can delete a blog", async ({
      page,
    }) => {
      await page.getByRole("link", {
        name: "create",
      }).click();

      await page.getByLabel("title:").fill(
        "Delete Test Blog"
      );

      await page.getByLabel("author:").fill(
        "Anand"
      );

      await page.getByLabel("url:").fill(
        "https://example.com/delete"
      );

      await page.getByRole("button", {
        name: "create",
      }).click();

      await page.getByRole("link", {
        name: "view",
      }).click();

      await expect(
        page.getByRole("button", {
          name: "remove",
        })
      ).toBeVisible();

      page.once("dialog", async (dialog) => {
        await dialog.accept();
      });

      await page.getByRole("button", {
        name: "remove",
      }).click();

      await expect(
        page.getByText("Delete Test Blog")
      ).not.toBeVisible();
    });
  });
});