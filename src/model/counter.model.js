const mongoose = require('mongoose');

const CounterSchema = new mongoose.Schema({
        name: { 
            type: String, 
            unique: true, 
            required: true, 
        },
        value: { 
            type: Number, 
        },
    },
);

module.exports = mongoose.model("counters", CounterSchema);