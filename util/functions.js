const axios = require('axios');

const request = axios.default;

exports.handleError = ({
    error,
    next,
    ServerError,
    logger
  }) => {
  logger(error);
  next(new ServerError(error.message, 422));
}


exports.isConnectedToBc = async ({bcURL, logger}) => {
    const body = {
    "jsonrpc": "2.0",
    "method": "eth_blockNumber",
    "params": [],
    "id": 1
  };

  try {
    let connected = false;
    const intervalId = setInterval(() => {
      if (!connected) throw new Error('You Are Not Connected to the blockchain network');
      console.log('timeout reset due connection was successful');
      clearInterval(intervalId);
    }, process.env.TIMEOUT);
    
    await request.post(bcURL, body);
    connected = true;
    console.log('You are Connected to blockchain network now!');
    return true;
  } catch (error) {
    logger(error.message);
    return false;
  }
}
