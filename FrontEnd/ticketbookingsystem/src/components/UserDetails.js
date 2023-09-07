import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import Tickets from './Tickets';

const UserDetails = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await fetch('https://localhost:7014/api/User');
      const data = await response.json();
      setUsers(data);
    }
    fetchUsers();
  }, []);

  return (
    <div>
        <Navbar/>
        <h2 className='text-center bg-info text-danger p-2 m-2 '>UserDetails</h2>
      <div className="m-5">
        <div className="border">
          <table className="table table-striped table-border">
            <thead className='bg-warning'>
              <tr>
                <th>User Name</th>
                <th>User Address</th>
                 <th>User Email</th> 
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.address}</td>
                  <td>{user.email}</td>
                  {/* <td>{book.count}</td> Assuming there's a property named 'count' */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default UserDetails