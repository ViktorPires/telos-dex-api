const CountersModel = require('../model/counter.model');

let initialized = false;

const initializeCounter = async (request, response, next) => {

  if(initialized) {
    return next();
  };

  try {
    const existingCounter = await CountersModel.findOne({ name: 'pokedex_counter' });

    if (existingCounter) {
       console.log('Counter already initialized.');
    } else {
        const newCounter = new CountersModel({ name: 'pokedex_counter', value: 801 });

        await newCounter.save();

        console.log('Counter initialized with value 801.');
    }

    initialized = true;

    return next();
  } catch (error) {
        console.error('Failed to initialize counter:', error.message);

        return next(error);
  }
};

module.exports = { initializeCounter };