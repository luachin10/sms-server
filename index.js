
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRMh8AAHR9OI6EjTRPAL-r4vmjnjIF2qcvT1sv1eZeXZsCTFSgaRmasmVk1WYSxFaiJE3bNW6I5noqZ/pub?gid=891794971&single=true&output=csv';
const { parse } = require('csv-parse/sync');

app.use(cors());

app.use(express.json());

app.post('/sms', (req, res) => {
    const data = req.body;
    console.log('Tin nhắn nhận được:', data);
    res.send({ status: 'OK' });
});

// Route GET để fetch dữ liệu từ Google Sheets
app.get('/data-from-sheet', async (req, res) => {
  try {
    const response = await fetch(csvUrl);
    const csvText = await response.text();

    
    const records = parse(csvText, {
      columns: true,             // Tự lấy dòng đầu làm tên trường
      skip_empty_lines: true,
      trim: true
    });

    res.json(records); 
  } catch (err) {
    console.error('Lỗi khi fetch dữ liệu:', err);
    res.status(500).send('Không lấy được dữ liệu từ Google Sheet');
  }
});


app.listen(3000, '0.0.0.0', () => {
  console.log(`📡 Server đang chạy tại http://100.119.104.80:3000/`);
});
