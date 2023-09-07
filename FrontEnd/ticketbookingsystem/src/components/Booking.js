import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from './Navbar';

function Booking() {
  const [bookingList, setBookingList] = useState([]);

  useEffect(() => {
    getAllBooking();
  }, []);

  const getAllBooking = () => {
    axios.get('https://localhost:7014/api/Booking/GetAll')
      .then(response => {
        setBookingList(response.data);
        console.log(response)
      })
      .catch(error => {
        console.log(error);
      });
  };
  return (
    <div>
      <Navbar />
      <h2 className='text-center bg-info text-danger p-2 m-2 '>BookingList</h2>
      <div className="m-5">
        <div className="border">
          <table className="table table-striped table-border">
            <thead className='bg-warning'>
              <tr>
                <th>User Name</th>
                <th>Ticket Name</th>
                 <th>Quantity</th> 
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {bookingList.map((book) => (
                <tr key={book.id}>
                  <td>{book.user.name}</td>
                  <td>{book.ticket.name}</td>
                  <td>{book.ticket.count}</td>
                   {/* <td>{book.count}</td> Assuming there's a property named 'count'  */}
                  <td>
                    <img src={book.ticket.image} alt={book.ticket.name}style={{ width: '50%', height: '90px' }} />
                  </td> {/* Assuming there's a property named 'imageUrl' in 'ticket' */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Booking;
