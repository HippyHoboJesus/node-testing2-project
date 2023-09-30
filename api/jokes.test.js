const request = require("supertest")
const db = require('../data/dbConfig')
const server = require('../server')
const Joke = require('./jokesModel')

const joke1 = {joke:"what is a pirates favorite letter", punchline:"RRR"}
const joke2 = {joke:"what is a pirates favorite letter", punchline:"sea"}

beforeAll(async () => {
    await db.migrate.rollback()
    await db.migrate.latest()
})

beforeEach(async () => {
    await db("jokes").truncate()
})

afterAll(async () => {
    await db.destroy()
})

it("correct env",() => {
    expect(process.env.DB_ENV).toBe("testing")
})

describe("Jokes model functions",() => {
    describe("create joke",() => {
        it("adds joke to the db", async () => {
            let jokes
            await Joke.createJoke(joke1)
            jokes = await db("jokes")
            expect(jokes).toHaveLength(1)

            await Joke.createJoke(joke2)
            jokes = await db("jokes")
            expect(jokes).toHaveLength(2)
        })
        it("inserted joke and punchline", async () => {
            const joke = await Joke.createJoke(joke1)
            expect(joke).toMatchObject({joke_id:1, ...joke})
        })
    })
    describe("deletes joke", () => {
        it("removes joke from db", async () => {
            const [joke_id] = await db("jokes").insert(joke1)
            let joke = await db("jokes").where({joke_id}).first()
            expect(joke).toBeTruthy()
            await request(server).delete("/jokes/"+ joke_id)
            joke = await db("jokes").where({joke_id}).first()
            expect(joke).toBeFalsy()
        })
        it("responds with the deleted joke", async () => {
            await db("jokes").insert(joke1)
            let joke = await request(server).delete("/joke/1")
            expect(joke.body).toMatchObject(joke1)
        })
    })
})