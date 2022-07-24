import './App.css';
import { useEffect, useState } from 'react';
import Axios from 'axios'
import TableComponent from './components/Table/Table'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import EditComponent from './components/EditComponent/EditComponent';


function App() {

  const [billsData, setBillsData] = useState([]);
  const location = useLocation();

  useEffect(() => {
    fetchAllBills();
  }, [location])

  const fetchAllBills = async () => {
    const res = await Axios.get("https://exela-hiring-task-deepak.herokuapp.com/allBills");
    setBillsData(res.data.data)
  }

  

  return (
    <div className="App flex flex_column">
      <h3>Electricity Bill</h3>
      {
        !(location.pathname.includes('add') || location.pathname.includes('edit')) && 
        <Link style={{margin: '10px'}} to="/add">Add Bill</Link>
      }
      {
        (location.pathname.includes('add') || location.pathname.includes('edit')) &&
        <Link style={{ margin: '10px' }} to="/">Home</Link>
      }
      <Routes>
        <Route exact path="/" element={<TableComponent data={billsData} updateTableData={fetchAllBills} />}/>
        <Route exact path="/add" element={<EditComponent scenario={'add'}/>} />
        <Route exact path="/edit/:id" element={<EditComponent scenario={'edit'} />} />
      </Routes>

    </div>
  );
}

export default App;
