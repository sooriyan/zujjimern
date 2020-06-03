const express = require('express');
const Project = require('../../models/Project');
const adminauth = require('../../middleware/adminauth');
const router = express.Router();
const { check, validationResult } = require('express-validator');
//@route GET api/project
//@desc Get users Projects
//@access Private
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('admin', ['name', 'email']);
    if (!projects) {
      return res
        .status(400)
        .json({ msg: 'There are no projects created by the user' });
    }
    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
//@route GET api/project/getproject
//@desc Get particular Project
//@access Private
router.put('/getproject', adminauth, async (req, res) => {
  try {
    console.log(req.body.projid);
    const project = await Project.findById({
      _id: req.body.projid,
    }).populate('admin', ['name', 'email']);
    if (!project) {
      return res
        .status(400)
        .json({ msg: 'There are no projects created by the user' });
    }
    res.json(project);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});
//@route POST api/project
//@desc Create project
//@access Private
router.post(
  '/',
  [
    adminauth,
    [
      check('name', 'Enter a valid name for project').not().isEmpty(),
      check('bedroom', 'Enter Number of bedrooms').not().isEmpty(),
      check('sqft', 'Enter Square foot value').not().isEmpty(),
      check('facing', 'Enter facing of the house').not().isEmpty(),
      check('link', 'Enter The iframe URL for the video').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, bedroom, sqft, facing, link, newproj } = req.body;
    const projectfields = {};
    projectfields.name = name;
    projectfields.bedroom = bedroom;
    projectfields.sqft = sqft;
    projectfields.facing = facing;
    projectfields.link = link;
    projectfields.admin = req.admin.id;
    try {
      let project = await Project.findOne({ name: name });
      if (project) {
        if (newproj) {
          let error = {
            msg: 'Entered Project already Exist',
          };
          return res.status(400).json({ errors: [error] });
        }
        //Update
        project = await Project.findOneAndUpdate(
          { name: name },
          { $set: projectfields },
          { new: true }
        );
        return res.json(project);
      }
      //Create
      project = new Project(projectfields);
      await project.save();
      console.log(project);
      res.json(project);
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  }
);
//get recent projects
router.get('/recentprojects', async (req, res) => {
  try {
    const recentprojects = await Project.find().sort({ _id: -1 }).limit(4);
    return res.json(recentprojects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.post('/queryget', async (req, res) => {
  try {
    const { sqft, bedroom } = req.body;
    const projects = await Project.find({
      $or: [{ sqft }, { bedroom }],
    });
    return res.json(projects);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

router.get('/getdistinctsqft', async (req, res) => {
  try {
    const sqfts = await Project.find().distinct('sqft');
    return res.json(sqfts);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
router.get('/getdistinctbedrooms', async (req, res) => {
  try {
    const bedrooms = await Project.find().distinct('bedroom');
    return res.json(bedrooms);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;
