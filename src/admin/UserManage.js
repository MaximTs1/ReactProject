// import React, { useEffect, useState, useContext } from 'react';
// import { GeneralContext } from '../App';
// import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
// import { Edit, Delete } from '@mui/icons-material';
// import { Link } from 'react-router-dom'; 
// import './UserManage.css'; 

// export default function UserManage() {
//   const [users, setUsers] = useState([]);
//   const { setLoader, user, roleType, snackbar } = useContext(GeneralContext);

//   useEffect(() => {
//     setLoader(true);
//     fetch(`https://api.shipap.co.il/admin/clients?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`,{
//     credentials: 'include',
//   })
//         .then(res => res.json())
//         .then(data => {
//           setUsers(data);
//         })
//         .finally(() => setLoader(false));
//   }, []);

//   const booleanToString = (value) => (value ? 'true' : 'false');

//   return (
//     <div>
//       <h1>User List</h1>
//       <TableContainer component={Paper}>
//         <Table>
//           <TableHead className="table-head">
//             <TableRow className="table-head-row">
//               <TableCell>No.</TableCell>
//               <TableCell>First Name</TableCell>
//               <TableCell>Middle Name</TableCell>
//               <TableCell>Last name</TableCell>
//               <TableCell>Phone</TableCell>
//               <TableCell>Email</TableCell>
//               <TableCell>Business</TableCell>
//               <TableCell>Action</TableCell>
//               {/* Add more table headers for other user information */}
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {users.map((user, index) => (
//               <TableRow key={user.id}>
//                 <TableCell>{index + 1}</TableCell>
//                 <TableCell>{user.firstName}</TableCell>
//                 <TableCell>{user.middleName}</TableCell>
//                 <TableCell>{user.lastName}</TableCell>
//                 <TableCell>{user.phone}</TableCell>
//                 <TableCell>{user.email}</TableCell>
//                 <TableCell>{booleanToString(user.business)}</TableCell>
//                 <TableCell>
//                   <IconButton component={Link} to={`/edit/${user.id}`} aria-label="Edit">
//                     <Edit />
//                   </IconButton>
//                   <IconButton component={Link} to={`/delete/${user.id}`} aria-label="Delete">
//                     <Delete />
//                   </IconButton>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </div>
//   );
// }







import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { GeneralContext } from '../App';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import { Link } from 'react-router-dom'; 
import './UserManage.css'; 



export default function UserManage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const { setLoader, user, roleType, snackbar } = useContext(GeneralContext);

  
  useEffect(() => {
    setLoader(true);
    fetch(`https://api.shipap.co.il/admin/clients?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`,{
    credentials: 'include',
  })
        .then(res => res.json())
        .then(data => {
          setUsers(data);
        })
        .finally(() => setLoader(false));
  }, []);

  const booleanToString = (value) => (value ? 'true' : 'false');

  const handleDeleteUser = (id) => {
    if (!window.confirm('Are you sure you want to remove this user?')) {
      return;
    }
    setLoader(true);
    fetch(`https://api.shipap.co.il/admin/clients/${id}?token=9e7d1125-5381-11ee-becb-14dda9d4a5f0`, {
      credentials: 'include',
      method: 'DELETE',
    })
      .then(() => {
        setUsers(users.filter((user) => user.id !== id));
        snackbar(`Account was deleted successfully`);
        window.location.reload();
      })
      .catch(err => console.log(err))
      .finally(() => setLoader(false));
  };

  const navigateToEditCard = (id) => {
    navigate(`/admineditUser`, { state: { accountId: id }});
  };

  return (
    <div>
      <h1>User List</h1>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow className="table-head-row">
              <TableCell>No.</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last name</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Business</TableCell>
              <TableCell>Action</TableCell>
              {/* Add more table headers for other user information */}
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{user.firstName}</TableCell>
                <TableCell>{user.lastName}</TableCell>
                <TableCell>{user.phone}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{booleanToString(user.business)}</TableCell>
                <TableCell>
                <IconButton
              onClick={() => navigateToEditCard(user.id)} // Handle edit button click
              aria-label="Edit"
            >
              <Edit />
            </IconButton>
                  <IconButton onClick={() => handleDeleteUser(user.id)} aria-label="Delete">
                    <Delete />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
