'use strict';

module.exports.viewSpot = async (event) => {
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'This is where the result should be displayed',
        input: event,
      },
      null,
      2
    ),
  };
};
