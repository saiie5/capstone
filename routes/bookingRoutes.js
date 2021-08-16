const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const moment = require("moment");
const Room = require("../models/room");
const { v4: uuidv4 } = require("uuid");
const stripe = require("stripe")(
  'sk_test_51JKPQWSJULHQ0FL7LbqLKOaIcjurlUcdP2hJQkXZw3txlhh0hFrEEEOTwdVxf6sWKqLIrerKpV5EfGvmvntYu7Mt00vJq4YQKL'
);




router.post("/bookroom", async (req, res) => {
  const { room, userid, fromDate, toDate, totalDays, totalamount , token } = req.body;

  try {
     const customer = await stripe.customers.create({
       email: token.email,
       source: token.id,
     });

     const payment = await stripe.charges.create(
       {
         amount: totalamount * 100,
         currency: "inr",
         customer: customer.id,
         receipt_email: token.email,
       },
       {
         idempotencyKey: uuidv4(),
       }
     );

     if(payment){
        try {
          const newBooking = new Booking({
            room: room.name,
            roomid: room._id,
            userid,
            fromDate: moment(fromDate).format("DD-MM-YYYY"),
            toDate: moment(toDate).format("DD-MM-YYYY"),
            totalDays,
            totalamount,
            transactionId: "abc",
          });

          const booking = await newBooking.save();

          const currentRoom = await Room.findOne({ _id: room._id });
          currentRoom.currentbookings.push({
            bookingid: booking._id,
            fromDate: moment(fromDate).format("DD-MM-YYYY"),
            toDate: moment(toDate).format("DD-MM-YYYY"),
            userid: userid,
            status: booking.status,
          });

          await currentRoom.save();
          res.send("room Booked successfully");
        } catch (error) {
          return res.status(400).json({ error });
        }

     }

     else{
       res.send("payment Failed")
     }
    
  } catch (error) {
     return res.status(400).json({ message: "Something went wrong" + error });
  }
})


router.post("/getbookingsbyuserid", async (req, res) => {
  const userid = req.body.userid;

  try {
    const bookings = await Booking.find({userid:userid});
    res.send(bookings);
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = router;
