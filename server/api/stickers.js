const router = require('express').Router()
const {Sticker} = require('../db/models')
module.exports = router

//get ALL stickers
router.get('/', async (req, res, next) => {
  try {
    const stickers = await Sticker.findAll()

    if (stickers) {
      res.status(200).json(stickers)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})
