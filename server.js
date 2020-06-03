const express = require('express');
const connectDB = require('./config/db');
const app = express();
const fileupload = require('express-fileupload');
const path = require('path');
connectDB();
//Init middleware
app.use(express.json({ extended: false }));
app.use(fileupload());
//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/adminauth', require('./routes/api/adminauth'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/emailverify', require('./routes/emailverify/verify'));
app.use('/api/project', require('./routes/api/project'));
app.use('/api/fileupload', require('./routes/fileupload/fileupload'));
//Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  //Set static folder
  app.use(express.static('client/build'));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  );
}
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
