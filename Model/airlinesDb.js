

const {knex} = require("./connection")



const getAllAirlines = async ()=> {
    const result = await knex("airlines").select()
    return result
}


module.exports = {
    getAllAirlines
}