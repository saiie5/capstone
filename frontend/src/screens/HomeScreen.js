
import React,{useState , useEffect} from 'react'
import axios from "axios"
import RoomCard from '../components/RoomCard'
import Loader from '../components/Loader'
import Error from '../components/Error'
import { DatePicker, Space } from "antd";
import moment from 'moment'
import "antd/dist/antd.css";

const { RangePicker } = DatePicker;

function HomeScreen() {
 const [rooms , setRooms] = useState([])
 const [loading , setLoading] = useState(false)
 const [error , setError] = useState(false)
 const [fromDate , setFromDate]= useState()
 const [toDate , setToDate] = useState()
 const [duplicateRooms , setDuplicateRooms] = useState([])
 const [searchKey , setSearchKey] = useState('')
 const [type , setType] = useState('all')


function filterByDate(dates) {
  setFromDate(moment(dates[0]).format("DD-MM-YYYY"));
  setToDate(moment(dates[1]).format("DD-MM-YYYY"));

  var temp = [];
  for (var room of duplicateRooms) {
    var availability = false;

    for (var booking of room.currentbookings) {
      if (room.currentbookings.length>0) {
        if (
          !moment(moment(dates[0]).format("DD-MM-YYYY")).isBetween(
            booking.fromDate,
            booking.toDate
          ) &&
          !moment(moment(dates[1]).format("DD-MM-YYYY")).isBetween(
            booking.fromDate,
            booking.toDate
          )
        ) {
          if (
            moment(dates[0]).format("DD-MM-YYYY") !== booking.fromDate &&
            moment(dates[0]).format("DD-MM-YYYY") !== booking.toDate &&
            moment(dates[1]).format("DD-MM-YYYY") !== booking.fromDate &&
            moment(dates[1]).format("DD-MM-YYYY") !== booking.toDate
          ) {
            availability = true;
          }
        }
      }
    }
    if (availability || room.currentbookings.length == 0) {
      temp.push(room);
    }
    setRooms(temp);
  }
}

 useEffect(async()=>{
     try {
         setLoading(true)
         const roomData = (await axios.get('/api/rooms/getallrooms')).data
         setRooms(roomData)
         setDuplicateRooms(roomData)
         setLoading(false)

     } catch (error) {
         setError(true)
         console.log(error)
         setError(false)
     }
 },[])

    const filterBySearch =()=>{
      const filteredRooms = duplicateRooms.filter(room=>room.name.toLowerCase().includes(searchKey.toLowerCase()))
      
      setRooms(filteredRooms)
    }

    const filterByType =(e)=>{
       setType(e);
      if(e!=='all'){
         const roomType = duplicateRooms.filter(
           (room) => room.type.toLowerCase() == e.toLowerCase()
         );
        
         setRooms(roomType);
      }
      else{
        setRooms(duplicateRooms)
      }
      
    }


    return (
      <>
        <div className="container">
          <div className="row mt-5 bs">
            <div className="col-md-3">
              <RangePicker format="DD-MM-YYYY" onChange={filterByDate} />
            </div>

            <div className="col-md-6">
              <input
                type="text"
                placeholder="Search location"
                className="form-control "
                value={searchKey}
                onChange={(e)=> {setSearchKey(e.target.value)}}
                onKeyUp={filterBySearch}
              />
            </div>

            <div className="col-md-2">
              <select className='form-control'value={type} onChange={(e)=>{filterByType(e.target.value)}}>
                <option value="all">All</option>
                <option value="car">Car</option>
                <option value="bike">bike</option>
              </select>
            </div>
          </div>

          <div className="row justify-content-center mt-5">
            {loading ? (
              <h1>
                <Loader />
              </h1>
            ) :(
              rooms.map((room) => {
                return (
                  <div className="col-md-9 mt-2">
                    <RoomCard room={room} fromDate={fromDate} toDate={toDate} />
                  </div>
                );
              })
            )}
          </div>
        </div>
      </>
    );
}

export default HomeScreen
