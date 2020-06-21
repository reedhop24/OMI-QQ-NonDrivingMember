const express = require('express');
const router = express.Router();
const ModelSave = require('../models/nonDrivingModel');
const bodyParser = require('body-parser');
const { Model } = require('mongoose');

router.use(bodyParser());

router.get('/Models', async (req, res) => {
    try {
        const sendModel = await ModelSave.find({Name: req.query.Name});
        res.json(sendModel);
    } catch(err) {
        console.log(err);
    }
});

// Only used to set the data
router.post('/PostNonDriving', async (req, res) => {
    const post = new ModelSave({
        Name: req.body['Name'],
        Model: req.body['Model']
    });
    try {
       const savedPost = await post.save();
       res.json(savedPost); 
    } catch(err) {
        res.json({message: err});
    }
});

router.post('/HouseholdMember', async (req, res) => {
    res.json({status: 200});
});

router.post('/Driver', (req, res) => {
    res.json({status: 200});
})

module.exports = router;

