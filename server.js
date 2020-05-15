const express = require('express');
const connectDB = require('./config/db');
const app = express();
connectDB();
app.get('/', (req, res) => res.send('API Running'));
//Init middleware
app.use(express.json({ extended: false }));
//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/adminauth', require('./routes/api/adminauth'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/emailverify', require('./routes/emailverify/verify'));
app.use('/api/project', require('./routes/api/project'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
