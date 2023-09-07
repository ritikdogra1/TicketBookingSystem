import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar';

const Home = () => {
  const [ticketList, setTicketList] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    getAllTickets();
  }, []);

  const getAllTickets = () => {
    axios.get('https://localhost:7014/Ticket/GetAll')
      .then(response => {
        setTicketList(response.data); 
      })
      .catch(error => {
        console.log(error);
      });
  };
  const Booking = (data) => {
    const userId = JSON.parse(localStorage.getItem("userId"));
    const updatedTicketList = [...ticketList]; 
    axios
      .post("https://localhost:7014/api/Booking/BookingPost1", { ticketId: data, userId })
      .then((response) => {
        if (response.status === 200) {
          const ticketIndex = updatedTicketList.findIndex(ticket => ticket.id === data);
          if (ticketIndex !== -1) {
            updatedTicketList[ticketIndex].count--; // Decrease the ticket quantity by 1 //
            setTicketList(updatedTicketList);
            alert("Successfully booked the ticket!");
          }
        } else {
          alert("Unable to book the ticket.");
        }
      })
      .catch((error) => {
        alert("An error occurred while booking the ticket.");
      });
  };

  return (
    <div>
      <Navbar/>
      <div className="banner ">
        <div className="container mt-5 mb-5">
          <h1 className="text-center bg-info text-danger">Ticket<span className="highlight">Table</span></h1>
          <div className="row mt-5 border">
            {ticketList.map(ticket => (
              <div className="col-lg-4" key={ticket.id}>
                <div className="col-lg-4 mt-2">
                  <div className="stepBox">
                    <div className="zoom">
                      <img src={ticket.image} style={{ width: '200%', height: '300px' }} alt="Ticket Poster" />
                      <h5>Name: {ticket.name}</h5>
                      <h6>Count: {ticket.count}</h6>
                    </div>
                  </div>
                </div>
                <button className="btn btn-success" onClick={() => Booking(ticket.id)}>
                  Booking <i className="bi bi-arrow-right"></i> <i className="fa fa-shopping-cart"></i>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ); 
};

export default Home;
