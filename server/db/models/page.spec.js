const {expect} = require('chai')
const db = require('../index')
const Page = db.model('page')

describe('Page Model', () => {
  let page
  beforeEach(() => {
    return db.sync({force: true})
  })
  afterEach(() => db.sync({force: true}))
  it('has imageURL', async () => {
    const newPage = await Page.create(page)
    expect(newPage.imgURL).to.equal('public/LindaEng_Untitled_Artwork 5.png')
  })

  it('has a default imgURL if none specified', async () => {
    delete Page.imgURL
    const defaultType = await Page.create(page)
    expect(defaultType.imgURL).to.equal(
      'public/LindaEng_Untitled_Artwork 5.png'
    )
  })
})
