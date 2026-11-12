const express=require("express")
const m=require("mongoose")
m.connect("mongodb://localhost:27017/cseb_batter")
.then(()=>{
    console.log("mongodb is conected")
})
.catch((err)=>{
    console.log(`error is ${err}`)
})
const productSchema=m.Schema({
    name:"String",
    price:"Number",
    modelYear:"Number"
})
const product=m.model("products",productSchema)
const app=express()
app.use(express.json())

app.post("/create_product",async(req,res)=>{
    const p=await product.insertOne(req.body)
    await res.send(p)
})

app.post("/create_products",async(req,res)=>{
    const p=await product.insertMany(req.body)
    await res.send(p)
})

app.get("/products",async(req,res)=>{
    const p=await  product.find()
     await res.send(p)
})

app.get("/producto",async(req,res)=>{
    const p=await product.find(req.body)
    await res.send(p)
})

const port=6789
app.listen(port,()=>{
    console.log(`server is running at http://localhost:${port}`)
})