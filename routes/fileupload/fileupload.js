const express = require('express');
const router = express.Router();
const Request = require('../../models/Request');
const Project = require('../../models/Project');

router.post('/', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json([{ msg: 'No file Uploaded' }]);
  }
  const file = req.files.file;
  const id = req.body.id;
  const extension = file.name.split('.')[1];
  file.mv(`./client/build/uploads/${id}.${extension}`, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    const filepath = `uploads/${id}.${extension}`;
    try {
      const allreqs = await Request.findByIdAndUpdate(
        {
          _id: id,
        },
        { $set: { planDetails: filepath } },
        { new: true }
      ).populate('user', ['name', 'email']);
      return res.json(allreqs);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
    res.json({
      fileName: id,
      filePath: `uploads/${id}.${extension}`,
    });
  });
});
router.post('/project', async (req, res) => {
  if (req.files === null) {
    return res.status(400).json([{ msg: 'No file Uploaded' }]);
  }
  const file = req.files.file;
  const id = req.body.id;
  const extension = file.name.split('.')[1];
  file.mv(`./client/build/projects/${id}.${extension}`, async (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }
    const filepath = `projects/${id}.${extension}`;
    try {
      const allreqs = await Project.findByIdAndUpdate(
        {
          _id: id,
        },
        { $set: { planDetails: filepath } },
        { new: true }
      );
      return res.json(allreqs);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
    res.json({
      fileName: id,
      filePath: `projects/${id}.${extension}`,
    });
  });
});
module.exports = router;
