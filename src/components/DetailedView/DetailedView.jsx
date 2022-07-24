
import {useEffect, useState} from 'react';
import Axios from 'axios';
import { useLocation } from 'react-router';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import DataService from '../../services/data.service';

const DetailedView = () => {
    const location = useLocation();
    const [billId, setBillId] = useState('');
    const [isDataLoading, setIsDataLoading] = useState(false);
    const [billDetails, setBillDetails] = useState({})

    useEffect(() =>{
        setIsDataLoading(true)
        const locationPathArray = location.pathname.split("/");
        const id = locationPathArray[locationPathArray.length - 1];
        setBillId(id);
    }, [])

    useEffect(() => {
        if(billId){
            const data = fetchBillDetails();
        }
    }, [billId])
    
    const fetchBillDetails = async () => {
        const res = await DataService.getSpecificBillById(billId)
        setIsDataLoading(false);
        setBillDetails(res.data.data)
    }

    return (
        <div>
           {
            isDataLoading && 
            <Loader />
           }
           {
            !isDataLoading && 
            <section style={{minWidth: '500px'}}>
                <h3>Bill details</h3>
                <div className='width100p'>
                    <table className='width100p' style={{border: '10px double black'}}>
                        <tbody>
                            <tr>
                                <td>Bill No.</td>
                                <td>{billDetails.billNo}</td>
                            </tr>
                            <tr>
                                <td>Due Date</td>
                                <td>{billDetails.billDate}</td>
                            </tr>
                            <tr>
                                <td>Total Amount</td>
                                <td>₹ {billDetails.totalAmount}</td>
                            </tr>
                            <tr>
                                <td>Is Bill Paid?</td>
                                <td><div className={billDetails.isPaid ? 'checkMark' : 'crossMark'}></div></td>
                            </tr>
                            {
                                billDetails.isPaid && 
                                <tr>
                                <td>Invoice Id</td>
                                <td>{billDetails.invoiceId}</td>
                            </tr>
                            }
                            <tr>
                                <td>Edit Bill</td>
                                <td>
                                <Link style={{margin: '10px'}} to={`/edit/${billDetails._id}`}>
                                        Edit
                                    </Link>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>
           }
        </div>
    )
}

export default DetailedView;