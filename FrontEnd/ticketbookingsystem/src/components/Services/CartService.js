import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CartService = () => {
  const [ticketList, setTicketList] = useState([]);

  useEffect(() => {
    const storedTickets = sessionStorage.getItem('ticketList');
    if (storedTickets) {
      setTicketList(JSON.parse(storedTickets));
    }
  }, []);

  const addToCart = async (ticket) => {
    const updatedTicketList = [...ticketList, ticket];
    sessionStorage.setItem('ticketList', JSON.stringify(updatedTicketList));
    setTicketList(updatedTicketList);
  };

  const continueShopping = (item) => {
    const index = ticketList.findIndex((x) => x.id === item.id);
    if (index !== -1) {
      const updatedTicketList = [...ticketList];
      updatedTicketList[index].count = (updatedTicketList[index].count || 0) + 1;
      sessionStorage.setItem('ticketList', JSON.stringify(updatedTicketList));
      setTicketList(updatedTicketList);
    } else {
      addToCart({ ...item, count: 1 });
    }
  };

  const getTotalQuantity = () => {
    return ticketList.reduce((acc, item) => acc + (item.count || 0), 0);
  };

  const removeItem = (item) => {
    const updatedTicketList = ticketList.filter((x) => x.id !== item.id);
    sessionStorage.setItem('ticketList', JSON.stringify(updatedTicketList));
    setTicketList(updatedTicketList);
  };

  return {
    ticketList,
    addToCart,
    continueShopping,
    getTotalQuantity,
    removeItem,
  };
};

export default CartService;
