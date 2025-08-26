const app = require("../app");
const request = require("supertest");
const { sequelize, User } = require("../models");
const { queryInterface } = sequelize;

const { signToken } = require("../helpers/jwt");
const { hashPassword } = require("../helpers/bcrypt");

let access_token_valid_admin;
let access_token_valid_staff;
let access_token_invalid = "chainsawchainsawchainsawchainsaw";

beforeAll(async () => {
  //seeding untuk users
  const users = require("../data/users.json").map((el) => {
    el.createdAt = el.updatedAt = new Date();
    el.password = hashPassword(el.password);
    return el;
  });

  //seeding untuk categories
  const categories = require("../data/categories.json").map((el) => {
    el.createdAt = el.updatedAt = new Date();
    return el;
  });

  //seeding untuk articles
  const articles = require("../data/articles.json").map((el) => {
    el.createdAt = el.updatedAt = new Date();
    return el;
  });

  await queryInterface.bulkInsert("Users", users);
  await queryInterface.bulkInsert("Categories", categories);
  await queryInterface.bulkInsert("Articles", articles);

  //skema admin atau staff?
  const admin = await User.findOne({ where: { role: "Admin" } });
  access_token_valid_admin = signToken({ id: admin.id });

  const staff = await User.findOne({ where: { role: "Staff" } });
  access_token_valid_staff = signToken({ id: staff.id });
});

describe("Create", () => {
  describe("Berhasil membuat entitas utama ", () => {
    test("Should return status 201 and of object (id, title, content, imgUrl, cotegoryId, authorId)", async () => {
      let { status, body } = await request(app)
        .post("/articles")
        .send({
          title: "Newtype War",
          content: "Rise of Char and Amuro's ideology conflict.",
          imgUrl:
            "https://www.mahq.net/wp-content/uploads/2022/02/gundammain-1.jpg",
          categoryId: 1,
          authorId: 1,
        })
        .set("Authorization", `Bearer ${access_token_valid_admin}`);
      expect(status).toBe(201);
      expect(body).toHaveProperty("id", expect.any(Number));
      expect(body).toHaveProperty("title", expect.any(String));
      expect(body).toHaveProperty("content", expect.any(String));
      expect(body).toHaveProperty("imgUrl", expect.any(String));
      expect(body).toHaveProperty("categoryId", expect.any(Number));
      expect(body).toHaveProperty("authorId", expect.any(Number));
    });
  });

  describe("Gagal menjalankan fitur karena belum login", () => {
    test("Should return status 401 and Invalid Token", async () => {
      let { status, body } = await request(app).post("/articles").send({
        title: "Newtype War",
        content: "Rise of Char and Amuro's ideology conflict.",
        imgUrl:
          "https://www.mahq.net/wp-content/uploads/2022/02/gundammain-1.jpg",
        categoryId: 1,
        authorId: 1,
      });
      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid Token");
    });
  });

  describe("Gagal menjalankan fitur karena token yang diberikan tidak valid", () => {
    test("Should return status 401 and Invalid Toke", async () => {
      let { status, body } = await request(app)
        .post("/articles")
        .send({
          title: "Newtype War",
          content: "Rise of Char and Amuro's ideology conflict.",
          imgUrl:
            "https://www.mahq.net/wp-content/uploads/2022/02/gundammain-1.jpg",
          categoryId: 1,
          authorId: 1,
        })
        .set("Authorization", `Bearer ${access_token_invalid}`);
      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid Token");
    });
  });

  describe("Gagal ketika request body tidak sesuai (validation required)", () => {
    test("Should return status 400 and Title is required!", async () => {
      let { status, body } = await request(app)
        .post("/articles")
        .send({
          content: "Rise of Char and 's ideology conflict.",
          imgUrl:
            "https://www.mahq.net/wp-content/uploads/2022/02/gundammain-1.jpg",
          categoryId: 1,
          authorId: 1,
        })
        .set("Authorization", `Bearer ${access_token_valid_admin}`);
      expect(status).toBe(400);
      expect(body).not.toHaveProperty("title");
      expect(body).toHaveProperty("message", "Title is required!");
    });
  });
});

describe("Update PUT", () => {
  describe("Berhasil mengupdate data Entitas Utama berdasarkan params id yang diberikan", () => {
    test("Should return status 200 and object  (id, title, content, imgUrl, cotegoryId, authorId)", async () => {
      let { status, body } = await request(app)
        .put("/articles/2")
        .send({
          title: "Char's Counter Attack",
          content:
            "Thirteen years after the war, the Neo Zeon army threaten the peace. Armed with the Nu Gundam, Amuro Ray and Federation forces enter battle once more",
        })
        .set("Authorization", `Bearer ${access_token_valid_admin}`);
      expect(status).toBe(200);
      expect(body).toHaveProperty("message", "Article with id 2 has been updated");
    });
  });

  describe("Gagal menjalankan fitur karena belum login", () => {
    test("Should return status 401 and Invalid Token", async () => {
      let { status, body } = await request(app).put("/articles/1").send({
        title: "Char's Counter Attack",
        content:
          "Thirteen years after the war, the Neo Zeon army threaten the peace. Armed with the Nu Gundam, Amuro Ray and Federation forces enter battle once more",
      });
      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid Token");
    });
  });

  describe("Gagal menjalankan fitur karena token yang diberikan tidak valid", () => {
    test("Should return status 401 and Invalid Token", async () => {
      let { status, body } = await request(app)
        .put("/articles/1")
        .send({
          title: "Char's Counter Attack",
          content:
            "Thirteen years after the war, the Neo Zeon army threaten the peace. Armed with the Nu Gundam, Amuro Ray and Federation forces enter battle once more",
        })
        .set("Authorization", `Bearer ${access_token_invalid}`);
      expect(status).toBe(401);
      expect(body).toHaveProperty("message", "Invalid Token");
    });
  });

  describe("Gagal karena id entity yang dikirim tidak terdapat di database", () => {
    test("Should return status 404 and Data not found", async () => {
      let { status, body } = await request(app)
        .put("/articles/100")
        .send({
          title: "Char's Counter Attack",
          content:
            "Thirteen years after the war, the Neo Zeon army threaten the peace. Armed with the Nu Gundam, Amuro Ray and Federation forces enter battle once more",
        })
        .set("Authorization", `Bearer ${access_token_valid_admin}`);
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "Article with id 100 not found");
    });
  });

  describe("Gagal menjalankan fitur ketika Staff mengolah data entity yang bukan miliknya", () => {
    test("Should return status 403 and Forbidden access", async () => {
      let { status, body } = await request(app)
        .put("/articles/1")
        .send({
          title: "Char's Counter Attack",
          content:
            "Thirteen years after the war, the Neo Zeon army threaten the peace. Armed with the Nu Gundam, Amuro Ray and Federation forces enter battle once more",
        })
        .set("Authorization", `Bearer ${access_token_valid_staff}`);
      expect(status).toBe(403);
      expect(body).toHaveProperty("message", "You are not authorized");
    });
  });

  describe("Gagal ketika request body yang diberikan tidak sesuai", () => {
    test("Should return status 400 and Title is required!", async () => {
      let { status, body } = await request(app)
        .put("/articles/2")
        .send({
          title: "",
          content:
            "Thirteen years after the war, the Neo Zeon army threaten the peace. Armed with the Nu Gundam, Amuro Ray and Federation forces enter battle once more",
        })
        .set("Authorization", `Bearer ${access_token_valid_admin}`);
      expect(status).toBe(400);
      expect(body).not.toHaveProperty("title", expect.any(String));
      expect(body).toHaveProperty("message", "Title is required!");
    });
  });
});

describe("Delete", () => {
  describe("Berhasil menghapus data Entitas Utama berdasarkan params id yang diberikan", () => {
    test("Should return status 200 and Article with id 2 has been delete", async () => {
      let { status, body } = await request(app)
        .delete("/articles/9")
        .set("Authorization", `Bearer ${access_token_valid_admin}`);
      expect(status).toBe(200);
      expect(body).not.toHaveProperty("id", expect.any(Number));
      expect(body).not.toHaveProperty("title", expect.any(String));
      expect(body).not.toHaveProperty("content", expect.any(String));
      expect(body).not.toHaveProperty("imgUrl", expect.any(String));
      expect(body).not.toHaveProperty("categoryId", expect.any(Number));
      expect(body).not.toHaveProperty("authorId", expect.any(Number));
      expect(body).toHaveProperty(
        "message",
        `Article with id 9 has been deleted`
      );
    });
  });

  describe("Gagal menjalankan fitur karena belum login", () => {
    test("Should return status 401 and Invalid Token", async () => {
      let { status, body } = await request(app).delete("/articles/2");
      expect(status).toBe(401);
      expect(body).toHaveProperty("message", `Invalid Token`);
    });
  });

  describe("Gagal menjalankan fitur karena token yang diberikan tidak valid", () => {
    test("Should return status 401 and Invalid Token", async () => {
      let { status, body } = await request(app)
        .delete("/articles/2")
        .set("Authorization", `Bearer ${access_token_invalid}`);
      expect(status).toBe(401);
      expect(body).toHaveProperty("message", `Invalid Token`);
    });
  });

  describe("Gagal karena id entity yang dikirim tidak terdapat di database", () => {
    test("Should return status 404 and Data not found", async () => {
      let { status, body } = await request(app)
        .delete("/articles/200")
        .set("Authorization", `Bearer ${access_token_valid_admin}`);
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "Article with id 200 not found");
    });
  });

  describe("Gagal menjalankan fitur ketika Staff menghapus entity yang bukan miliknya", () => {
    test("Should return status 403 and Forbidden access", async () => {
      let { status, body } = await request(app)
        .delete("/articles/1")
        .set("Authorization", `Bearer ${access_token_valid_staff}`);
      expect(status).toBe(403);
      expect(body).toHaveProperty("message", "You are not authorized");
    });
  });
});

describe("Endpoint  List pada public site", () => {
  describe("Berhasil mendapatkan Entitas Utama tanpa menggunakan query filter parameter", () => {
    test("Should return status 200 and array of object", async () => {
      let { status, body } = await request(app)
      .get("/pub/articles");
      expect(status).toBe(200);
      expect(body.data[0]).toHaveProperty("id", expect.any(Number));
      expect(body.data[0]).toHaveProperty("title", expect.any(String));
      expect(body.data[0]).toHaveProperty("content", expect.any(String));
      expect(body.data[0]).toHaveProperty("imgUrl", expect.any(String));
      expect(body.data[0]).toHaveProperty("categoryId", expect.any(Number));
      expect(body.data[0]).toHaveProperty("authorId", expect.any(Number));
    });
  });

  describe("Berhasil mendapatkan Entitas Utama dengan 1 query filter parameter", () => {
    test("Should return status 200 and array of object", async () => {
      let { status, body } = await request(app)
      .get("/pub/articles?filter=3");
      expect(status).toBe(200);
      expect(body.data[0]).toHaveProperty("id", expect.any(Number));
      expect(body.data[0]).toHaveProperty("title", expect.any(String));
      expect(body.data[0]).toHaveProperty("content", expect.any(String));
      expect(body.data[0]).toHaveProperty("imgUrl", expect.any(String));
      expect(body.data[0]).toHaveProperty("categoryId", expect.any(Number));
      expect(body.data[0]).toHaveProperty("authorId", expect.any(Number));
    });
  });

  describe("Berhasil mendapatkan  Entitas Utama serta panjang yang sesuai ketika memberikan page tertentu", () => {
    test("Should return status 200 and array of object", async () => {
      let { status, body } = await request(app)
      .get("/pub/articles?page[size]=3&page[number]=1");
      expect(status).toBe(200);
      expect(body.data[0]).toHaveProperty("id", expect.any(Number));
      expect(body.data[0]).toHaveProperty("title", expect.any(String));
      expect(body.data[0]).toHaveProperty("content", expect.any(String));
      expect(body.data[0]).toHaveProperty("imgUrl", expect.any(String));
      expect(body.data[0]).toHaveProperty("categoryId", expect.any(Number));
      expect(body.data[0]).toHaveProperty("authorId", expect.any(Number));
    });
  });
});

describe("Endpoint Detail pada public site", () => {
  describe("Berhasil mendapatkan 1  Entitas Utama sesuai dengan params id yang diberikan", () => {
    test("Should return status 200 and array of object", async () => {
      let { status, body } = await request(app)
      .get("/pub/articles/8");
      expect(status).toBe(200);
      expect(body).toHaveProperty("id", expect.any(Number));
      expect(body).toHaveProperty("title", expect.any(String));
      expect(body).toHaveProperty("content", expect.any(String));
      expect(body).toHaveProperty("imgUrl", expect.any(String));
      expect(body).toHaveProperty("categoryId", expect.any(Number));
      expect(body).toHaveProperty("authorId", expect.any(Number));
    });
  });

  describe("Gagal mendapatkan Entitas Utama karena params id yang diberikan tidak ada di database / invalid", () => {
    test("Should return status 200 and array of object", async () => {
      let { status, body } = await request(app)
      .get("/pub/articles/111");
      expect(status).toBe(404);
      expect(body).toHaveProperty("message", "Article with id 111 not found");
    });
  });
})


afterAll(async () => {
  await queryInterface.bulkDelete("Categories", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkDelete("Articles", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });

  await queryInterface.bulkDelete("Users", null, {
    truncate: true,
    cascade: true,
    restartIdentity: true,
  });
});
