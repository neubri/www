# News API Documentation

## Endpoints :

List of available endpoints:
​
- `GET /test`
- `POST /login`
- `GET /pub/articles`
- `GET /pub/articles/:id`

List of available endpoints (require login):
​
- `POST /add-user` (Admin only)
- `GET /articles`
- `POST /articles`
- `GET /articles/:id`
- `PUT /articles/:id`
- `DELETE /articles/:id`
- `PATCH /articles/:id/img-url`
- `GET /categories`
- `POST /categories`
- `PUT /categories/:id`

&nbsp;

## 1. POST /add-user

Request:

- body:
```json
{
  "email": "char.aznabel@gmail.com",
  "passwrod": "charaznabel",
  "phoneNumber": "09999999999",
  "address": "Texas space colony"
}
```

_Response (201 - Created)_

```json
{
    "role": "Staff",
    "id": 3,
    "email": "char.aznabel@gmail.com",
    "phoneNumber": "09999999999",
    "address": "Texas space colony",
    "updatedAt": "2025-06-14T01:36:32.124Z",
    "createdAt": "2025-06-14T01:36:32.124Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required!"
}
OR
{
  "message": "Invalid email format"
}
OR
{
  "message": "Password is required!"
}
OR
{
  "message": "Email is already exists!"
}
OR
{
  "message": "Password need at least 5 character"
}
```

&nbsp;

## 2. POST /login

Request:

- body:
```json
{
    "email":"hathaway.noa@gmail.com",
    "password":"xi1234567890"
}
```

_Response (200 - OK)_
  ​

```json
{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5ODcwMTMzfQ.cWf79JsGqCsRNl6BXCEXEdpHkLY11HvyM0wvGvl2-nY",
    "user": {
        "id": 1,
        "email": "hathaway.noa@gmail.com",
        "role": "Admin",
        "phoneNumber": "0888888888",
        "address": "earth",
        "createdAt": "2025-06-14T01:08:27.146Z",
        "updatedAt": "2025-06-14T01:08:27.146Z"
    }
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Email is required"
}
OR
{
  "message": "Password is required"
}
```

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid email/password"
}
```

&nbsp;

## 3. GET /articles

Description: Get all current articles (Admin or Staff)

Request:

- headers:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5ODcwMTMzfQ.cWf79JsGqCsRNl6BXCEXEdpHkLY11HvyM0wvGvl2-nY"
}
```

_Response (200 - OK)_
  ​

```json
{
    "page": 1,
    "data": [
        {
            "id": 1,
            "title": "The Evolution of RX-78-2 Gundam",
            "content": "Explore how the original RX-78-2 changed the mecha anime genre and inspired decades of mobile suit designs.",
            "imgUrl": "https://images.unsplash.com/photo-1613417424269-cdecd2b2f1f1?auto=format&fit=crop&w=800&q=80",
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2025-06-14T01:08:27.230Z",
            "updatedAt": "2025-06-14T01:08:27.230Z"
        },
        {
            "id": 3,
            "title": "Top 10 Mobile Suits in Universal Century",
            "content": "Ranking the most powerful and iconic suits from the UC timeline.",
            "imgUrl": "https://images.unsplash.com/photo-1548698168-18a69d6d0f5b?auto=format&fit=crop&w=800&q=80",
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2025-06-14T01:08:27.230Z",
            "updatedAt": "2025-06-14T01:08:27.230Z"
        }
    ],
    "totalData": 29,
    "totalPage": 15,
    "dataPerPage": 2
}
```

&nbsp;

## 4. DELETE /articles/:id

description:
  Admin can delete every articles & Staff only can delete article with his own Id(authorId)

Request:

- headers:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5ODcwMTMzfQ.cWf79JsGqCsRNl6BXCEXEdpHkLY11HvyM0wvGvl2-nY"
}
```

- params:
```json
{
  "id": 31
}
```

_Response (200 - OK)_

```json
{
    "message": "Article with id 31 has been deleted"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Article with id <id> not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

&nbsp;

## 5. GET /articles/:id

Request:

- headers:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5ODcwMTMzfQ.cWf79JsGqCsRNl6BXCEXEdpHkLY11HvyM0wvGvl2-nY"
}
```

- params:
```json
{
  "id": 1
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "title": "The Evolution of RX-78-2 Gundam",
    "content": "Explore how the original RX-78-2 changed the mecha anime genre and inspired decades of mobile suit designs.",
    "imgUrl": "https://images.unsplash.com/photo-1613417424269-cdecd2b2f1f1?auto=format&fit=crop&w=800&q=80",
    "categoryId": 1,
    "authorId": 1,
    "createdAt": "2025-06-14T01:08:27.230Z",
    "updatedAt": "2025-06-14T01:08:27.230Z"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Article with id <id> not found"
}
```

&nbsp;


## 6. POST /articles

Request:

- headers:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5ODcwMTMzfQ.cWf79JsGqCsRNl6BXCEXEdpHkLY11HvyM0wvGvl2-nY"
}
```

- body:
```json
{
  "title": "RX-78-2 Gundam: Simbol Perdamaian Universal Century",
  "content": "RX-78-2 Gundam adalah mobile suit legendaris yang digunakan oleh Amuro Ray dalam konflik One Year War. Dikembangkan oleh Earth Federation, Gundam ini menjadi pionir dalam sejarah perkembangan mobile suit generasi berikutnya. Dilengkapi dengan beam rifle, beam saber, dan shield, RX-78-2 tidak hanya unggul dalam teknologi, tetapi juga menjadi simbol harapan dalam masa perang yang kelam.",
  "imgUrl": "https://static.wikia.nocookie.net/gundam/images/b/b1/RX-78-2_Gundam_Origin.png",
  "categoryId": 1,
  "authorId": 1
}
```

_Response (201 - Created)_

```json
{
    "id": 31,
    "title": "RX-78-2 Gundam: Simbol Perdamaian Universal Century",
    "content": "RX-78-2 Gundam adalah mobile suit legendaris yang digunakan oleh Amuro Ray dalam konflik One Year War. Dikembangkan oleh Earth Federation, Gundam ini menjadi pionir dalam sejarah perkembangan mobile suit generasi berikutnya. Dilengkapi dengan beam rifle, beam saber, dan shield, RX-78-2 tidak hanya unggul dalam teknologi, tetapi juga menjadi simbol harapan dalam masa perang yang kelam.",
    "imgUrl": "https://static.wikia.nocookie.net/gundam/images/b/b1/RX-78-2_Gundam_Origin.png",
    "categoryId": 1,
    "authorId": 1,
    "updatedAt": "2025-06-14T03:31:46.574Z",
    "createdAt": "2025-06-14T03:31:46.574Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Title is required!"
}
OR
{
  "message": "Content is required!"
}
OR
{
  "message": "categoryId is required!"
}
OR
{
  "message": "authorId is required!"
}
```

&nbsp;

## 7. PUT /articles/:id

Request:

- headers:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5ODcwMTMzfQ.cWf79JsGqCsRNl6BXCEXEdpHkLY11HvyM0wvGvl2-nY"
}
```

- params:
```json
{
  "id": 5
}
```
- body:
```json
{
  "title": "RX-78-2 Gundam: Simbol Perdamaian Universal Century Bjir",
  "content": "RX-78-2 Gundam adalah mobile suit legendaris yang digunakan oleh Amuro Ray dalam konflik One Year War. Dikembangkan oleh Earth Federation, Gundam ini menjadi pionir dalam sejarah perkembangan mobile suit generasi berikutnya. Dilengkapi dengan beam rifle, beam saber, dan shield, RX-78-2 tidak hanya unggul dalam teknologi, tetapi juga menjadi simbol harapan dalam masa perang yang kelam.",
  "imgUrl": "https://static.wikia.nocookie.net/gundam/images/b/b1/RX-78-2_Gundam_Origin.png",
  "categoryId": 1
}
```


_Response (200 - OK)_

```json
{
  "message": "Article with id 5 has been updated"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Article with id <id> not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

&nbsp;

## 8. PATCH /articles/:id/img-url

Request:

- headers:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5ODcwMTMzfQ.cWf79JsGqCsRNl6BXCEXEdpHkLY11HvyM0wvGvl2-nY"
}
```

- params:
```json
{
  "id": 6
}
```
- body(form-data):
```makefile
  Key: imageUrl
  Value: (file) hathaway.jpg
```

_Response (200 - OK)_

```json
{
  "message": "ImgUrl for article with id 6 has been updated"
}
```

_Response (404 - Not Found)_

```json
{
  "message": "Article with id <id> not found"
}
```

_Response (403 - Forbidden)_

```json
{
  "message": "You are not authorized"
}
```

&nbsp;

## 9. GET /categories

Description: Get all current categories (Admin or Staff)

Request:

- headers:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5ODcwMTMzfQ.cWf79JsGqCsRNl6BXCEXEdpHkLY11HvyM0wvGvl2-nY"
}
```

_Response (200 - OK)_

```json
[
  {
    "id": 1,
    "name": "Mobile Suits",
    "createdAt": "2025-06-14T01:08:27.223Z",
    "updatedAt": "2025-06-14T01:08:27.223Z"
  },
  ...,
]
```

&nbsp;

## 10. POST /categories

Request:

- headers:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5ODcwMTMzfQ.cWf79JsGqCsRNl6BXCEXEdpHkLY11HvyM0wvGvl2-nY"
}
```

- body:
```json
{
    "name": "Universal Century"
}
```

_Response (201 - Created)_

```json
{
    "id": 8,
    "name": "Universal Century",
    "updatedAt": "2025-06-14T05:10:00.529Z",
    "createdAt": "2025-06-14T05:10:00.529Z"
}
```

_Response (400 - Bad Request)_

```json
{
  "message": "Name is required!"
}
```

&nbsp;

## 11. PUT /categories/:id

Request:

- headers:
```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQ5ODcwMTMzfQ.cWf79JsGqCsRNl6BXCEXEdpHkLY11HvyM0wvGvl2-nY"
}
```

- params:
```json
{
  "id": 8
}
```
- body:
```json
{
  "name": "Cosmic Era"
}
```


_Response (200 - OK)_

```json
{
  "message": "Categories with id 8 has been updated"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Category with id <id> not found"
}
```

&nbsp;

## 12. GET /pub/articles

Description: Get all articles without login

Request:

- ` - `

_Response (200 - OK)_
  ​

```json
{
    "page": 1,
    "data": [
        {
            "id": 1,
            "title": "The Evolution of RX-78-2 Gundam",
            "content": "Explore how the original RX-78-2 changed the mecha anime genre and inspired decades of mobile suit designs.",
            "imgUrl": "https://images.unsplash.com/photo-1613417424269-cdecd2b2f1f1?auto=format&fit=crop&w=800&q=80",
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2025-06-14T01:08:27.230Z",
            "updatedAt": "2025-06-14T01:08:27.230Z"
        },
        {
            "id": 3,
            "title": "Top 10 Mobile Suits in Universal Century",
            "content": "Ranking the most powerful and iconic suits from the UC timeline.",
            "imgUrl": "https://images.unsplash.com/photo-1548698168-18a69d6d0f5b?auto=format&fit=crop&w=800&q=80",
            "categoryId": 1,
            "authorId": 1,
            "createdAt": "2025-06-14T01:08:27.230Z",
            "updatedAt": "2025-06-14T01:08:27.230Z"
        }
    ],
    "totalData": 29,
    "totalPage": 15,
    "dataPerPage": 2
}
```

&nbsp;

## 13. GET /pub/articles/:id

Request:

- ` - `

- params:
```json
{
  "id": 1
}
```

_Response (200 - OK)_

```json
{
    "id": 1,
    "title": "The Evolution of RX-78-2 Gundam",
    "content": "Explore how the original RX-78-2 changed the mecha anime genre and inspired decades of mobile suit designs.",
    "imgUrl": "https://images.unsplash.com/photo-1613417424269-cdecd2b2f1f1?auto=format&fit=crop&w=800&q=80",
    "categoryId": 1,
    "authorId": 1,
    "createdAt": "2025-06-14T01:08:27.230Z",
    "updatedAt": "2025-06-14T01:08:27.230Z"
}
```

_Response (404 - Not Found)_

```json
{
    "message": "Article with id <id> not found"
}
```

&nbsp;

## Global Error

_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
