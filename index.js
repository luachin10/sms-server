
const express = require('express');
const app = express();
const PORT = 3000;
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.post('/sms', (req, res) => {
    const data = req.body;
    console.log('Tin nhắn nhận được:', data);
    res.send({ status: 'OK' });
});

app.listen(3000, '0.0.0.0', () => {
  console.log(`📡 Server đang chạy tại http://192.168.1.100:3000`);
});
