const Recipes = require("../models/recipe");
const multer = require("multer");

// Set up multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images');
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + '-' + file.originalname;
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

// Get all recipes
const getRecipes = async (req, res) => {
  const recipes = await Recipes.find();
  return res.json(recipes);
};

// Get single recipe
const getRecipe = async (req, res) => {
  const recipe = await Recipes.findById(req.params.id);
  res.json(recipe);
};

// Add new recipe
const addRecipe = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: Invalid or missing user" });
    }

    const { title, ingredients, instructions, time } = req.body;

    if (!title || !ingredients || !instructions) {
      return res.status(400).json({ message: "Required fields can't be empty" });
    }

    const newRecipe = await Recipes.create({
      title,
      ingredients: ingredients.split(',').map(i => i.trim()),
      instructions,
      time,
      coverImage: req.file.filename,
      createdBy: req.user.id
    });

    return res.status(201).json(newRecipe);
  } catch (error) {
    console.error("Add recipe error:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Edit existing recipe
const editRecipe = async (req, res) => {
  try {
    const { title, ingredients, instructions, time } = req.body;
    let recipe = await Recipes.findById(req.params.id);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    const coverImage = req.file?.filename || recipe.coverImage;
    const updatedRecipe = await Recipes.findByIdAndUpdate(
      req.params.id,
      {
        title,
        ingredients: ingredients.split(',').map(i => i.trim()),
        instructions,
        time,
        coverImage
      },
      { new: true }
    );

    return res.json(updatedRecipe);
  } catch (err) {
    console.error("Edit error:", err);
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

// Delete recipe
const deleteRecipe = async (req, res) => {
  try {
    await Recipes.deleteOne({ _id: req.params.id });
    res.json({ status: "ok" });
  } catch (err) {
    return res.status(400).json({ message: "Error deleting recipe", error: err.message });
  }
};

module.exports = {
  getRecipes,
  getRecipe,
  addRecipe,
  editRecipe,
  deleteRecipe,
  upload
};
