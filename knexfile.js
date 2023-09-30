module.exports = {

    development: {
        client: 'sqlite3',
        useNullAsDefault: true,
        conection: {
            filename: './data/jokes.db3'
        },
        migrations: {
            directory: "./data/migrations"
        },
        seeds: {
            directory: "./data/seeds"
        }
    },

    testing: {
        client: 'sqlite3',
        useNullAsDefault: true,
        conection: {
            filename: './data/test.db3'
        },
        migrations: {
            directory: "./data/migrations"
        },
        seeds: {
            directory: "./data/seeds"
        }
    }
}