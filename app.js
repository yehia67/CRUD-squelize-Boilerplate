const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const logger = require('npmlog');

require('dotenv').config();


  const { Router } = require('./routes/note.route');
  const { ServerError } = require('./serverConfig');
  const app = express();

  app.use(morgan('dev'));
  app.use(cors());
  app.use(express.json());

  app.use('/note', Router);

  const db = require("./models");
  db.sequelize.sync();

  // 404 handler
  app.use('*', (req, res, next) => {
    next(new ServerError('API_NOT_FOUND', 404));
  });

  // error handler
  app.use((err, req, res, next) => {
    console.log('Error Message >', err.message);
    if (!err.status) {
      console.log('Stack >', err.stack);
      // console.error(err);
      process.exit(0);
    }
    res.status(err.status).json({ message: err.message, status: err.status });
  });

  app.listen(process.env.PORT, () => {
    logger.info(`Server started on port ${process.env.PORT}`);
  });

