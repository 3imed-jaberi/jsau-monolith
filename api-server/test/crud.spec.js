/* eslint-disable no-unused-expressions */
'use strict'

import request from 'supertest'

import server from '../src/index.js'

describe('CRUD test', () => {
  it('it should add post to db when request /posts with POST method', async () => {
    const response = await request(server).post('/api/posts').send({ id: 1, content: 'Hello World !' })
    expect(response.status).toBe(200)
    expect(response.ok).toBe(true)
  })

  it('it should get all the posts when request /posts with GET method', async () => {
    const response = await request(server).get('/api/posts')
    expect(response.status).toBe(200)
    expect(response.ok).toBe(true)
    expect(response.body).toEqual({ allPosts: [{ id: 1, content: 'Hello World !' }] })
  })

  it('it should single post when request /posts/id with GET method', async () => {
    const response = await request(server).get('/api/posts/1')
    expect(response.status).toBe(200)
    expect(response.ok).toBe(true)
    expect(response.body).toEqual({ post: { id: 1, content: 'Hello World !' } })
  })

  it('it should update post to db when request /posts/id with PUT method', async () => {
    const response = await request(server).put('/api/posts/1').send({ content: 'Update Hello World !' })
    expect(response.status).toBe(200)
    expect(response.ok).toBe(true)
  })

  it('it should delete post to db when request /posts/id with DELETE method', async () => {
    const response = await request(server).delete('/api/posts/1').send({ content: 'Update Hello World !' })
    expect(response.status).toBe(200)
    expect(response.ok).toBe(true)
    expect(response.body).toEqual({ ok: true })
  })
})
