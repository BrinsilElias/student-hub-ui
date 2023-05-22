import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Table from '../components/Table';
import Toast from '../components/Toast';
import Header from '../components/Header';
import AddFrom from '../components/AddFrom';
import styles from './dashboard.module.css'
import utilStyle from '../utils.module.css';

function Dashboard() {
  const [data, setData] = useState([])
  const [visible, setVisible] = useState(false)

  const handleFormSubmission = (newData) => {
    setData([...data, newData]); // Add the new data to the existing data array
    setVisible(true)
    setTimeout(() => {
      setVisible(false)
    }, 3000)
  };


  useEffect(() =>{
    const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:8080/api/students');
          setData(response.data);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
      fetchData();
    }, [data]
  );

  return (
    <div className={styles.dashboard}>
      <Header />
      {visible && <div className={styles.toast_container}>
        <Toast />
      </div>}
      <main>
        <div className={utilStyle.container}>
          <div className={styles.dashboard_body}>
            <div>
              <h1 className={utilStyle.headinglg}>Welcome back,</h1>
              <p className={utilStyle.bodytextlglight}>Track and manage your students.</p>
            </div>
            {/* Main Container Start */}
            <div className={styles.dashboard_body_main}>
              
              {/* From Start */}
              <div className={styles.form_container}>
                <div className='form-header'>
                  <div className={utilStyle.add_icon}></div>
                  <p className={utilStyle.headingmd}>Add Details</p>
                  <p className={utilStyle.bodytextsmlight}>Add student details</p>
                </div>
                <div className='form-body'>
                  <AddFrom onFormSubmit={handleFormSubmission} />
                </div>
              </div> 
              {/* Form End */}

              {/* Table Start */}
              <div className={styles.table_container}>
                <Table student_data={data} />
              </div>
              {/* Table End */}

            </div>
            {/* Main Container End */}
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard