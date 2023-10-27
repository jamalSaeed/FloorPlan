const express = require('express')
const floorController  = require('../controllers/floorController')
const multer = require('multer')
const upload = multer({dest:'public/image/users'})

const router = express.Router()


router.route('/').get(floorController.getAllFloorPlan).post(floorController.uploadFloorImages, floorController.checkBody, floorController.createNewFloorPlan)
// router.route('/:id').patch(floorController.updateUniversity).delete(floorController.deleteUniversity)

module.exports = router