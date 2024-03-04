const express = require('express')
const mongoose = require('mongoose')
const cors = require("cors")
const EmployeeModel = require('./models/Employee')

const app = express()
app.use(express.json())
app.use(cors())


mongoose.connect("mongodb+srv://Fittology:Fittology123@fittology.bdgpyqr.mongodb.net/?retryWrites=true&w=majority&appName=Fittology")


app.post("/", (req, res)=>{
    const {email, password} = req.body
    EmployeeModel.findOne({email:email})
    .then(user => {
        if (user){
            if(user.password == password){
                res.json("Success")
            }else{
                res.json("Incorrect Password")
            }
        }else{
            res.json("No record existed")
        }
    })
})

app.post('/signup', async(req, res) =>{
    
    const{email}=req.body


    try {
        const check = await EmployeeModel.findOne({email:email})
        if(check){
            res.json("Exist")
        }else{
            res.json("Not Exist")
            await EmployeeModel.insertMany(req.body)
        }
    } catch (error) {
        res.json("Fail")
    }
    
})

app.listen(3001, () =>{
    console.log("server is running")
})