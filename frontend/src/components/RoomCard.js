import React, { useState } from "react";
import { Button, Modal, Carousel } from "react-bootstrap";
import {Link} from "react-router-dom"

function RoomCard({ room , fromDate , toDate}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <div className="row bs">
        <div className="col-md-4">
          <img src={room.imageurls[0]} className="small_img" />
        </div>
        <div className="col-md-7">
          <h1>{room.name}</h1>
          <b>
            <p>
              Phone Number : <i>{room.phonenumber}</i>
            </p>
            <p>
              Maximum Guests : <i>{room.maxcount}</i>
            </p>
            <p>
              Room Type : <i>{room.type}</i>
            </p>
          </b>

          <div style={{ float: "right" }}>
            {fromDate && toDate && (
              <Link to={`/book/${room._id}/${fromDate}/${toDate}`}>
                <button className="btn btn-success m-2">Book Now</button>
              </Link>
            )}

            <button className="btn btn-outline-dark" onClick={handleShow}>
              View Details
            </button>
          </div>
        </div>
        <Modal show={show} onHide={handleClose} size="lg">
          <Modal.Header>
            <Modal.Title>{room.name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Carousel prevLabel="" nextLabel="">
              {room.imageurls.map((url) => {
                return (
                  <Carousel.Item>
                    <img className="d-block w-100 big_img" src={url} />
                  </Carousel.Item>
                );
              })}
            </Carousel>
            <p>
              <b>{room.description}</b>
            </p>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default RoomCard;
