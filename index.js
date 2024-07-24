import express from 'express'
const app = express()
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose";
import cors from "cors"
import { getHealth } from "./controllers/Health.js";
import {
    postPlant,
    getPlants,
    getPlantId,
    putPlantId,
    deletePlantId
} from "./controllers/Plant.js";
import { handlePageNotFound } from "./controllers/errors.js";
app.use(cors())
app.use(express.json())

const port = 5000

// const plants = [
//     {
//         "id":1,
//         "name": "Mango",
//         "category": "Fruit",
//         "image": "https://www.garden.eco/wp-content/uploads/2018/07/mango-seedling.jpg",
//         "price": 500,
//         "description": "Transform your garden with the charm of the Japanese Sweet Mango Plant, a Grafted Mango Tree standing elegantly at 2-3 feet. This All-Time Mango Hybrid brings the allure of the Baramasi Mango, infusing your space with the essence of Japanese sweetness."
//     },
//     {
//         "id":2,
//         "name": "Banana",
//         "category": "Fruit",
//         "image": "https://www.garden.eco/wp-content/uploads/2018/07/mango-seedling.jpg",
//         "price": 500,
//         "description": "Transform your garden with the charm of the Japanese Sweet Mango Plant, a Grafted Mango Tree standing elegantly at 2-3 feet. This All-Time Mango Hybrid brings the allure of the Baramasi Mango, infusing your space with the essence of Japanese sweetness."
//     },
//     {
//         "id":3,
//         "name": "Rose",
//         "category": "Flower",
//         "image": "https://www.garden.eco/wp-content/uploads/2018/07/mango-seedling.jpg",
//         "price": 500,
//         "description": "Transform your garden with the charm of the Japanese Sweet Mango Plant, a Grafted Mango Tree standing elegantly at 2-3 feet. This All-Time Mango Hybrid brings the allure of the Baramasi Mango, infusing your space with the essence of Japanese sweetness."
//     }
// ]

const dbConnection = async () =>{
    const conn = await mongoose.connect(process.env.MONGO_URL)
  
    if(conn){
      console.log(`MongoDB connected...😉🤞 `)
    }
    else{
      console.log(`MongoDB not connected 😟☹️`)
    }
  }
  dbConnection();


app.get("/Health", getHealth)
app.post("/plant", postPlant)
app.get("/plants", getPlants)
app.get("/plant/:id", getPlantId)
app.put("/plant/:id", putPlantId )
app.delete("/plant/:id", deletePlantId)

app.use("*", handlePageNotFound)

const PORT = process.env.PORT|| 5000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
