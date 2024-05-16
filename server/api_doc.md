# MyGenshin API Documentation

## Deployed server
- url : []()
- registered user :
```js
user1 = { name: 'Ilham Saputra', email : 'saputra@gmail.com', password: 'saputra' }
user2 = { name: 'Ilham Saputri', email : 'saputri@gmail.com', password: 'saputri' }
```

&nbsp;

## Endpoints :

List of available endpoints:

- `POST /user`
- `POST /login`
- `POST /login/google`

Routes below need authentication:

- `GET /myCharacters`
- `POST /myCharacter`
- `GET /myCharacter/:name`
- `PUT /myCharacter/:name`
- `DELETE /myCharacter/:name`
- `GET /userDetail`
- `PUT /userDetail`
- `patch /userDetail`

&nbsp;

## 1. POST /user

Request:

- body:
```json
{
  "name": "string",
  "email": "string",
  "password": "string",
  "gender": "string",
  "imgUrl": "string",
  "uid": "integer"
}
```

_Response (201 - Created)_
```json
{
  "id": "integer",
  "email": "string"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "Name is required"
}
OR
{
  "message": "Email is required"
}
OR
{
  "message": "Email already register"
}
OR
{
  "message": "Required email format"
}
OR
{
  "message": "Password is required"
}
```

&nbsp;

## 2. POST /login

Request:

- body:
```json
{
  "email": "string",
  "password": "string"
}
```

_Response (200 - OK)_
```json
{
  "access_token": "<token>"
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

## 3. POST /login/google

Request:

- body:
```json
{
  "googleToken": "<googleToken>",
}
```

_Response (200 - OK)_
```json
{
  "access_token": "<token>"
}
```

&nbsp;

## 4. GET /myCharacters

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_
```json
[
  {
    "page": "integer",
    "totalData": "integer",
    "totalPages": "integer",
    "dataPerPage": "integer",
    "data": [
        {
            "id": "integer",
            "name": "string",
            "level": "integer",
            "constalation": "integer",
            "normalAttack": "integer",
            "elementalSkill": "integer",
            "elementalBurst": "integer",
            "UserId": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        }
    ]
  },
  ...,
]
```

&nbsp;

## 5. POST /myCharacter

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

- body:
```json
{
  "name": "string"
}
```

_Response (201 - Created)_
```json
{
  "message": "success add <name>"
}
```

_Response (400 - Bad Request)_
```json
{
  "message": "You already have this character"
}
```

&nbsp;

## 6. GET /myCharacter/:name

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

- params:
```json
{
  "name": "string"
}
```

_Response (200 - OK)_
```json
{
    "id": "integer",
    "name": "string",
    "level": "integer",
    "constalation": "integer",
    "normalAttack": "integer",
    "elementalSkill": "integer",
    "elementalBurst": "integer",
    "UserId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
}
```

_Response (404 - Not Found)_
```json
{
    "message": "Character not found"
}
```

&nbsp;

## 7. PUT /myCharacter/:name

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

- params:
```json
{
  "name": "string"
}
```

- body:
```json
{
  "level":"integer", 
  "constalation": "integer", 
  "normalAttack": "integer", 
  "elementalSkill": "integer", 
  "elementalBurst": "integer"
}
```

_Response (200 - OK)_
```json
{
    "id": "integer",
    "name": "string",
    "level": "integer",
    "constalation": "integer",
    "normalAttack": "integer",
    "elementalSkill": "integer",
    "elementalBurst": "integer",
    "UserId": "integer",
    "createdAt": "date",
    "updatedAt": "date"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "Character not found"
}
```

&nbsp;

## 8. DELETE /myCharacter/:name

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

- params:
```json
{
  "name": "string"
}
```

_Response (200 - OK)_
```json
{
  "message": "Success delete"
}
```

_Response (404 - Not Found)_
```json
{
  "message": "You character not found"
}
```

&nbsp;

## 9. GET /userDetail

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

_Response (200 - OK)_
```json
{
    "id": "integer",
    "name": "string",
    "email": "string",
    "gender": "string",
    "imgUrl": "string",
    "uid": "integer",
    "MyCharacters": [
        {
            "id": "integer",
            "name": "string",
            "level": "integer",
            "constalation": "integer",
            "normalAttack": "integer",
            "elementalSkill": "integer",
            "elementalBurst": "integer",
            "UserId": "integer",
            "createdAt": "date",
            "updatedAt": "date"
        },
        ...,
    ]
}
```


&nbsp;

## 10. PUT /userDetail

Request:

- headers:
```json
{
  "authorization": "Bearer <token>"
}
```

- body:
```json
{
  "name": "string",
  "gender": "string",
  "uid": "integer"
}
```

_Response (201 - Created)_
```json
{
    "id": "integer",
    "name": "string",
    "email": "string",
    "gender": "Male",
    "imgUrl": "string",
    "uid": "integer",
    "updatedAt": "date"
}
```


&nbsp;

## Global Errror
_Response (401 - Unauthorized)_

```json
{
  "message": "Invalid Token"
}
```

_Response (500 - Internal Server Error)_

```json
{
  "message": "Internal server error"
}
```
