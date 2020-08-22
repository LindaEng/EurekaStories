const User = require('./user')
const Story = require('./story.js')
const Page = require('./page.js')
const Sticker = require('./sticker.js')
/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

User.hasMany(Story)
Story.belongsTo(User)
Story.hasMany(Page)
Page.belongsTo(Story)

//Helper Methods
Story.findStoryAndItsPages = function(storyId) {
  return Story.findByPk(storyId, {
    include: [
      {
        model: Page
      }
    ]
  })
}

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Story,
  Page,
  Sticker
}
