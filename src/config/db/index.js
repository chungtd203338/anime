const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(`mongodb://${process.env.MONGO_IP}:${process.env.MONGO_PORT}/anime`);
        console.log('Connect successfully!!!');
    } catch (error) {
        console.log('Connect failure!!!');
    }
}

module.exports = { connect };
