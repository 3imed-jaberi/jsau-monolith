import { Router } from 'express'

import {
  getPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} from '../controllers/posts.controller.js'

const router = Router()

router.route('/').get(getPosts).post(createPost)

router.route('/:id').get(getPostById).put(updatePost).delete(deletePost)

export default router
