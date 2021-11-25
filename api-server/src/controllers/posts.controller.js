import { db } from '../db/index.db.js'

// @desc    Fetch all posts
// @route   GET /api/posts
// @access  Public
export async function getPosts (request, response) {
  await db.read()
  const allPosts = db.data.posts
  response.status(200).json({ allPosts })
}

// @desc    Fetch single post
// @route   GET /api/posts/:id
// @access  Public
export async function getPostById (request, response) {
  await db.read()
  const postId = request.params.id
  const post = db.data.posts.find((p) => +p.id === +postId)
  response.status(200).json({ post })
}

// @desc    Create a post
// @route   POST /api/posts
// @access  Public
export async function createPost (request, response) {
  await db.read()
  // TODO: add validation
  const newPost = request.body
  const post = db.data.posts.push(newPost)
  // persist to file
  await db.write()
  response.status(200).json({ post })
}

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Public
export async function updatePost (request, response) {
  await db.read()
  const postId = request.params.id
  const allPosts = db.data.posts
  const findedPost = allPosts.find(p => +p.id === +postId)
  if (!findedPost) return response.status(404).json({ msg: 'Post not found !' })
  // remove the finded post
  const cleanPosts = allPosts.filter((p) => +p.id !== +postId)
  // TODO: add validation
  const newPost = request.body
  const updatedPost = { ...findedPost, ...newPost }

  const posts = [...cleanPosts, updatedPost]
  db.data.posts = posts
  // persist to file
  await db.write()
  response.status(200).json({ posts })
}

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Public
export async function deletePost (request, response) {
  await db.read()
  const postId = request.params.id
  const allPosts = db.data.posts
  const updatedPosts = allPosts.filter((p) => +p.id !== +postId)
  db.data.posts = updatedPosts
  // persist to file
  await db.write()
  response.status(200).json({ ok: true })
}
