// import * as React from 'react';
// import {useEffect} from 'react'
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import TablePagination from '@mui/material/TablePagination';
// import Title from './Title'
// import axios from "axios";

// export default function Orders(props) {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10);

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   const [rows,setRows]= React.useState([]);
//   const fetchData = () => {
//     //console.log(location);
//     const url= "https://finnhub.io/api/v1/stock/insider-transactions?symbol=".concat(props.symbol,"&token=c94i99aad3if4j50rvn0")
//   axios.get(url).then(res=>{
//     const pData= res.data;
//    // console.log(pData);
//     setRows(pData["data"]);
//   })
// }
// useEffect(() => {
//     fetchData()
// }, [])
//   return (
//     <React.Fragment>
//       <Title>Inside Transaction</Title>
//       <Table size="medium">
//         <TableHead>
//           <TableRow>
//             <TableCell>name</TableCell>
//             <TableCell>share</TableCell>
//             <TableCell>change</TableCell>
//             <TableCell>filingDate</TableCell>
//             <TableCell>transactionDate</TableCell>
            
//             <TableCell>transactionCode</TableCell>
//             <TableCell>transactionPrice</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row,index) => (
//             <TableRow key={index}>
//               <TableCell>{row.name}</TableCell>
//               <TableCell>{row.share}</TableCell>
//               <TableCell>{row.change}</TableCell>
//               <TableCell>{row.filingDate}</TableCell>
//               <TableCell>{row.transactionDate}</TableCell>
              
//               <TableCell>{row.transactionCode}</TableCell>
//               <TableCell>{row.transactionPrice}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//       <TablePagination
//         rowsPerPageOptions={[10, 25, 100]}
//         component="div"
//         count={rows.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
      
//     </React.Fragment>
//   );
// }




// Firebase setup
import * as React from 'react';
import { useEffect, useState } from 'react';
import { db } from '../../firebaseConfig'; // path to config file
import { collection, query, where, getDocs } from 'firebase/firestore';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TablePagination from '@mui/material/TablePagination';
import Title from './Title';

export default function Orders(props) {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetchData = async () => {
    // Query the 'insiderTransactions' collection for documents matching the provided symbol
    const q = query(
      collection(db, 'insiderTransactions'),
      where('symbol', '==', props.symbol)
    );

    const querySnapshot = await getDocs(q);
    const dataArr = [];
    querySnapshot.forEach((doc) => {
      dataArr.push(doc.data());
    });
    setRows(dataArr);
  };

  useEffect(() => {
    fetchData();
  }, [props.symbol]);

  return (
    <React.Fragment>
      <Title>Inside Transaction</Title>
      <Table size="medium">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Share</TableCell>
            <TableCell>Change</TableCell>
            <TableCell>Filing Date</TableCell>
            <TableCell>Transaction Date</TableCell>
            <TableCell>Transaction Code</TableCell>
            <TableCell>Transaction Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.share}</TableCell>
                <TableCell>{row.change}</TableCell>
                <TableCell>{row.filingDate}</TableCell>
                <TableCell>{row.transactionDate}</TableCell>
                <TableCell>{row.transactionCode}</TableCell>
                <TableCell>{row.transactionPrice}</TableCell>
              </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </React.Fragment>
  );
}
