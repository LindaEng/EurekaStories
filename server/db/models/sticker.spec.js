const {expect} = require('chai')
const db = require('../index')
const Sticker = db.model('sticker')

describe('Sticker Model', () => {
  let sticker
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => db.sync({force: true}))
  it('has imgURL', async () => {
    const newSticker = await Sticker.create(sticker)
    expect(newSticker.imgURL).to.equal('public/Rebel_About.png')
  })

  it('has a default imgURL if none specified', async () => {
    delete Sticker.imgURL
    const defaultType = await Sticker.create(sticker)
    expect(defaultType.imgURL).to.equal('public/Rebel_About.png')
  })
})
