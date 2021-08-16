const express = require('express')


const app = express()

const dbConfig = require("./db");
const roomRoute = require("./routes/roomsRoute");
const usersRoute = require('./routes/usersRoute')
const bookingsRoute = require("./routes/bookingRoutes");
app.use(express.json())

app.use('/api/rooms' , roomRoute)
app.use('/api/users' , usersRoute)
app.use('/api/bookings', bookingsRoute);

const port = process.env.port||5000

app.listen(port , ()=>console.log(`server running on port ${port} with nodemon`))