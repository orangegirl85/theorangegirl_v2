const Category = require('../models').Category;
// const TodoItem = require('../models').TodoItem;

// const fs = require('fs')
// const path = require('path')
// const code = fs.readFileSync(path.join(__dirname, './dist/server.js'), 'utf8')
// const renderer = require('vue-server-renderer').createBundleRenderer(code)
// const index = fs.readFileSync(path.join(__dirname, './dist/index.html'), 'utf8')

module.exports = {
  create(req, res) {
    return Category
      .create({
        parentId: req.body.parentId || null,
        title: req.body.title,
        type: req.body.type,
        specificUrl: req.body.specificUrl || null
      })
      .then((category) => res.status(201).send(category))
      .catch((error) => res.status(400).send(error));
  },

  list(req, res) {
    return Category
      .findAll({
        // include: [{
        //   model: TodoItem,
        //   as: 'todoItems',
        // }],
        order: [
          ['createdAt', 'DESC'],
         // [{ model: TodoItem, as: 'todoItems' }, 'createdAt', 'ASC'],
        ],
      })
      .then((categories) => {
        res.status(200).send(categories)
      })
      .catch((error) => res.status(400).send(error));
  },

  retrieve(req, res) {
    return Category
      .findById(req.params.categoryId, {
        // include: [{
        //   model: TodoItem,
        //   as: 'todoItems',
        // }],
      })
      .then((category) => {
        if (!category) {
          return res.status(404).send({
            message: 'Category Not Found',
          });
        }
        return res.status(200).send(category);
      })
      .catch((error) => res.status(400).send(error));
  },

  update(req, res) {
    return Category
      .findById(req.params.categoryId, {
        // include: [{
        //   model: TodoItem,
        //   as: 'todoItems',
        // }],
      })
      .then(category => {
        if (!category) {
          return res.status(404).send({
            message: 'Category Not Found',
          });
        }
        return category
          .update({
            title: req.body.title || category.title,
              type: req.body.type || category.type,
              parentId: req.body.parentId || category.parentId,
              specificUrl: req.body.specificUrl || category.specificUrl
          })
          .then(() => res.status(200).send(category))
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },

  destroy(req, res) {
    return Category
      .findById(req.params.categoryId)
      .then(category => {
        if (!category) {
          return res.status(400).send({
            message: 'Category Not Found',
          });
        }
        return category
          .destroy()
          .then(() => res.status(204).send())
          .catch((error) => res.status(400).send(error));
      })
      .catch((error) => res.status(400).send(error));
  },
};
