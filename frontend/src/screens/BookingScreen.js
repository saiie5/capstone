import React , {useState , useEffect} from 'react'
import axios from "axios"
import Loader from '../components/Loader';
import Error from '../components/Error';
import moment from 'moment'
import StripeCheckout from "react-stripe-checkout";
import Swal from "sweetalert2";



function BookingScreen({match}) {
  const user = JSON.parse(localStorage.getItem("currentUser"));

     const [room, setRoom] = useState({});
     const [loading, setLoading] = useState(true);
     const [error, setError] = useState();
     const [totalamount , setTotalamount]= useState()


     const roomid = match.params.roomid
     const fromDate = moment(match.params.fromDate , 'DD-MM-YYYY')
     const toDate = moment(match.params.toDate , 'DD-MM-YYYY')

     const totalDays = moment.duration(toDate.diff(fromDate)).asDays()


     

     useEffect(async () => {
       try {
         setLoading(true);
        const roomData = (await axios.post('/api/rooms/getroombyid' , {roomid: match.params.roomid})).data;
       
         setTotalamount(totalDays * roomData.rentperday);
         setRoom(roomData);
         
        
      
         setLoading(false);
       } catch (err) {
         setError(true);
         console.log(error);
         setError(false);
       }
     }, []);

  

     const onToken = async (token)=>{

      console.log(token)
       

       const bookingDetails = {
         room,
         userid: user.id,
         fromDate,
         toDate,
         totalDays,
         totalamount,
         token
       };

       try {
         setLoading(true)
         const result = await axios.post(
           "/api/bookings/bookroom",
           bookingDetails
         );
         setLoading(false)
         Swal.fire('Congratulations' , 'Room Booked Successfully').then(result=>{
         window.location.href='/bookings'
         })

       } catch (error) {
         setLoading(false)
         Swal.fire('oops' ,'Something went wrong please try again')
       }
     }

    return (
      <>
        {loading ? (
          <h1>
            <Loader />
          </h1>
        ) : room ? (
          <div className="m-5">
            <div className="row justify-content-center mt-5 bs">
              <div className="col-md-6">
                <h1>{room.name}</h1>
                <img src={room.imageurls[0]} className="big_img" />
              </div>

              <div className="col-md-5">
                <h1>Booking Details</h1>
                <hr />
                <div style={{ textAlign: "right" }}>
                  <b>
                    <p>Name :{user.name}</p>
                    <p>From Date:{match.params.fromDate}</p>
                    <p>To Date:{match.params.toDate}</p>
                    <p>Maximum Guests : {room.maxcount}</p>
                  </b>
                </div>

                <div style={{ textAlign: "right" }}>
                  <b>
                    <h1>Amount</h1>
                    <hr />
                    <p>Total Days :{totalDays} </p>
                    <p>Rent Per Day : {room.rentperday}</p>
                    <p>Total Amount : {totalamount}</p>
                  </b>
                </div>

                <div style={{ float: "right" }}>
                  <StripeCheckout
                    amount={totalamount * 100}
                    token={onToken}
                    currency="INR"
                    stripeKey="pk_test_51JKPQWSJULHQ0FL7VOkMrOMFh0AHMoCFit29EgNlVRSvFkDxSoIuY771mqGczvd6bdTHU1EkhJpojOflzoIFGmj300Uj4ALqXa">
                    <button className="btn btn-success">
                      Confirm Booking
                    </button>
                  </StripeCheckout>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Error />
        )}
      </>
    );
}

export default BookingScreen
