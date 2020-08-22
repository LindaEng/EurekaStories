const Sequelize = require('sequelize')
const db = require('../db')

const Story = db.define('story', {
  title: {
    type: Sequelize.STRING,
    allowNull: true
  },
  coverImage: {
    type: Sequelize.STRING,
    defaultValue: 'https://source.unsplash.com/random'
  },
  canvasJson: {
    type: Sequelize.JSON
  }
})

module.exports = Story
