const mongoose = require('mongoose')
const DB_NAME = "PipeInBuilding"

var db = mongoose.connect('mongodb://localhost/'+DB_NAME)
    .then(()=>{
        return server.start();
    })
    .catch(err=>{
        console.error('App starting error:', err.stack);
        process.exit(1);
    })

var History = mongoose.Schema({
    status: {type: Boolean, required: true},
    startTime: {type: Date, required: true},
    token: {type: String, required: true},
    endTime: {type: Date},
    time: {type: Number},
    pipeEnergy: {type: Number},
    energy: {type: Number},
    dif: {type: Number}
})

var History = mongoose.model('History', History);

exports.History = History;
exports.db = db;