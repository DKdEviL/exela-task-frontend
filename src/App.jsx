import './App.css';
import { useEffect, useState } from 'react';
import TableComponent from './components/Table/Table'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import EditComponent from './components/EditComponent/EditComponent';
import DetailedView from './components/DetailedView/DetailedView';
import Loader from './components/Loader/Loader';
import DataService from './services/data.service';


function App() {

  const [billsData, setBillsData] = useState([]);
  const location = useLocation();
  const [isFetchingBills, setIsFetchingBills] = useState(false);

  useEffect(() => {
    setIsFetchingBills(true)
    fetchAllBills();
  }, [location])

  const fetchAllBills = async () => {
    setIsFetchingBills(true)
    const res = await DataService.getAllBills();
    setBillsData(res.data.data)
    setIsFetchingBills(false)
  }

  

  return (
    <div className="App flex flex_column">
      <h3>Electricity Bill</h3>
      {
        !(location.pathname.includes('add') || location.pathname.includes('edit')) && 
        <Link style={{margin: '10px'}} to="/add">Add Bill</Link>
      }
      {
        (location.pathname.includes('add') || location.pathname.includes('edit') || (location.pathname.includes('bill/'))) &&
        <Link style={{ margin: '10px' }} to="/">Home</Link>
      }
      <Routes>
        <Route exact path="/" element={
          isFetchingBills ? 
          <Loader /> :
          <div style={{maxHeight: '600px', marginBottom: '50px', overflow: 'auto'}}><TableComponent data={billsData} updateTableData={fetchAllBills} /></div>
        }/>
        <Route exact path="/add" element={<EditComponent scenario={'add'}/>} />
        <Route exact path="/edit/:id" element={<EditComponent scenario={'edit'} />} />
        <Route exact path="/bill/:id" element={<DetailedView />} />
      </Routes>

    </div>
  );
}

export default App;
