const path = require('path')
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const fileupload = require('express-fileupload');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./middleware/error');


dotenv.config({ path: `./config/config.env` });

const { sequelize } = require('./models');

// Route files
const menuItem = require('./routes/menuItem');
const order = require('./routes/order');
const orderItem = require('./routes/orderItem');
const users = require('./routes/user');
const auth = require('./routes/auth.js')
const seeder = require('./routes/seeder');
const offer = require('./routes/offers.js');
const notification = require('./routes/notification.js');



const app = express();

// Body parser
app.use(express.json());

app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

// File uploading
app.use(fileupload());

// Rate limiting
const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, // 10 mins
  max: 1000,
});

app.use(limiter);

app.use(express.static(path.join(__dirname, 'public')));


// Mount routers
app.use('/api/v1/menu', menuItem);
app.use('/api/v1/order', order);
app.use('/api/v1/orderItem', orderItem);
app.use('/api/v1/users', users);
app.use('/api/v1/auth', auth);
app.use('/api/v1/seed', seeder);
app.use('/api/v1/offer', offer);
app.use('/api/v1/notification', notification);



app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const start_server = async () => {
  try {
    await sequelize.authenticate();
    console.log('Database connected successfully!!!');

    // Sync models (use { force: true } for dev to drop tables)
    await sequelize.sync({ force: false });

    app.listen(PORT, () => {
      console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
      );
    })

  } catch (err) {
    console.log(err)
    process.exit(1)
  }
};

start_server()

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  // Close server & exit process
  server.close(() => process.exit(1));
});

