const mongoose = require('mongoose')

const mongoUrl =
  "mongodb+srv://raghu:raghu123@cluster0.zrgrh.mongodb.net/easyparking";

  mongoose.connect(mongoUrl , {useUnifiedTopology:true, useNewUrlParser:true})


  var connection = mongoose.connection

  connection.on('error', ()=>{
      console.log("cannot connect to MongoDB")
  })

  connection.on('connected', ()=>{
      console.log('Connetion to MongoDB successful')
  })

  module.exports=mongoose
  