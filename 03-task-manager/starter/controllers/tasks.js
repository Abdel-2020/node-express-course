const Task = require('../models/task')
const asyncWrapper = require ('../middleware/async')



const getAllTasks = asyncWrapper( async (req, res) => {
 
        const tasks = await Task.find({})
        return res.status(200).json({success: true, data:{tasks, nbHits: tasks.length} })
        
})

const createTask = async (req, res) => {
    try {
        const task = await Task.create(req.body);
        console.log(req.body)
        return res.status(201).json({
            task
        })
        
    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
    }

}

const getTask = async (req, res) => {
    try {
        //not destructured.
        //"id" here refers to the route parameter
        //"_id" is the name of the primary key in our DB
        const taskID = req.params.id;
        const task = await Task.findOne({
            _id: taskID
        })

        if (!task) {
            return res.status(404).json({
                msg: `no task with ID:${taskID}`
            })
        }

        console.log({task:task})

        return res.status(200).json({
            task:task
        })



    } catch (error) {
        return res.status(500).json({
            msg: error.message
        })
    }

}

const updateTask = async (req, res) => {
    try {
        const taskID = req.params.id;
        // return res.status(200).json({id: taskID, data: req.body});
        //console.log(`incorrect id = ${req.params.id} vs correct id _id:${taskID}`)
        const task = await Task.findOneAndUpdate({_id: taskID}, req.body, {
            new: true,
            runValidators: true
        })

        if (!task) {
            return res.status(404).json({
                msg: `no task with ID:${taskID}`
            })
        }
        return res.status(200).json({task})

    } catch (error) {
        return res.status(500).json({
            msg: error
        })
    }
}


const deleteTask = async (req, res) => {
    try {
        //destructured
        const {id: taskID} = req.params;
        const task = await Task.findOneAndDelete({
            _id: taskID
        });
        if (!task) {
            return res.status(404).json({
                msg: `No task with id: ${taskID}`
            })
        }
        res.status(200).json({
            task
        })
        return;

    } catch (error) {
        res.status(500).json({
            msg: error.message
        })
        
    }
}

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}