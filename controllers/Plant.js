

    //          const plants = [
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

const postPlant = async (req, res)=>{
        const{
            name,
            category,
            image,
            price,
            description
        } = req.body       
            
    
            const newPlant = new Plant({
                    name:name,
                    category: category,
                    image: image,
                    price: price,
                    description: description
            })

            const savedPlant = await newPlant.save();

            res.json({
                success:true,
                data:savedPlant,
                message: "New plant added successfully"
            })   
}

const getPlants = async (req, res)=>{
    
    // for(let i=0; i<9999999; i++){}
    const allPlants = await Plant.find().sort({updatedAt : -1})
    res.json({
        success:true,
        data:allPlants,
        message: "All plants fetched successfully"
    })
}

const getPlantId = async (req ,res)=>{
    const{id}=req.params
  
    //  const plant = plants.find((plant)=>plant.id == id)
    const plant = await Plant.findById(id) 
    
    res.json({
        success:plant ? true : false,
        data:id,
        message:plant ? "plant fetched successfully" : "plant not found"
    })
}

const putPlantId = async (req, res)=>{  
    const{       
        name,
        category,
        image,
        price,
        description
    } = req.body

    const{ id } = req.params

    await Plant.updateOne({_id : id},{
        $set:{
            name:name,
            category:category,
            image:image,
            price:price,
            description:description
        }
    })

    const updatedPlant = await Plant.findById(id)

    res.json({
        success:true,
        data:updatedPlant,
        message:"plant updated successfully"
    })
  }

const deletePlantId = async (req, res)=>{
    const{id}=req.params

     await Plant.deleteOne({
        _id:id
     })

        res.json({
             success:true,
             message:"plant deleted successfully",
             data:null
         })
}


export {
    postPlant,
    getPlants,
    getPlantId,
    putPlantId,
    deletePlantId
}