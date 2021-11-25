/* eslint-disable no-unused-expressions */
'use strict'

import chai from 'chai'
import chaiHttp from 'chai-http'

import server from '../src/index.js'

chai.use(chaiHttp)
chai.should()

describe('CRUD test', () => {
  it('it should add post to db when request /posts with POST method', async () => {
    const response = await chai.request(server).post('/api/posts').send({ id: 1, content: 'Hello World !' })
    response.should.have.status(200)
    response.ok.should.be.true
  })

  it('it should get all the posts when request /posts with GET method', async () => {
    const response = await chai.request(server).get('/api/posts')
    response.should.have.status(200)
    response.ok.should.be.true
    response.body.should.to.deep.include({ allPosts: [{ id: 1, content: 'Hello World !' }] })
  })

  it('it should single post when request /posts/id with GET method', async () => {
    const response = await chai.request(server).get('/api/posts/1')
    response.should.have.status(200)
    response.ok.should.be.true
    response.body.should.to.deep.include({ post: { id: 1, content: 'Hello World !' } })
  })

  it('it should update post to db when request /posts/id with PUT method', async () => {
    const response = await chai.request(server).put('/api/posts/1').send({ content: 'Update Hello World !' })
    response.should.have.status(200)
    response.ok.should.be.true
  })

  it('it should delete post to db when request /posts/id with DELETE method', async () => {
    const response = await chai.request(server).delete('/api/posts/1').send({ content: 'Update Hello World !' })
    response.should.have.status(200)
    response.ok.should.be.true
    response.body.should.to.deep.include({ ok: true })
  })
})
