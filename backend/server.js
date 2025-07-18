const express = require('express');
const dotenv = require('dotenv');
const fileupload = require('express-fileupload');
const rateLimit = require('express-rate-limit');

dotenv.config({ path: `./config/config.env` });

const app = express();

// Body parser
app.use(express.json());

// File uploading
app.use(fileupload());

// Rate limiting
const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, // 10 mins
  max: 1000,
});

app.use(limiter);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);

  // Close server & exit process
  server.close(() => process.exit(1));
});

