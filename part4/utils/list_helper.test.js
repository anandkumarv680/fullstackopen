const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  assert.strictEqual(result, 1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
      likes: 5
    }
  ]

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })
})

describe('favorite blog', () => {
  const blogs = [
    {
      _id: '1',
      title: 'Blog 1',
      author: 'Author 1',
      url: 'https://blog1.com',
      likes: 5
    },
    {
      _id: '2',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'https://blog2.com',
      likes: 20
    },
    {
      _id: '3',
      title: 'Blog 3',
      author: 'Author 3',
      url: 'https://blog3.com',
      likes: 10
    }
  ]

  test('blog with most likes is returned', () => {
    const result = listHelper.favoriteBlog(blogs)

    assert.deepStrictEqual(result, {
      _id: '2',
      title: 'Blog 2',
      author: 'Author 2',
      url: 'https://blog2.com',
      likes: 20
    })
  })
})

describe('most blogs', () => {
  const blogs = [
    {
      title: 'Blog 1',
      author: 'Robert C. Martin',
      likes: 5
    },
    {
      title: 'Blog 2',
      author: 'Robert C. Martin',
      likes: 10
    },
    {
      title: 'Blog 3',
      author: 'Edsger W. Dijkstra',
      likes: 8
    },
    {
      title: 'Blog 4',
      author: 'Robert C. Martin',
      likes: 7
    }
  ]

  test('author with most blogs is returned', () => {
    const result = listHelper.mostBlogs(blogs)

    assert.deepStrictEqual(result, {
      author: 'Robert C. Martin',
      blogs: 3
    })
  })
})

describe('most likes', () => {
  const blogs = [
    {
      title: 'Blog 1',
      author: 'Robert C. Martin',
      likes: 5
    },
    {
      title: 'Blog 2',
      author: 'Edsger W. Dijkstra',
      likes: 10
    },
    {
      title: 'Blog 3',
      author: 'Edsger W. Dijkstra',
      likes: 7
    },
    {
      title: 'Blog 4',
      author: 'Robert C. Martin',
      likes: 4
    }
  ]

  test('author with most likes is returned', () => {
    const result = listHelper.mostLikes(blogs)

    assert.deepStrictEqual(result, {
      author: 'Edsger W. Dijkstra',
      likes: 17
    })
  })
})