import React from 'react'
import foodRecipe from "../assets/foodRecipe.png"
import Navbar from '../components/Navbar'
import Footer from '../components/Footer';
import RecipeItem from '../components/Recipeitem';

export default function Home() {
  return (
    <>

      <section className='home'>
        <div className='left'>
          <h1>Food Recipe</h1>
          <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta expedita nihil, veniam eius alias cumque quasi officia minima, fugiat consequuntur neque a at sed molestiae voluptatum obcaecati id, adipisci accusantium.</h5>
          <button>Share your Recipe</button>
        </div>
        <div className='right'>
          <img src={foodRecipe} width="320px" height="300px"></img>
        </div>

      </section>
      <div className='bg'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#d4f6e8" fillOpacity="1" d="M0,128L34.3,133.3C68.6,139,137,149,206,128C274.3,107,343,53,411,53.3C480,53,549,107,617,160C685.7,213,754,267,823,266.7C891.4,267,960,213,1029,208C1097.1,203,1166,245,1234,261.3C1302.9,277,1371,267,1406,261.3L1440,256L1440,320L1405.7,320C1371.4,320,1303,320,1234,320C1165.7,320,1097,320,1029,320C960,320,891,320,823,320C754.3,320,686,320,617,320C548.6,320,480,320,411,320C342.9,320,274,320,206,320C137.1,320,69,320,34,320L0,320Z"></path></svg>

      </div>

      <div className='recipe'>
        <RecipeItem/>
      </div>



    </>
  )
}

