import React, { useState, useEffect, useRef } from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function ExcelChart({ data }) {
  const [xAxis, setXAxis] = useState('');
  const [yAxis, setYAxis] = useState('');
  const [columns, setColumns] = useState([]);
  const chartRef = useRef(null);  // <== Ref to chart

  useEffect(() => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      setColumns(keys);
      setXAxis(keys[0]);
      setYAxis(keys[1]);
    }
  }, [data]);

  const chartData = {
    labels: data.map((row) => row[xAxis]),
    datasets: [
      {
        label: yAxis,
        data: data.map((row) => Number(row[yAxis])),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: `${yAxis} vs ${xAxis}` },
    },
  };

  const handleDownload = () => {
    const chart = chartRef.current;
    if (!chart) return;

    const link = document.createElement('a');
    link.download = 'chart.png';
    link.href = chart.toBase64Image();
    link.click();
  };

  return (
    <div>
      {/* Axis selectors */}
      <div style={{ marginBottom: '20px' }}>
        <label>
          X-Axis:&nbsp;
          <select value={xAxis} onChange={(e) => setXAxis(e.target.value)}>
            {columns.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </label>

        &nbsp;&nbsp;&nbsp;

        <label>
          Y-Axis:&nbsp;
          <select value={yAxis} onChange={(e) => setYAxis(e.target.value)}>
            {columns.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </label>
      </div>

      {/* Chart */}
      <Bar data={chartData} options={options} ref={chartRef} />

      {/* Download button */}
      <button onClick={handleDownload} style={{ marginTop: '20px' }}>
        Download Chart as PNG
      </button>
    </div>
  );
}

export default ExcelChart;
