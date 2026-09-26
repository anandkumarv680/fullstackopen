const { test } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const User = require('../models/user')

const app = require('../app')

const api = supertest(app)

test('blogs are returned as json', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.length, 5)
})

test('blogs have an id property', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogs = response.body

  assert(blogs.every(blog => blog.id))
})

test('a new blog can be added', async () => {
  const blogsAtStart = await api.get('/api/blogs')

  const newBlog = {
    title: 'Testing with SuperTest',
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await api.get('/api/blogs')

  assert.strictEqual(blogsAtEnd.body.length, blogsAtStart.body.length + 1)
})

test('likes defaults to 0 if missing', async () => {
  const newBlog = {
    title: 'Blog without likes',
    author: 'Test Author',
    url: 'http://example.com'
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title is not added', async () => {
  const newBlog = {
    author: 'Test Author',
    url: 'http://example.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('blog without url is not added', async () => {
  const newBlog = {
    title: 'Blog without URL',
    author: 'Test Author',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})


test('a blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs')

  const blogToDelete = blogsAtStart.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')

  assert.strictEqual(
    blogsAtEnd.body.length,
    blogsAtStart.body.length - 1
  )

  assert(
    blogsAtEnd.body.every(blog => blog.id !== blogToDelete.id)
  )
})


test('a blog can be updated', async () => {
  const blogsAtStart = await api.get('/api/blogs')

  const blogToUpdate = blogsAtStart.body[0]

  const updatedBlog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 1)
})

test('user without password is not created', async () => {
  const usersAtStart = await User.find({})

  const newUser = {
    username: 'testuser',
    name: 'Test User'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const usersAtEnd = await User.find({})

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('user with too short username is not created', async () => {
  const usersAtStart = await User.find({})

  const newUser = {
    username: 'ab',
    name: 'Test User',
    password: 'secret123'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const usersAtEnd = await User.find({})

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('duplicate username is not created', async () => {
  const newUser = {
    username: 'uniqueuser',
    name: 'Test User',
    password: 'secret123'
  }

  await api
    .post('/api/users')
    .send(newUser)
    .expect(201)

  const usersAtStart = await User.find({})

  await api
    .post('/api/users')
    .send(newUser)
    .expect(400)

  const usersAtEnd = await User.find({})

  assert.strictEqual(usersAtEnd.length, usersAtStart.length)
})

test('blog cannot be added without a token', async () => {
  const newBlog = {
    title: 'Unauthorized Blog',
    author: 'Test',
    url: 'https://example.com',
    likes: 5
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(401)
})

