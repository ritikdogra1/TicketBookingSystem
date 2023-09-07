import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useLocation, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const  AddCart = () => {

  const [ticketList, setTicketList] = useState([])
  const [newBooking, setNewBooking] = useState({});
  const [totalQuantity, setTotalQuantity] = useState(0);
  const navigate = useNavigate();
  const location=useLocation();
  useEffect(() => {
    const cartItems = JSON.parse(sessionStorage.getItem('cartItems')) || [];
    console.log(location.state)  
    setTicketList(location.state);
    getall();
    //calculateTotalQuantity(cartItems);
  }, [ticketList]);

//   const calculateTotalQuantity = (items) => {
//     const quantity = items.reduce((total, item) => total + item.count, 0);
//     setTotalQuantity(quantity);
//   };
  const getall = () => {
    debugger
     //const cartItems = JSON.parse(localStorage.getItem('updatedCart')) || [];
     //console.log('Retrieved cart items:', cartItems); // Check the data in console
     //setTicketList(cartItems);
     //calculateTotalQuantity(cartItems);
  };
  const bookNow = (ticketID) => {
    const userid = sessionStorage.getItem('userId');
    if (userid) {
      const users = JSON.parse(userid);
      setNewBooking({ ...newBooking, ticketID, userId: users });
      axios.post('https://localhost:7014/Ticket/TicketPost', newBooking)
        .then(() => {
          Swal.fire({
            title: 'Booking Successful',
            text: 'Your booking has been successful',
            icon: 'success',
          }).then(() => {
            navigate('/');
            sessionStorage.removeItem('ticketID');
          });
        })
        .catch(() => {
          Swal.fire({
            title: 'No tickets available',
            icon: 'error',
          });
        });
    }
  };
  const continueShopping = (item) => {
    const updatedCart = ticketList.filter((ticket) => ticket.id !== item.id);
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setTicketList(updatedCart);
    //calculateTotalQuantity(updatedCart);
    navigate('/');
  };
  const removeItem = (item) => {
    const updatedCart = ticketList.filter((ticket) => ticket.id !== item.id);
    sessionStorage.setItem('cartItems', JSON.stringify(updatedCart));
    setTicketList(updatedCart);
    //calculateTotalQuantity(updatedCart);
  };
  return (
    <div>
      <Navbar/>
    <div className="backgroundWhiteBorder">
      <div className="container">
        <div className="card">
          <div className="card-header bg-secondary text-light ml-0 row container">
            <div className="col-6">
              <i className="fa fa-shopping-cart"></i> &nbsp; Shopping Cart
            </div>
          </div>
          <div className="container-fluid mt-5">
          <div className="row text-center">
          {
          Array.isArray(location.state) && location.state.length>0 &&
               ((ticket) => { 
                   return (
                <div key={ticket.id}>
                <div className="col-6 text-right">
                  <button
                    className="btn btn-success"
                    onClick={() => continueShopping(ticket)}
                    class="btn btn-outline-info btn-sm"
                  >
                    Continue Shopping <i className="fa fa-plus"></i>
                  </button>
                </div>
                <div className="row">
                  <div className="d-none d-lg-block col-lg-1 text-center py-2">
                  <img src={ticket.image} key={ticket.id} className="rounded" width="200" height="300" />
                  </div>
                  <div className="col-12 text-sm-center col-lg-6 text-lg-left">
                    <h3>
                      <strong>{ticket.name}</strong>
                    </h3>
                  </div>
                  <div className="col-12 text-sm-center col-lg-5 text-lg-right row">
                    <label htmlFor="txtimg" className="col-sm-4">
                      Count
                    </label>
                    <div className="col-4 text-md-right" style={{ paddingTop: '5px' }}>
                      <input
                        type="number"
                        value={newBooking.count}
                        onChange={(e) => setNewBooking({ ...newBooking, count: e.target.value })}
                        className="text-success"
                      />
                    </div>
                    <div className="col-6 col-sm-4 col-lg-6"></div>
                    <div className="col-2 col-sm-4 col-lg-2 text-right">
                      <button
                        type="button"
                        onClick={() => removeItem(ticket)}
                        className="btn btn-outline-danger"
                      >
                        <i className="fa fa-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
                <hr />
                <div className="row">
                  <div className="col-12 col-md-6 offset-md-6 col-lg-4 offset-lg-8 pr-4">
                    <ul className="list-group">
                      <li className="list-group-item d-flex justify-content-between bg-light">
                        <button
                          className="btn btn-success form-control"
                          onClick={() => bookNow(ticket.id)}
                        >
                          <i className="fa fa-check"></i> Book Now
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              ) 
              }
            )}
          </div>
          <div className="card-footer">
            <div className="card-footer row">
              {/* Render footer content here */}
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    </div>
  );
};

export default AddCart;
