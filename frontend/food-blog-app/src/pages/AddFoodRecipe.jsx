import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function AddFoodRecipe() {
    const [recipeData, setRecipeData] = useState({
        title: "",
        time: "",
        ingredients: "",
        instructions: "",
        file: null
    })
    const navigate = useNavigate()

    const onHandleChange = (e) => {
        const { name, value, files } = e.target
        setRecipeData(prev => ({
            ...prev,
            [name]: name === "file" ? files[0] : value
        }))
    }

    const onHandleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()

        formData.append("title", recipeData.title)
        formData.append("time", recipeData.time)
        formData.append("instructions", recipeData.instructions)
        formData.append("file", recipeData.file)

        // Send ingredients as comma-separated string
        formData.append("ingredients", recipeData.ingredients)

        try {
            await axios.post("http://localhost:5000/recipe", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'authorization': 'bearer ' + localStorage.getItem("token")
                }
            })
            navigate("/")
        } catch (err) {
            console.error("POST error:", err.response?.data || err.message)
        }
    }

    return (
        <div className="container">
            <form className="form" onSubmit={onHandleSubmit}>
                <div className="form-control">
                    <label>Title</label>
                    <input type="text" name="title" onChange={onHandleChange} />
                </div>
                <div className="form-control">
                    <label>Time</label>
                    <input type="text" name="time" onChange={onHandleChange} />
                </div>
                <div className="form-control">
                    <label>Ingredients (comma-separated)</label>
                    <textarea name="ingredients" rows="4" onChange={onHandleChange}></textarea>
                </div>
                <div className="form-control">
                    <label>Instructions</label>
                    <textarea name="instructions" rows="5" onChange={onHandleChange}></textarea>
                </div>
                <div className="form-control">
                    <label>Recipe Image</label>
                    <input type="file" name="file" accept="image/*" onChange={onHandleChange} />
                </div>
                <button type="submit">Submit Recipe</button>
            </form>
        </div>
    )
}
