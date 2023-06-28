const Question = require('../db/Questions')



const create_question = async (req,res)=>{
var question = new Question({
    uniquename:req.body.uniquename,
    sequence: req.body.sequence,
    title: req.body.title,
    description: req.body.description,
    difficulty: req.body.difficulty
  });
try {

  const newQ =  await question.save()
  res.status(200).json({
        success: true,
        message: `Q has been added successfully!`,
        Q: newQ
      });

 } catch (error) {
   console.log(error)
        res.status(400).json(error);
 }

}


const question_all = async (req,res)=>{
     try {
       const data =  await Question.find({})
          .sort({ sequence: "asc" })
      
        res.status(200).json(data);

     } catch (error) {
        res.status(400).json(error);
     }

}



const GetOne = async (req,res)=>{
     const Q_id = req.params.id 
     try {
      
      const Q_one = await Question.findOne({uniquename:Q_id})

       res.status(200).json({
        success: true,
        Q: Q_one
      });

     } catch (error) {
      
        res.status(400).json(error);


     }
  


}



module.exports={question_all,create_question,GetOne}