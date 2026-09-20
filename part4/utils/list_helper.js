const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => {
    return sum + blog.likes
  }, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((favorite, blog) => {
    return blog.likes > favorite.likes ? blog : favorite
  })
}

const mostBlogs = (blogs) => {
  const counts = {}

  blogs.forEach((blog) => {
    counts[blog.author] = (counts[blog.author] || 0) + 1
  })

  let topAuthor = ''
  let maxBlogs = 0

  for (const author in counts) {
    if (counts[author] > maxBlogs) {
      topAuthor = author
      maxBlogs = counts[author]
    }
  }

  return {
    author: topAuthor,
    blogs: maxBlogs
  }
}
const mostLikes = (blogs) => {
  const likes = {}

  blogs.forEach((blog) => {
    likes[blog.author] = (likes[blog.author] || 0) + blog.likes
  })

  let topAuthor = ''
  let maxLikes = 0

  for (const author in likes) {
    if (likes[author] > maxLikes) {
      topAuthor = author
      maxLikes = likes[author]
    }
  }

  return {
    author: topAuthor,
    likes: maxLikes
  }
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
   mostLikes 
}