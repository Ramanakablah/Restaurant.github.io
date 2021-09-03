const express = require('express')
const app = express();
const mongoose =require('mongoose')
const Port = 8000;
main().catch(err => console.log(err));

const fs= require('fs');
const { stringify } = require('querystring');
const { start } = require('repl');
async function main() {
mongoose.connect('mongodb://localhost:27017/raman',{useNewUrlParser: true, useUnifiedTopology: true});
}
const db=mongoose.connection;
db.on('error', console.error.bind(console,'Connection error'))

db.once('open',function(){
    console.log('Connected....')
});

app.use(express.urlencoded())

app.set('view engine', 'pug') 
app.get('/',(req,res)=>{
    res.status(200).render("../Template/Home.pug")
})
const Home = new mongoose.Schema({
    name:String,
    mobile_no:Number,
    Mail:String,
    Date:Date,
    Time:String,
    Others:String
  });
  const Data = mongoose.model('file', Home);
app.post('/',(req,res)=>{
      const Entry = new Data({name:req.body.Name,mobile_no:req.body.Mob,Mail:req.body.mail,Date:req.body.Date,Time:req.body.time,Others:req.body.Other})  
      Entry.save(function(err,data){
    if (err) return console.error(err);});
    res.status(200).render("../Template/Home.pug")    
});
app.get("/Services",(req,res)=>{
    res.status(200).render("../Template/Services.pug")
})
app.get("/Delivery",(req,res)=>{
    res.status(200).render("../Template/Delivery.pug")
})

const Delivery = new mongoose.Schema({
 Ownername :String,
 Ownermobileno :Number,
 Weight:Number,
 OrderDate :Date,
 Sweet_name :String,
 Order_Address :String
});
const package = mongoose.model("order",Delivery);
app.post("/Delivery",(req,res)=>{
    const Deliver = new package({Ownername:req.body.Name,Ownermobileno:req.body.Mobno,Weight:req.body.weight,OrderDate:req.body.Date,Sweet_name:req.body.Sweet,Order_Address:req.body.Address})
Deliver.save(function(err,data){
    if(err) return console.error(err);
    res.status(200).render("../Template/Delivery.pug")
})
});
app.get("/contact",(req,res)=>{
    res.status(200).render("../Template/contact.pug")
})
 app.listen(Port,()=>{
  console.log(`Localhost is served at port ${Port}`)
 })