const { Article } = require('../models')
const cloudinary = require('cloudinary').v2
const { Op } = require('sequelize')


module.exports = class NewsController {
  static async createArticle(req, res, next) {
    try {
      const userId = req.user.id
      const { title, content, imgUrl, categoryId } = req.body


    const article = await Article.create({
      title,
      content,
      imgUrl,
      categoryId,
      authorId: userId, // ini penting!
    });

      res.status(201).json(article)
    } catch (err) {
       next(err)
    }
  }

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
    } catch (err) {
      next(err)
    }
  }

  static async getArticleById(req, res, next) {
    try {
      const articleId = +req.params.id

      const article = await Article.findByPk(articleId)

      if(!article){
        throw ({ name: `NotFound`, message: `Article with id ${articleId} not found` })
      }

      res.json(article)
    } catch (err) {
      next(err)
    }
  }

  static async updateArticleById(req, res, next){
    try {
      const articleId = +req.params.id

      const article = await Article.findByPk(articleId)

      if(!article){
        throw ({ name: `NotFound`, message: `Article with id ${articleId} not found`})
      }

      //article kecil karena merubah data yang di select sebelum nya
      await article.update(req.body)

      res.json({ message: `Article with id ${articleId} has been updated`})
    } catch (err) {
      // console.log(error);
      next(err)
    }
  }

  static async deleteArticleById(req, res, next){
    try {
      const articleId = +req.params.id

      const article = await Article.findByPk(articleId)

      if(!article){
        throw ({ name: `NotFound`, message: `Article with id ${articleId} not found` })
      }

      await article.destroy()

      res.json({ message: `Article with id ${articleId} has been deleted`})
    } catch (err) {
      next(err)
    }
  }

  static async updateArticleImageUrlById(req, res, next){
    try {
      const articleId = +req.params.id

      const article = await Article.findByPk(articleId)

      if(!article){
        throw ({ name: `NotFound`, message: `Article with id ${articleId} not found`})
      }

      if(!req.file) {
        throw { name: "BadRequest", message: "Image URL file is required"}
      }


      const uploadPromise = new Promise((resolve) => {
        cloudinary.uploader.upload_stream((error, uploadResult) => {
        //uploadResult adalah informasi dari claudinary ketika upload berhasil anjaay

        //resolve buat nandain prosesnya kalo udh beres
        return resolve(uploadResult);

        //.end untuk ngasih data / file yang mau diupload
        }).end(req.file.buffer);
      })

      const result = await uploadPromise

      // console.log(result, "<<< ");

      //update article image url nya ke db
      await article.update({ imgUrl: result.secure_url })

      res.json({ message: `ImgUrl for article with id ${articleId} has been updated`})

    } catch (err) {
      // console.log(error);
      next(err)
    }
  }
}
