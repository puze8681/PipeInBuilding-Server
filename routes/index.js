var express = require('express');
const app = express.Router();
const rndString = require('randomstring')
var db = require('../mongo/mongo')
const History = db.History

app.post('/', (req, res) => {
    console.log(req.body);
    var History = new History();
    var token = rndString.generate(6)
    History.status = req.body.status
    History.startTime = req.body.startTime
    History.token = token
    History.save()
        .then(
            res.status(200).json( { message: 'success', token: token})
        )
        .catch(err=>{
            console.error(err);
            res.status(401).json( { error: 'failure'});
            return;
        })
});

app.get('/',  (req,res)=>{
    History.find({})
      .then(histories => {
        res.status(200).json(histories)
      })
      .catch(err=>{
          console.log(err);
          res.status(500).json( { error: 'failure' })
      })
})

app.put('/:token', (req, res)=>{
    History.findById(req.params.token, (err ,histories)=>{
        if(err) return res.status(500).json({ error: 'database failure' });
        else if(!histories) return res.status(404).json({ error: 'book not found' });
        else{
            histories.endtime = req.body.endtime
            histories.pipeEnergy = req.body.pipeEnergy
            histories.energy = req.body.energy
            var time = histories.startTime - histories.endTime
            var dif = histories.pipeEnergy - histories.energy
            if(dif < 0) dif *= -1
            histories.time = time
            histories.dif = dif

            histories.save(function(err){
                if(err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'book updated', body: histories);
            });
        }
    })
});

module.exports = app;
