const Recips = require("../models/recipe")
const multer = require('multer')

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname
    cb(null, filename)
  }
})

const upload = multer({ storage: storage })

// Get all recipes
const getRecipes = async (req, res) => {
  const recipes = await Recips.find()
  return res.json(recipes)
}

// Get single recipe
const getRecipe = async (req, res) => {
  const recipe = await Recips.findById(req.params.id)
  return res.json(recipe)
}

// Add new recipe
const addRecipe = async (req, res) => {
    let { title, ingredients, instructions, time } = req.body

    if (!title || !ingredients || !instructions || !req.file) {
        return res.status(400).json({ message: "All fields are required" })
    }

    // Ensure ingredients is an array
    if (typeof ingredients === "string") {
        ingredients = ingredients.split(',').map(i => i.trim())
    }

    const newRecipe = await Recips.create({
        title,
        ingredients,
        instructions,
        time,
        coverImage: req.file.filename,
        createdBy: req.user.id
    })

    res.json(newRecipe)
}

// Edit existing recipe
const editRecipe = async (req, res) => {
  const { title, ingredients, instructions, time } = req.body
  let recipe = await Recips.findById(req.params.id)

  try {
    if (recipe) {
      const updatedRecipe = await Recips.findByIdAndUpdate(
        req.params.id,
        { title, ingredients, instructions, time },
        { new: true }
      )
      return res.json(updatedRecipe)
    }
  } catch (err) {
    return res.status(404).json({ message: "Error updating recipe" })
  }
}

// Delete recipe (dummy for now)
const deleteRecipe = (req, res) => {
  res.json({ message: "Recipe delete endpoint" })
}

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload
}
