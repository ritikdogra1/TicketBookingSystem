import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from './Navbar';


function Tickets() {
  const [ticket, setTickets] = useState([]);
  const [editTicketId, setEditTicketId] = useState(null);
  const [editForm, setEditForm] = useState({
    //id:"",
    name:"",
    count:0,
    image: null,
  });
  const [addForm, setAddForm] = useState({
    //id:"",
    name:"",
    count:0,
    image: null,
  });

  useEffect(() => {
    getAllTickets();
  }, []);

  const getAllTickets = async () => {
    try {
      const response = await axios.get("https://localhost:7014/Ticket/GetAll");
      setTickets(response.data);
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  const deleteTicket = async (ticketId) => {
    try {
      await axios.delete(`https://localhost:7014/Ticket/${ticketId}`);
      setTickets((prevTickets) => prevTickets.filter((ticket) => ticket.id !== ticketId));
    } catch (error) {
      console.error("Error deleting Tickets:", error);
    }
  };

  const handleEdit = (ticket) => {
    setEditTicketId(ticket.id);
    setEditForm(ticket);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditForm({ ...editForm, [name]: value });
  };
  const imagestyleshow = {
    width: "90%",
    height: "80px",
    objectFit: "cover",
    borderRadius: "10px",
  };
  const handleImageChange = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setEditForm({ ...editForm, image: reader.result });
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  };

  const handleEditSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(`https://localhost:7014/Ticket/TicketEditPost`, editForm);
      setTickets((prevTickets) =>
      prevTickets.map((ticket) => (ticket.id === editTicketId ? editForm : ticket))
      );
      setEditTicketId(null);
      setEditForm({
        name:"",
        count:0,
        image: null,
      });
    } catch (error) {
      console.error("Error updating tickets:", error);
    }
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    
    // Perform your validation checks here
    if (addForm.name === '' || !/^\d+$/.test(addForm.count) || !addForm.image) {
      // Handle validation errors, show messages to the user, etc.
      return;
    }
  
    try {
      await axios.post("https://localhost:7014/Ticket/TicketPost", addForm);
      getAllTickets();
      setAddForm({
        name: "",
        count: 0,
        image: null,
      });
    } catch (error) {
      console.error("Error adding tickets:", error);
    }
  };
  

  const handleAddInputChange = (event) => {
    const { name, value } = event.target;
    setAddForm({ ...addForm, [name]: value });
  };
  //FileReader to read the binary data of an image and convert it into a Base64-encoded//
  // string to embed it in a Data URL for displaying images in your web page.//
  const handleAddImageChange = (event) => {
    const imageFile = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setAddForm({ ...addForm, image: reader.result });
    };

    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
  };
  return (
    <div>
      <Navbar/>
      <h2 className="text-center my-4">
        <i className="fas fa-ticket" /> Add Tickets
      </h2>
      <div className="card mb-4" style={{ width: "50%", marginLeft: "27%" }}>
        <div className="card-header bg-warning">Add Tickets</div>
        <div className="card-body bg-info ">
          <form onSubmit={handleAddSubmit}>
            <div className="form-group">
              <label>Name</label>
              <input
              type="text"
               name="name"
               value={addForm.name}
               onChange={handleAddInputChange}
               className={`form-control ${addForm.name === '' ? 'is-invalid' : ''}`}
               required
                />
              <div className="invalid-feedback">Name is required</div>
            </div>
            <div className="form-group">
              <label>Count</label>
              <input
                  type="text"
                  name="count"
                  value={addForm.count}
                onChange={handleAddInputChange}
                className={`form-control ${!/^\d+$/.test(addForm.count) ? 'is-invalid' : ''}`}
                 pattern="^\d+$"
                 required
                  />
                <div className="invalid-feedback">Count must be a valid number</div>
            </div>
            <div className="form-group">
              <label>Image</label>
              <input
              type="file"
                name="image"
              onChange={handleAddImageChange}
               className={`form-control-file ${!addForm.image ? 'is-invalid' : ''}`}
              required
                />
                  <div className="invalid-feedback">An image is required</div>
            </div>
            {addForm.image &&(
              <img
                src={addForm.image}
                alt={`Cover of ${addForm.title}`}
                className="img-thumbnail mb-2"
                style={{ maxWidth: "200px" }}
              />
            )}
            <button type="submit" className="btn btn-warning mr-2">
              Add Tickets
            </button>
          </form>
        </div>
      </div>
{/* //Edit// */}
      <div className="row">
        {ticket.map((ticket) => (
          <div key={ticket.id} className="col-md-4 mb-4">
            <div className="card">
              <img
                className="card-img-top"
                src={ticket.image}
                alt={`Cover of ${ticket.name}`}
                style={imagestyleshow} 
              />
              <div className="card-body">
                <h5 className="card-title">{ticket.name}</h5>
                <p className="card-text">Quantity: {ticket.count}</p>
                {editTicketId === ticket.id ? (
                  <form onSubmit={handleEditSubmit}>
                    <div className="form-group">
                      <label>Name</label>
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Count</label>
                      <input
                        type="text"
                        name="count"
                        value={editForm.count}
                        onChange={handleInputChange}
                        className="form-control"
                      />
                    </div>
                    <div className="form-group">
                      <label>Image</label>
                      <input
                        type="file"
                        name="image"
                        onChange={handleImageChange}
                        className="form-control-file"
                      />
                    </div>
                    {editForm.image && (
                      <img
                        src={editForm.image}
                        alt={`Cover of ${editForm.name}`}
                        className="img-thumbnail mb-2"
                      />
                    )}
                    <button type="submit" className="btn btn-warning mr-2">
                      Save
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setEditTicketId(null)}
                    >
                      Cancel
                    </button>
                  </form>
                ) : (
                  <>
                    <div className="text-center">
                      <button
                        onClick={() => deleteTicket(ticket.id)}
                        className="btn btn-danger mr-2"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => handleEdit(ticket)}
                        className="btn btn-primary"
                      >
                        Edit
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tickets;