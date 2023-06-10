const express=require("express")
const app=express()
const products=require("./products")
const mongoose=require("mongoose")
const cors=require("cors")
const bodyParser=require("body-parser")
const Content=require("./schema")
console.log(Content)
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())
app.use(cors())
mongoose.connect("mongodb+srv://saisreesresta:saisreesresta@cluster0.5ponhqt.mongodb.net/firstdb?retryWrites=true&w=majority")
.then(()=>{
    console.log("Mongodb connected sucessfully")
})
.catch((err)=>{
    console.log(err)
})
app.get("/",(req,res)=>{
    res.send("server started sucessfully")
})
app.post("/add",(req,res)=>{
    console.log("data from front end",req.body)
    const {name,passcode}=req.body
    const newData=new Content({
        name,passcode
    })
    newData.save()
    res.send("added")
})
app.get("/retrieve",(req,res)=>{
    Content.find()
     .then(found=>res.json(found))
})
app.get("/name",(req,res)=>{
    res.send("Rayidi sai sree sresta")
})
app.get("/my-products",(req,res)=>{
    res.json(products)
})
app.listen(4000,()=>console.log("server is started"))