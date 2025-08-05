import ExcelChart from './ExcelChart';
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [excelData, setExcelData] = useState([]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return alert('Please select a file first.');

    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const res = await axios.post('http://localhost:5000/api/upload', formData);
      setExcelData(res.data.data);
    } catch (err) {
      alert('Error uploading file');
      console.error(err);
    }
  };

  return (
  <div className="App">
    <div className="glass-card">
      <h1>Excel Analytics Platform</h1>
      <input type="file" accept=".xlsx" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {excelData.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Parsed Data :</h2>
          <ExcelChart data={excelData} />
        </div>
      )}
    </div>
  </div>
);
}

export default App;
