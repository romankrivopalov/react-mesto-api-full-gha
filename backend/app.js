require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const handleError = require('./middlewares/handleError');
const { limiterSetting } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, DB_ADDRESS = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;

const app = express();
app.use(cors({
  origin: [
    'http://localhost:3001',
    'https://krivo.mesto.nomoredomains.rocks',
  ],
  credentials: true,
  maxAge: 30,
}));

const limiter = rateLimit(limiterSetting);
app.use(limiter);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

mongoose.connect(DB_ADDRESS, {});

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
