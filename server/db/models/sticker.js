const Sequelize = require('sequelize')
const db = require('../db')

const Sticker = db.define('sticker', {
  imgURL: {
    type: Sequelize.STRING,
    defaultValue: 'public/Rebel_About.png'
  }
})

module.exports = Sticker
