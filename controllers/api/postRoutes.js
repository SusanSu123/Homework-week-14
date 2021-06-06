const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');


router.get('/', async (req, res) => {
  try {
    const postData = await Post.findAll({   
      })

      res.json(postData.reverse())
    } catch (err){
          res.status(500).json(err);
      }; 
    
});


router.get('/:id', async (req, res) => {
  try {
    const getOne = await Post.findOne({
          where: {
              id: req.params.id
          }        
      })
    
      if (!getOne) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          res.json(getOne);
      } catch (err) {
          res.status(500).json(err);
      };
});

router.post('/', withAuth, async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.user_id,
      title: req.body.title,
      post_text: req.body.post_text,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', withAuth, async (req, res) => {
  try {
    const updatePost = await Post.update({
          ...req.body,
          title: req.body.title,
          post_text: req.body.post_text,
      }, 
      {
          where: {
              id: req.params.id
          }
      })
        if (!updatePost) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
          }
          res.json(updatePost);
      } catch(err) {
          res.status(500).json(err);
      };
});



router.delete('/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
    
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
