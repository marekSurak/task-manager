const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
    owner: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: false },
    status: {type: String, required: true }
}, { timestamps: true });

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
