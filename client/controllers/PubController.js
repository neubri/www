const { Article, Category } = require("../models");
const { Op } = require('sequelize')

module.exports = class PubController {

  static async getArticle(req, res, next) {
    try {
      console.log(req.query);
      const { search, filter, sort } = req.query;

      const where = {}; // Inisialisasi object kosong

      // Filtering
      if (filter) {
        where.categoryId = filter;
      }

      // Searching
      if (search) {
        where.title = {
          [Op.iLike]: `%${search}%`
        };
      }

      const paramsQuerySQL = { where };

       

      // Sorting
      if (sort) {
        const ordering = sort[0] === "-" ? "DESC" : "ASC";
        const columnName = ordering === "DESC" ? sort.slice(1) : sort;
        paramsQuerySQL.order = [[columnName, ordering]];
      }

      // Default limit and page number
      let limit = 10; // Default limit
      let pageNumber = 1;

      // Pagination
      if (req.query['page[size]']) {
        limit = +req.query['page[size]'];
      }
      paramsQuerySQL.limit = limit; // Apply the limit to the query

      if (req.query['page[number]']) {
        pageNumber = +req.query['page[number]'];
      }
      paramsQuerySQL.offset = limit * (pageNumber - 1); // Apply the offset to the query

      const { count, rows } = await Article.findAndCountAll(paramsQuerySQL);

      res.json({
        page: pageNumber,
        data: rows,
        totalData: count,
        totalPage: Math.ceil(count / limit),
        dataPerPage: limit
      });

      // console.log(req.query);
      // const { filter, sort, page } = req.query;
      // const paramsQuerySQL = {};

      // //coba filtering
      // if (filter) {
      //   paramsQuerySQL.where = {
      //     categoryId: filter,
      //   };
      // }

      // //coba sorting
      // if (sort) {
      //   const ordering = sort[0] === "-" ? "DESC" : "ASC";
      //   const columnName = ordering === "DESC" ? sort.slice(1) : sort;
      //   paramsQuerySQL.order = [[columnName, ordering]];
      // }

      // let limit = 10;
      // let pageNumber = 1;

      // //pagination
      // if (page) {
      //   //limit = 10
      //   //page 1 -> 1 - 10 -> offset = 0, limit 10: 10
      //   //page 1 -> 11 - 20 -> offset = 10, limit 10
      //   //page 1 -> 21 - 30 -> offset = 20, limit 10
      //   //offset = limit * (pageNumber - 1)
      //   if (page.size) {
      //     limit = +page.size;
      //     paramsQuerySQL.limit = limit;
      //   }

      //   if (page.number) {
      //     pageNumber = +page.number;
      //     paramsQuerySQL.offset = limit * (pageNumber - 1);
      //   }
      // }

      // //1. saat ini kita ada di page berapa?
      // //2. data nya ada tidak?
      // //3. total datanya ada berapa?
      // //4. total page nya ada berapa?
      // //5. data per page nya berapa?

      // const { count, rows } = await Article.findAndCountAll(paramsQuerySQL);

      // res.json({
      //   page: pageNumber,
      //   data: rows,
      //   totalData: count,
      //   totalPage: Math.ceil(count / limit),
      //   dataPerPage: limit
      // });
    } catch (err) {
      next(err);
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

  static async getArticleById(req, res, next) {
    try {
      const articleId = +req.params.id;

      const article = await Article.findByPk(articleId);

      if (!article) {
        throw {
          name: `NotFound`,
          message: `Article with id ${articleId} not found`,
        };
      }

      res.json(article);
    } catch (err) {
      next(err);
    }
  }
};
