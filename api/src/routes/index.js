const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const axios=require("axios") //traemos axios para poderlo utilizar
//const {API_KEY}= process.env
const { Temperament, Dog }=require("../db");

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
// esta funcion llama toda la informacion que requiero de la api externa

    const getApiInfo = async () => {  //funciones controladoras luego se llaman en las rutas
        const apiUrl=  await axios.get("https://api.thedogapi.com/v1/breeds"); //trae la info de la api
        //console.log(apiUrl) 
        const apiInfo = await apiUrl.data.map(p => { 
            const weightMin = parseInt(p.weight.metric.slice(4).trim()); 
            const weightMax = parseInt(p.weight.metric.slice(0, 2).trim());
            const heightMin = parseInt(p.height.metric.slice(4).trim()); 
            const heightMax = parseInt(p.height.metric.slice(0, 2).trim());
            const life_spanMin = parseInt(p.life_span.slice(4).trim());
            const life_spanMax = parseInt(p.life_span.slice(0, 2).trim()); 
    
            return {
                id:p.id,
                name:p.name,
                heightMin:heightMin,
                heightMax:heightMax,
                weightMin:weightMin,
                weightMax:weightMax,
                life_spanMin:life_spanMin,
                life_spanMax:life_spanMax,
                temperament:p.temperament,
                createdInDb: false,
                image:p.image.url,
            }   
        })
        return apiInfo
    }
    //console.log(apiInfo)
    const getDbInfo= async ()=>{ //esta funcion trae la info de bd
          
        const dogs= await Dog.findAll({
            include: Temperament,  
        })
        const info=dogs.map(dog=>{
            let temp=dog.temperaments.map(c=>c.name)
            let aux=temp.join(", ")
           
            return {
                id:dog.id,
                name:dog.name,
                heightMin: parseInt(dog.heightMin),
                heightMax: parseInt(dog.heightMax),
                weightMin: parseInt(dog.weightMin),
                weightMax: parseInt(dog.weightMax),
                life_spanMin: parseInt(dog.life_spanMin),
                life_spanMax: parseInt(dog.life_spanMax),
                temperament:aux,
                createdInDb: true,
                image:dog.image.url,
            }   
        })
             return info   
    }


    const getAllDogs = async () =>{//esta funcion concatena los datos de la api y los de la bd
        const apiInfo = await getApiInfo(); 
        const dbInfo = await getDbInfo() 
        const totalInfo = apiInfo.concat(dbInfo) 
        return totalInfo
    }
    
    // aqui rutas solicitadas
    router.get("/dogs", async (req, res) =>{ 
        const name = req.query.name 
        const dogsTotales = await getAllDogs()//trae todos los perros
        if(name){ //pregunta si hay un name por query
            let dogsName = await dogsTotales.filter(ele => ele.name.toLowerCase().includes(name.toLowerCase()))
            dogsName.length ?//encontraste el nombre?
            res.status(200).send(dogsName):
            res.status(404).send("No esta disponible");
        }else{   
            res.status(200).send(dogsTotales)//si no hay un query envia los perros totales
        }
    })//quiero guardar solo las ocupaciones en la bd y dejarlas listas para cada vez 
    
    router.get("/temperament", async(req,res)=>{
        const tempApi = await axios("https://api.thedogapi.com/v1/breeds?");
        const tempDB = tempApi.data
            .map((t) => t.temperament) //creo muchos arreglos 
            .toString() // las convierto a string
            .split(",") // las separo por comas
            .map((t) => t.trim()) // las quito los espacios
            .filter((t) => t.length > 1) // las quito las palabras que tienen una longitud de 1
        const filtro = tempDB.filter((t) => t); // por cada temperamento lo guardo separado
        let tempFilt = [...new Set(filtro)]; // hago un nuevo array con los temperamentos que tenia guardados y los nuevos, si se repiten se quitan
     
        tempFilt.forEach((t) => {
            // se fija si el temperamento esta, si esta no hace nada, si no lo crea
            Temperament.findOrCreate({
                where: { name: t },
            });
        });
    
        const totalTemp = await Temperament.findAll(); // me trae todos los temperamentos
        res.json(totalTemp);
    })
    
    router.post("/dogs", async(req, res)=>{
        const { name, heightMax, heightMin, weightMax, weightMin, life_spanMax, life_spanMin, image, temperament } = req.body;
        let dogName = await getApiInfo().then((d) => d.find((d) => d.name === name)); // se fija si el nombre esta en la api
            // Creo el Dog
    
            if(!name || !heightMax || !heightMin || !weightMax || !weightMin  || !temperament){
                res.status(400).send("Faltan datos"); 
            }else if (dogName){ 
                res.status(404).send("El nombre del perro ya existe"); 
            } else{
                Dog.create({ 
                    name: name,
                    heightMin: parseInt(heightMin),
                    heightMax: parseInt(heightMax),
                    weightMin: parseInt(weightMin),
                    weightMax: parseInt(weightMax),
                    life_spanMax: parseInt(life_spanMax),
                    life_spanMin: parseInt(life_spanMin),
                    createdInDb: true,
                    image: image || "https://image.freepik.com/vector-gratis/sesion-perro-gracioso-dibujos-animados-aislado-sobre-fondo-blanco_29190-2681.jpg",
                })
                .then(async (dog) => {
                    // Guardo el temperamento
                    const temp = await Temperament.findAll({
                        where: { name: temperament },
                    });
                    // Guardo el Dog en el temperamento
                    await dog.addTemperament(temp);
                    res.json(dog);
                }).catch(err => err)
        
                res.send("Perro creado");
            }
    
        
    })
    
    //ruta id
    router.get("/dogs/:id", async(req, res)=>{
        const id = req.params.id;
        const dogsTotales= await getAllDogs()
        if(id){
            let dogId= await dogsTotales.filter(element=> element.id == id)//filtrar los perros totales por el id solicitado
            dogId.length ?
            res.status(200).json(dogId): 
            res.status(404).send("Raza no encontrada")
        }
    }) 

    
    
    module.exports = router;
    
    