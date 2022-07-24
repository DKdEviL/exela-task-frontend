import Axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import DataService from '../../services/data.service';


const TableComponent = (props) => {


    const deleteButtonHandler = async (id) => {
        const res = await DataService.deleteBill(id)
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
                                <td>{row.isPaid ? row.invoiceId : 'Due'}</td>
                                <td>
                                    <Link style={{margin: '10px'}} to={`/bill/${row._id}`}>
                                        View
                                    </Link>
                                    <Link style={{margin: '10px'}} to={`/edit/${row._id}`}>
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