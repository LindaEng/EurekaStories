const {expect} = require('chai')
const request = require('supertest')
const app = require('../index')
const db = require('../db')
const Sticker = db.model('sticker')

describe('Sticker Routes', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  describe('api/stickers/', () => {
    const stickerImg = 'public/Rebel_About.png'
    beforeEach(() => {
      return Sticker.create({
        imgURL: stickerImg
      })
    })
    it('serves up all stickers on request GET stickers', async () => {
      const res = await request(app)
        .get('/api/stickers')
        .expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.be.equal(1)
      expect(res.body[0].imgURL).to.be.equal(stickerImg)
    })
  })
})
