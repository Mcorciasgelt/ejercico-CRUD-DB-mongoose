const mongoose = require("mongoose")
require("dotenv").config()

const dbConnection = async() => {
    try{
        console.log(process.env.MONGO_URL)
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Base de datos conectada con éxito");
    } catch (error) {
        console.log(error)
        throw new Error("Error a la hora de iniciar la base de dato")
    }
    
}

module.exports = { dbConnection, }