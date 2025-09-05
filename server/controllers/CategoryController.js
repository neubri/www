const { Category } = require('../models')

module.exports = class CategoryController {
  static async createCategory(req, res, next) {
    try {
      const category = await Category.create(req.body)

      res.status(201).json(category)
    } catch (err) {
      next(err)
    }
  }


  static async getCategory(req, res, next) {
    try {
      const category = await Category.findAll()

      res.json(category)
    } catch (err) {
      next(err)
    }
  }

  static async updateCategoryById(req, res, next) {
    try {
      const categoryId = +req.params.id

      const category = await Category.findByPk(categoryId)

      if(!category){
        throw ({ name: `NotFound`, message: `Category with id ${categoryId} not found`})
      }

      await category.update(req.body)

      res.json({ message: `Categories with id ${categoryId} has been updated` })
    } catch (err) {
      next(err)
    }
  }

}
