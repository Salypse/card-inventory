const queryMap = {
    searchName: {type: "where", sql: "name ILIKE ", format: value => `%${value}%`},
    game: {type: "where", sql: "game = "},
    condition: {type: "where", sql: "condition = "},
    foil: {type: "where", sql: "is_foil = ", format: value => value === "on"},

    sort: {type: "order", options: {
        nameAsc: "name Asc",
        nameDesc: "name Desc",
        quantityAsc: "quantity Asc",
        quantityDesc: "quantity Desc"
    } }
}

function createSqlQuery(filter) {  
    let whereConditions = []
    let orderBy = ""
    let values = []

    for (const [key, config] of Object.entries(queryMap)) {
        const value = filter[key]
        
        if (!value) continue

        switch(config.type) {
            case "where":
                values.push(config.format ? config.format(value) : value)
                whereConditions.push(config.sql + `$${values.length}`)
                break
            case "order":
                orderBy = config.options[value]
        }
    }

    let sqlQuery = "SELECT * FROM inventory"

    //Add different condition to sql query
    if (whereConditions.length) {
        sqlQuery += " WHERE " + whereConditions.join(" AND ")
    }

    if (orderBy) {
        sqlQuery += " ORDER BY " + orderBy
    }

    return { sqlQuery, values }
}

module.exports = {createSqlQuery}