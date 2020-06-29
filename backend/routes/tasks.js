const express = require('express');
const router = express.Router();
let Task = require('../models/task.model');

router.route('/').get((req, res) => {
    Task.find()
        .then(tasks => res.status(200).json(tasks))
        .catch(err => res.status(400).json('Error', err));
});

router.route('/:id').get((req, res) => {
    Task.findById(req.params.id)
        .then(task => res.status(200).json(task))
        .catch(err => res.status(400).json('Error', err));
});

router.route('/:id').delete((req, res) => {
    Task.findByIdAndDelete(req.params.id)
        .then(() => res.json('Task deleted.'))
        .catch(err => res.status(400).json('Error', err));
});

router.route('/update/:id').patch((req, res) => {
    Task.findByIdAndUpdate(req.params.id)
        .then((task) => {
            
            if(req.body._id){
                delete req.body._id;
            }
            for( let b in req.body ){
                task[b] = req.body[b];
            }

            task.save()
                .then(() => res.status(201).json('Task updated.'))
                .catch(err => res.status(400).json('Error', err));
        })
        .catch(err => res.status(400).json('Error', err));
})

router.route('/add').post((req, res) => {
    const { owner, title, description } = req.body;

    const newTask = new Task({ 
        owner, 
        title, 
        description,
        status: "new"
    })

    //TODO - takto prerobit aj ostatne metody
    newTask.save(function(err){
        if (err) return res.status(400).json({status: 'Error during creating task.'});

        res.status(201).json({status: 'Task created.'})
    })
});

module.exports = router;