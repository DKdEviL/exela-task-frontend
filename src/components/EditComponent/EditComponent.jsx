import { useEffect, useState } from 'react';
import Axios from 'axios';
import '../../App.css'
import { useLocation } from 'react-router';


const EditComponent = (props) => {

    const [billNumber, setBillNumber] = useState('');
    const [invoiceId, setInovoiceId] = useState('');
    const [isBillPaid, setIsBillPaid] = useState(false);
    const [totalAmount, setTotalAmount] = useState();
    const [billDate, setBillDate] = useState('')
    const [isSavingData, setIsSavingData] = useState(false);
    const [billId, setBillId] = useState('')

    const location = useLocation();

    useEffect(() => {
        const locationPathArray = location.pathname.split("/");
        const id = locationPathArray[locationPathArray.length - 1];
        if (id && props.scenario === 'edit') {
            setBillId(id);
        fetchSpecificBillData(id)
        }
    }, [location])

    const fetchSpecificBillData = async (id) => {
        const res = await Axios.get(`https://exela-hiring-task-deepak.herokuapp.com/bill/${id}`)
        setBillNumber(res.data.data.billNo.toString());
        setInovoiceId(res.data.data.invoiceId.toString());
        setIsBillPaid(res.data.data.isPaid);
        setTotalAmount(res.data.data.totalAmount)
    }

    const saveBillHandler = async (event) => {
        event.stopPropagation();
        setIsSavingData(true)
        if (props.scenario === 'add') {
            const data = await Axios.post("https://exela-hiring-task-deepak.herokuapp.com/addBill", {
            billNo: billNumber,
            invoiceId: invoiceId,
            isPaid: isBillPaid,
            totalAmount: totalAmount,
            billDate: billDate
        });
        } else {
             const data = await Axios.put(`https://exela-hiring-task-deepak.herokuapp.com/update/${billId}`, {
            billNo: billNumber,
            invoiceId: invoiceId,
            isPaid: isBillPaid,
            totalAmount: totalAmount,
            billDate: billDate
        });
        }
        setIsSavingData(false)
    }


    return (
        <form className='flex flex_column input_container' onSubmit={e => { e.preventDefault(); e.stopPropagation(); }}>
            <div className='flex'>
                <label htmlFor="bill_input">Bill No.</label>
                <input
                    type="text"
                    id="bill_input"
                    placeholder="Bill No."
                    value={billNumber}
                    onChange={(event) => {
                        setBillNumber(event.target.value.toUpperCase());
                    }}
                    required
                ></input>
            </div>
            <div className='flex'>
                <label htmlFor="bill_date_input">Bill Date</label>
                <input
                    type="date"
                    id="bill_date_input"
                    placeholder="Bill Date"
                    value={billDate}
                    onChange={(event) => {
                        setBillDate(event.target.value);
                    }}
                    required
                ></input>
            </div>
            <div className='flex'>
                <label htmlFor="amount_input">Total Amount</label>
                <input
                    required
                    type="number"
                    id="amount_input"
                    placeholder="Total Amount"
                    value={totalAmount}
                    onChange={(event) => {
                        setTotalAmount(event.target.value);
                    }}
                ></input>
            </div>
            <div className='flex'>
                <label htmlFor="invoice_input">Invoice No.</label>
                <input
                    type="text"
                    required
                    id="invoice_input"
                    placeholder="Invoice No."
                    value={invoiceId}
                    onChange={(event) => {
                        setInovoiceId(event.target.value.toUpperCase());
                    }}
                ></input>
            </div>
            <div className='flex'>
                <label htmlFor="bill_input">Is Bill Paid?</label>
                <input
                    type="checkbox"
                    id="bill_input"
                    checked={isBillPaid}
                    onChange={() => {
                        setIsBillPaid(!isBillPaid);
                    }}
                ></input>
            </div>
            <button onClick={(event) => saveBillHandler(event)}>
                {isSavingData ? 'Saving...' : 'Save Bill Information'}
            </button>
        </form>
    );
};

export default EditComponent;
