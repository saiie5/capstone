import React from 'react'
import  { Link } from 'react-router-dom'

function Landingscreen() {
    return (
        <div id="landing" className="col-md-12">
            <h2 style={{fontSize:'100px'}}>EasyParking</h2>
            <h1 >The road to success is dotted with many tempting parking spaces...</h1>
            <Link to="home">
            <button className="btn btn-primary mt-4">Get Started</button></Link>
        </div>
    )
}

export default Landingscreen
