const router = require('express').Router()
const {Story, Page} = require('../db/models')
module.exports = router

//get all stories from user
router.get('/:userId/stories', async (req, res, next) => {
  try {
    const stories = await Story.findAll({
      where: {
        userId: req.params.userId
      }
    })
    if (stories) {
      res.status(200).json(stories)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

//get one story
router.get('/:storyId', async (req, res, next) => {
  try {
    const storyId = req.params.storyId
    const story = await Story.findByPk(storyId)
    if (story) {
      res.status(200).json(story)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

//*****UPDATE THIS ROUTE */
//get one story and its pages
router.get('/:storyId/pages', async (req, res, next) => {
  try {
    const storyId = req.params.storyId
    const story = await Page.findAll({
      where: {
        storyId: storyId
      }
    })
    if (story) {
      res.status(200).json(story)
    } else {
      res.sendStatus(404)
    }
  } catch (error) {
    next(error)
  }
})

//add page to story
//need storyId, pageId, jsonObject, imageUrl
router.post('/:storyId/pages', async (req, res, next) => {
  const storyId = req.params.storyId
  try {
    let pageBody = req.body
    pageBody.storyId = storyId
    const newPage = await Page.create(pageBody)
    if (newPage) {
      console.log('Page has been sucessfully added to Story')
      res.sendStatus(200)
    } else {
      res.sendStatus(500)
    }
  } catch (error) {
    next(error)
  }
})

//create story
router.post('/:userId/stories', async (req, res, next) => {
  try {
    let storyBody = req.body
    storyBody.userId = req.params.userId
    const updatedStory = await Story.create(storyBody)
    if (updatedStory) {
      console.log('succesfully added new story to database')
      res.sendStatus(200)
    } else {
      res.sendStatus(500)
    }
  } catch (error) {
    next(error)
  }
})

//update story
router.put('/:storyID', async (req, res, next) => {
  try {
    const storyId = req.params.storyID
    const storyToUpdate = await Story.findByPk(storyId)
    const updatedStory = await storyToUpdate.update(req.body)
    if (updatedStory) {
      res.status(200).json(updatedStory)
    } else {
      const error = new Error('Failed to PUT /api/stories/:storyID')
      error.status = 500
      throw error
    }
  } catch (error) {
    next(error)
  }
})

//delete story
router.delete('/:storyID', async (req, res, next) => {
  try {
    const storyId = req.params.storyID
    const storyToDelete = await Story.findByPk(storyId)
    const deletedStory = await storyToDelete.destroy()
    if (deletedStory) {
      res.sendStatus(204)
    } else {
      const error = new Error('Failed to DELETE /api/stories/:storyID')
      error.status = 500
      throw error
    }
  } catch (error) {
    next(error)
  }
})
