import express from 'express'

const app = express()

app.use(express.json())

const port = 5000

const plants = [
    {
        "id":1,
        "name": "Mango",
        "category": "Fruit",
        "image": "https://www.garden.eco/wp-content/uploads/2018/07/mango-seedling.jpg",
        "price": 500,
        "description": "Transform your garden with the charm of the Japanese Sweet Mango Plant, a Grafted Mango Tree standing elegantly at 2-3 feet. This All-Time Mango Hybrid brings the allure of the Baramasi Mango, infusing your space with the essence of Japanese sweetness."
    },
    {
        "id":2,
        "name": "Banana",
        "category": "Fruit",
        "image": "https://www.garden.eco/wp-content/uploads/2018/07/mango-seedling.jpg",
        "price": 500,
        "description": "Transform your garden with the charm of the Japanese Sweet Mango Plant, a Grafted Mango Tree standing elegantly at 2-3 feet. This All-Time Mango Hybrid brings the allure of the Baramasi Mango, infusing your space with the essence of Japanese sweetness."
    },
    {
        "id":3,
        "name": "Rose",
        "category": "Flower",
        "image": "https://www.garden.eco/wp-content/uploads/2018/07/mango-seedling.jpg",
        "price": 500,
        "description": "Transform your garden with the charm of the Japanese Sweet Mango Plant, a Grafted Mango Tree standing elegantly at 2-3 feet. This All-Time Mango Hybrid brings the allure of the Baramasi Mango, infusing your space with the essence of Japanese sweetness."
    }
]

app.post("/plant", (req, res) => {
    const {
        name,
        category,
        image,
        price,
        description
    } = req.body

    if (!name) {
        return res.json({
            success: false,
            data: null,
            message: "Please provide a name for the plant"
        })

    }
    if (!category) {
        return res.json({
            success: false,
            data: null,
            message: "Please provide a category for the plant"
        })

    }
    if (!image) {
        return res.json({
            success: false,
            data: null,
            message: "Please provide a image for the plant"
        })

    }
    if (!price) {
        return res.json({
            success: false,
            data: null,
            message: "Please provide a price for the plant"
        })

    }
    if (!description) {
        return res.json({
            success: false,
            data: null,
            message: "Please provide a description for the plant"
        })

    }

    const randomId = Math.round(Math.random() * 10000)

    const newPlant = {
        id: randomId,
        name: name,
        category: category,
        image: image,
        price: price,
        description: description
    }

    plants.push(newPlant)

    res.json({
        success: true,
        data: newPlant,
        message: "Plant added successfully"
    })
})

app.get('/plants', (req, res) => {
    res.json({
        success: true,
        data: plants,
        message: "All plants fetched Succesfully"

    })
})
app.get('/plant/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)

    const plant = plants.find((p) => p.id === id)

    if (plant) {
        res.json({
            success: true,
            data: plant,
            message: "Plant fetched successfully"
        })
    } else {
        res.json({
            success: false,
            data: null,
            message: "Plant not found"
        })
    }
})
app.put('/plant/:id',(req,res)=>{
    const {id} = req.params
    const {name,category,image,price,description} = req.body
    let index = -1
    plants.forEach((plant, i)=>{
        if(plant.id === id){
            index = i
            }
    })

    const newObj ={
        id,
        name,
        category,
        image,
        price,
        description
    }
    if(index==-1){
        res.json({
            success: false,
            data: null,
            message: `Plant not found for this ${id} index`
            })
    }
    else
    {
        plants[index] = newObj
        res.json({
            success: true,
            data: newObj,
            message: "Plant updated successfully"
            })
        }


} )
app.delete('/plant/:id',(req,res)=>{
    
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
