const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Video = require('../models/video');


const db_str = process.env.MONGO_URL;
mongoose.Promise = global.Promise;

mongoose.connect(db_str, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err) => {
  if (err) {
    console.error(err);
  }
})

router.get('/videos', (req, res) => {
  console.log('Get request for all Videos');
  Video.find({}).exec((err, videos) => {
    if (err) {
      res.send(err);
    } else {
      res.json(videos);
    }
  });
});

router.get('/videos/:id', (req, res) => {
  console.log('Get request for a single video');
  Video.findById(req.params.id).exec((err, videos) => {
    if (err) {
      res.send(err);
    } else {
      res.json(videos);
    }
  });
});

router.post('/videos', (req, res) => {
  console.log("Post a Video")
  var video = new Video();
  video.title = req.body.title;
  video.url = req.body.url;
  video.description = req.body.description;
  video.save((err, insVideo) => {
    if (err) {
      res.send(err);
    } else {
      res.json(insVideo);
    }
  });
});

router.put('/videos/:id', (req, res) => {
  console.log("Update a video")
  Video.findByIdAndUpdate(
    req.params.id, {
      $set: {
        title: req.body.title,
        url: req.body.url,
        description: req.body.description
      },
    }, {
      new: true
    },
    (err, updVideo) => {
      if (err) {
        res.send(err);
      } else {
        res.json(updVideo);
      }
    });
});

router.delete('/videos/:id', (req, res) => {
  console.log("Deleting a video")
  Video.findByIdAndRemove(req.params.id, (err, delVideo) => {
    if (err) {
      res.send(err);
    } else {
      res.json(delVideo);
    }
  });
});


module.exports = router;
