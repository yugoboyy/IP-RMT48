const request = require('supertest');
const app = require("../app");
const hashPassword = require('../helpers/bcryptjs');
const { sequelize } = require("../models");
const { signToken } = require('../helpers/jwt');
const { queryInterface } = sequelize

let usersData = require("../db/users.json").map((e) => {
    e.createdAt = e.updatedAt = new Date()
    e.password = hashPassword(e.password)
    return e
})

let myCharactersData = require("../db/myCharacters.json").map((e) => {
    e.createdAt = e.updatedAt = new Date()
    return e
})

let access_token = signToken({ id: 1 });
let access_token_invalid = "dasdas564d65as4d";

beforeAll(async () => {
    await queryInterface.bulkInsert("Users", usersData, {})
    await queryInterface.bulkInsert("MyCharacters", myCharactersData, {})
});

describe("Hello World Test", () => {
    test("Should return an object with status code 200", async () => {
        const { body, status } = await request(app)
            .get("/")
        expect(status).toBe(200);
        expect(body).toHaveProperty("message", "Hello World!")
    })
})

describe("User Test", () => {
    describe("POST /user", () => {
        describe("Success add user", () => {
            test("Should return an object with status code 201", async () => {
                const { body, status } = await request(app)
                    .post("/user")
                    .send({
                        name: "Jojo",
                        email: "jojo@gmail.com",
                        password: "jojo",
                        gender: "Male",
                        uid: 800800800
                    });
                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number))
                expect(body).toHaveProperty("email", expect.any(String))
            })
        })
        describe("Failed add user", () => {
            describe("Not send name", () => {
                test("Should return an object with status code 400", async () => {
                    const { body, status } = await request(app)
                        .post("/user")
                        .send({
                            name: "",
                            email: "jojo1@gmail.com",
                            password: "jojo",
                            gender: "Male",
                            uid: 800800800
                        });
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Name is required")
                })
            })
            describe("Not send email", () => {
                test("Should return an object with status code 400", async () => {
                    const { body, status } = await request(app)
                        .post("/user")
                        .send({
                            name: "Jojo1",
                            email: "",
                            password: "jojo",
                            gender: "Male",
                            uid: 800800800
                        });
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Email is required")
                })
            })
            describe("Send the registered email", () => {
                test("Should return an object with status code 400", async () => {
                    const { body, status } = await request(app)
                        .post("/user")
                        .send({
                            name: "Jojo1",
                            email: "jojo@gmail.com",
                            password: "jojo",
                            gender: "Male",
                            uid: 800800800
                        });
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Email already register")
                })
            })
            describe("Send not in email format", () => {
                test("Should return an object with status code 400", async () => {
                    const { body, status } = await request(app)
                        .post("/user")
                        .send({
                            name: "Jojo1",
                            email: "jojo1gmail.com",
                            password: "jojo",
                            gender: "Male",
                            uid: 800800800
                        });
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Required email format")
                })
            })
            describe("Not send password", () => {
                test("Should return an object with status code 400", async () => {
                    const { body, status } = await request(app)
                        .post("/user")
                        .send({
                            name: "Jojo1",
                            email: "jojo1@gmail.com",
                            password: "   ",
                            gender: "Male",
                            uid: 800800800
                        });
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "Password is required")
                })
            })
        })
    })
    describe("POST /login", () => {
        describe("Success login", () => {
            test("Should return an object with status code 200", async () => {
                const { body, status } = await request(app)
                    .post("/login")
                    .send({
                        email: "saputra@gmail.com",
                        password: "saputra"
                    });
                expect(status).toBe(200);
                expect(body).toHaveProperty("access_token", expect.any(String))
            })
        })
        describe("Failed login", () => {
            describe("Not send email", () => {
                test("Should return an object with status code 400", async () => {
                    const { body, status } = await request(app)
                        .post("/login")
                        .send({
                            email: "",
                            password: "saputra"
                        });
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", expect.any(String))
                })
            })
            describe("Not send password", () => {
                test("Should return an object with status code 400", async () => {
                    const { body, status } = await request(app)
                        .post("/login")
                        .send({
                            email: "saputra@gmail.com",
                            password: ""
                        });
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", expect.any(String))
                })
            })
            describe("Send invalid email", () => {
                test("Should return an object with status code 401", async () => {
                    const { body, status } = await request(app)
                        .post("/login")
                        .send({
                            email: "saputraa@gmail.com",
                            password: "saputra"
                        });
                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Invalid email/password")
                })
            })
            describe("Send invalid password", () => {
                test("Should return an object with status code 401", async () => {
                    const { body, status } = await request(app)
                        .post("/login")
                        .send({
                            email: "saputra@gmail.com",
                            password: "saputraa"
                        });
                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Invalid email/password")
                })
            })
        })
    })
    describe("GET /myCharacters", () => {
        describe("Success get my characters", () => {
            test("Should return an object with status code 200", async () => {
                const { body, status } = await request(app)
                    .get("/myCharacters")
                    .set("authorization", "Bearer " + access_token)
                expect(status).toBe(200);
                expect(body).toHaveProperty("page", expect.any(Number))
                expect(body).toHaveProperty("totalData", expect.any(Number))
                expect(body).toHaveProperty("totalPages", expect.any(Number))
                expect(body).toHaveProperty("dataPerPage", expect.any(Number))
                expect(body).toHaveProperty("data", expect.any(Array))
            })
        })
        describe("Success get my characters with search", () => {
            test("Should return an object with status code 200", async () => {
                const { body, status } = await request(app)
                    .get("/myCharacters?search=a")
                    .set("authorization", "Bearer " + access_token)
                expect(status).toBe(200);
                expect(body).toHaveProperty("page", expect.any(Number))
                expect(body).toHaveProperty("totalData", expect.any(Number))
                expect(body).toHaveProperty("totalPages", expect.any(Number))
                expect(body).toHaveProperty("dataPerPage", expect.any(Number))
                expect(body).toHaveProperty("data", expect.any(Array))
            })
        })
        describe("Success get my characters with filter", () => {
            test("Should return an object with status code 200", async () => {
                const { body, status } = await request(app)
                    .get("/myCharacters?filter=0")
                    .set("authorization", "Bearer " + access_token)
                expect(status).toBe(200);
                expect(body).toHaveProperty("page", expect.any(Number))
                expect(body).toHaveProperty("totalData", expect.any(Number))
                expect(body).toHaveProperty("totalPages", expect.any(Number))
                expect(body).toHaveProperty("dataPerPage", expect.any(Number))
                expect(body).toHaveProperty("data", expect.any(Array))
            })
        })
        describe("Success get my characters with page", () => {
            test("Should return an object with status code 200", async () => {
                const { body, status } = await request(app)
                    .get("/myCharacters?page=1")
                    .set("authorization", "Bearer " + access_token)
                expect(status).toBe(200);
                expect(body).toHaveProperty("page", expect.any(Number))
                expect(body).toHaveProperty("totalData", expect.any(Number))
                expect(body).toHaveProperty("totalPages", expect.any(Number))
                expect(body).toHaveProperty("dataPerPage", expect.any(Number))
                expect(body).toHaveProperty("data", expect.any(Array))
            })
        })
        describe("Failed get my characters", () => {
            test("Should return an object with status code 401", async () => {
                const { body, status } = await request(app)
                    .get("/myCharacters")
                expect(status).toBe(401);
                expect(body).toHaveProperty("message", "Invalid Token")
            })
        })
    })
    describe("POST /myCharacter", () => {
        describe("Success add character", () => {
            test("Should return an object with status code 201", async () => {
                const { body, status } = await request(app)
                    .post("/myCharacter")
                    .set("authorization", "Bearer " + access_token)
                    .send({
                        name: "furina"
                    })
                expect(status).toBe(201);
                expect(body).toHaveProperty("message", expect.any(String))
            })
        })
        describe("Failed add character", () => {
            describe("Add same character", () => {
                test("Should return an object with status code 400", async () => {
                    const { body, status } = await request(app)
                        .post("/myCharacter")
                        .set("authorization", "Bearer " + access_token)
                        .send({
                            name: "furina"
                        })
                    expect(status).toBe(400);
                    expect(body).toHaveProperty("message", "You already have this character")
                })
            })
            describe("Invalid token", () => {
                test("Should return an object with status code 401", async () => {
                    const { body, status } = await request(app)
                        .post("/myCharacter")
                        .set("authorization", "Bearer " + access_token_invalid)
                        .send({
                            name: "furina"
                        })
                    expect(status).toBe(401);
                    expect(body).toHaveProperty("message", "Invalid Token")
                })
            })
        })
    })
    describe("GET /myCharacter/:name", () => {
        describe("Success get my character by name", () => {
            test("Should return an object with status code 200", async () => {
                const { body, status } = await request(app)
                    .get("/myCharacter/furina")
                    .set("authorization", "Bearer " + access_token)
                expect(status).toBe(200);
                expect(body).toHaveProperty("name", expect.any(String))
                expect(body).toHaveProperty("level", expect.any(Number))
                expect(body).toHaveProperty("constalation", expect.any(Number))
                expect(body).toHaveProperty("normalAttack", expect.any(Number))
                expect(body).toHaveProperty("elementalSkill", expect.any(Number))
                expect(body).toHaveProperty("elementalBurst", expect.any(Number))
                expect(body).toHaveProperty("UserId", expect.any(Number))
            })
        })
        describe("Failed get my character by name", () => {
            describe("Character not found", () => {
                test("Should return an object with status code 404", async () => {
                    const { body, status } = await request(app)
                        .get("/myCharacter/nyasar")
                        .set("authorization", "Bearer " + access_token)
                    expect(status).toBe(404);
                    expect(body).toHaveProperty("message", "Character not found")
                })
            })
        })
    })
    describe("PUT /myCharacter/:name", () => {
        describe("Success edit character", () => {
            test("Should return an object with status code 201", async () => {
                const { body, status } = await request(app)
                    .put("/myCharacter/furina")
                    .set("authorization", "Bearer " + access_token)
                    .send({
                        level: 10,
                        constalation: 1,
                        normalAttack: 3,
                        elementalSkill: 3,
                        elementalBurst: 3
                    })
                expect(status).toBe(201);
                expect(body).toHaveProperty("name", expect.any(String))
                expect(body).toHaveProperty("level", expect.any(Number))
                expect(body).toHaveProperty("constalation", expect.any(Number))
                expect(body).toHaveProperty("normalAttack", expect.any(Number))
                expect(body).toHaveProperty("elementalSkill", expect.any(Number))
                expect(body).toHaveProperty("elementalBurst", expect.any(Number))
                expect(body).toHaveProperty("UserId", expect.any(Number))
            })
        })
        describe("Failed edit character", () => {
            test("Should return an object with status code 404", async () => {
                const { body, status } = await request(app)
                    .put("/myCharacter/nyasar")
                    .set("authorization", "Bearer " + access_token)
                    .send({
                        level: 10,
                        constalation: 1,
                        normalAttack: 3,
                        elementalSkill: 3,
                        elementalBurst: 3
                    })
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "Character not found")
            })
        })
    })
    describe("DELETE /myCharacter/:name", () => {
        describe("Success delete my character", () => {
            test("Should return an object with status code 201", async () => {
                const { body, status } = await request(app)
                    .delete("/myCharacter/furina")
                    .set("authorization", "Bearer " + access_token)
                expect(status).toBe(201);
                expect(body).toHaveProperty("message", "Success delete")
            })
        })
        describe("Failed delete my character", () => {
            test("Should return an object with status code 404", async () => {
                const { body, status } = await request(app)
                    .delete("/myCharacter/nyasar")
                    .set("authorization", "Bearer " + access_token)
                expect(status).toBe(404);
                expect(body).toHaveProperty("message", "You character not found")
            })
        })
    })
    describe("GET /userDetail", () => {
        describe("Success get user detail", () => {
            test("Should return an object with status code 200", async () => {
                const { body, status } = await request(app)
                    .get("/userDetail")
                    .set("authorization", "Bearer " + access_token)
                expect(status).toBe(200);
                expect(body).toHaveProperty("id", expect.any(Number))
                expect(body).toHaveProperty("name", expect.any(String))
                expect(body).toHaveProperty("email", expect.any(String))
                expect(body).toHaveProperty("gender", expect.any(String))
                expect(body).toHaveProperty("imgUrl", expect.any(String))
                expect(body).toHaveProperty("uid", expect.any(Number))
                expect(body).toHaveProperty("MyCharacters", expect.any(Array))
            })
        })
    })
    describe("PUT /userDetail", () => {
        describe("Success edit user detail", () => {
            test("Should return an object with status code 201", async () => {
                const { body, status } = await request(app)
                    .put("/userDetail")
                    .set("authorization", "Bearer " + access_token)
                    .send({
                        name: "Dono",
                        gender: "Female",
                        uid: 800800500
                    })
                expect(status).toBe(201);
                expect(body).toHaveProperty("id", expect.any(Number))
                expect(body).toHaveProperty("name", expect.any(String))
                expect(body).toHaveProperty("email", expect.any(String))
                expect(body).toHaveProperty("gender", expect.any(String))
                expect(body).toHaveProperty("imgUrl", expect.any(String))
                expect(body).toHaveProperty("uid", expect.any(Number))
            })
        })
        describe("Failed edit user detail", () => {
            test("Should return an object with status code 201", async () => {
                const { body, status } = await request(app)
                    .put("/userDetail")
                    .set("authorization", "Bearer " + access_token)
                    .send({
                        name: "",
                        gender: "Female",
                        uid: 800800500
                    })
                expect(status).toBe(400);
                expect(body).toHaveProperty("message", expect.any(String))
            })
        })
    })
})

afterAll(async () => {
    await queryInterface.bulkDelete('Users', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });

    await queryInterface.bulkDelete('MyCharacters', null, {
        truncate: true,
        restartIdentity: true,
        cascade: true
    });
});
