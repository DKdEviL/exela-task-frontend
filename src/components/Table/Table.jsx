import Axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';


const TableComponent = (props) => {


    const deleteButtonHandler = (id) => {
        Axios.delete(`https://exela-hiring-task-deepak.herokuapp.com/delete/${id}`)
        props.updateTableData();
    }



    return (
        <table>
            <thead>
                <tr>
                    <td>Bill No.</td>
                    <td>Bill Date</td>
                    <td>Total Amount</td>
                    <td>Invoice Id</td>
                    <td>Actions</td>
                </tr>
            </thead>
            <tbody>
                {
                    props.data.length > 0 &&
                    props.data.map(row => {
                        return (
                            <tr key={row._id}>
                                <td>{row.billNo}</td>
                                <td>{row.billDate}</td>
                                <td>{row.totalAmount}</td>
                                <td>{row.invoiceId}</td>
                                <td>
                                    <Link to={`/edit/${row._id}`}>
                                        Edit
                                    </Link>
                                    <button onClick={() => {
                                        deleteButtonHandler(row._id)
                                    }}>Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default TableComponent;