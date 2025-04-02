// import the model
const Todo = require("../models/Todo");

//define route handler

 exports.deleteTodo = async(req,res) => {
    try{
        const {id} = req.params;

        await Todo.findByIdAndDelete(id);
        

        res.status(200).json({
            success:true,
            message: `delete Successfully`,
          })
          
    }
        catch(err){
            console.error(err);
            res.status(500)
            .json({
                success:false,
                data:err.message,
                message:'Server ERROR',
        
            });
    }
 }