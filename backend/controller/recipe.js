const Recips=require("../models/recipe")
const getRecipes=async(req,res)=>{
    const recipes=await Recips.find()
    return res.json(recipes)
}

const getRecipe=async(req,res)=>{
   const recipe=await Recips.findById(req.params.id)
   res.json(recipe)
}
const addRecipe=async(req,res)=>{
   const {title,ingredients,instructions,time}=req.body

   if(!title || !ingredients || !instructions)
   {
    res.json({message:"Required fields can'be empty"})
   }

   const newRecipe=await Recips.create({
    title,ingredients,instructions,time
   })
   return res.json(newRecipe)


}
const editRecipe=async(req,res)=>{
    const {title,ingredients,instructions,time}=req.body
    let recipe=await Recips.findById(req.params.id)
  try{
      if(recipe){
        await Recips.findByIdAndUpdate(req.params.id,req.body,{new:true})
        res.json({title,ingredients,instructions,time})
    }

  }
  catch(err){
    return res.status(404).json({message:"error"})
  }


}
const deleteRecipe=(req,res)=>{
    res.json({message:"hello"})
}
module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe}