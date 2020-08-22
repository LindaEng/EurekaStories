const Sequelize = require('sequelize')
const db = require('../db')

const Page = db.define('page', {
  imgURL: {
    type: Sequelize.STRING,
    defaultValue: 'https://source.unsplash.com/random'
  },
  canvasPage: {
    type: Sequelize.JSON
  }
})

module.exports = Page
