import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";

import { Tabs } from "antd";


const { TabPane } = Tabs;
// const user = JSON.parse(localStorage.getItem("currentUser"));

const UserProfile = () => {
const user = JSON.parse(localStorage.getItem("currentUser"));
  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);
  return (
    <div className="m-3">
      <Tabs defaultActiveKey="1">
        <TabPane tab="My Profile" key="1">
          <div className="row justify-content-center">
            <div className="col-md-6 ">
              <div className="bs">
                <h1>Profile</h1>

                <br />

                <h1>Name : {user.name}</h1>
                <h1>Email : {user.email}</h1>
                <h1>Admin : {user.isAdmin ? "Yes" : "No"}</h1>
                
              </div>
            </div>
          </div>
        </TabPane>
        <TabPane tab="My Bookings" key="2">
          <Booking />
        </TabPane>
      </Tabs>
    </div>
  );
};

export function Booking() {
const user = JSON.parse(localStorage.getItem("currentUser"));

const [bookings  , setBookings]= useState([])
const [loading, setLoading] = useState(false);
const [error, setError] = useState(false);

  useEffect(async () => {
    try {
        setLoading(true)
      const bookedRooms = (
        await axios.post("/api/bookings/getbookingsbyuserid", {
          userid: user.id,
        })
      ).data
      setBookings(bookedRooms);

      setLoading(false);
     
      
    } catch (error) {
        setLoading(false)
        setError(true)
      console.log(error);

    }
  }, []);

  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-6 ">
          {loading && <Loader />}
          {bookings.map((booking) => {
            return (
              <div className="bs">
                <h1>{booking.room}</h1>
                <p>
                  <b>Booking ID :</b> {booking._id}
                </p>
                <p>
                  <b>From Date :</b> {booking.fromDate}
                </p>
                <p>
                  <b>To Date:</b> {booking.toDate}
                </p>
                <p>
                  <b>Status :</b>
                  {booking.status == "booked" ? " Confirmed " : " Cancelled "}
                </p>

                <div>
                  <button className='btn btn-danger'>
                        Cancel Booking
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
