exports.up = function(knex) {
    return knex.schema
        .createTable("jokes",tb1 => {
            tb1.increments("joke_id")
            tb1.text("joke").notNullable()
            tb1.text("punchline").notNullable()
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists("jokes")
}