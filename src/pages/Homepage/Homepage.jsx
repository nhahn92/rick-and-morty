import React, { useEffect, useState, useContext } from 'react'
import './Homepage.css'
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard'
import Search from '../../components/Search/Search'
import { ThemeContext } from '../../contexts/ThemeContext'

function Homepage() {
    // Change to use global state
    // Note: {} not []
    const {darkMode, setDarkMode} = useContext(ThemeContext)

    // Show the characters when the page loads
    // Create state to hold the characters
    const[characters, setCharacters] = useState([])
    // https://rickandmortyapi.com/api/character

    useEffect(
        () => {
            console.log("homepage loaded")
            // Make API call to get the data
            axios.get(`https://rickandmortyapi.com/api/character`)
            .then(res => {
                console.log(res.data.results)
                // I have the data. What do I do with it?
                // Store it in state
                setCharacters(res.data.results)
            })
            .catch(err => console.log(err))
            

        }, [] // Runs once only when page loads; causes infinite loop without it
    )

  return (
    <div className={darkMode?"hompage-container homepage-dark" : "homepage-container"}>
        <Search setCharacters={setCharacters} />
        <h1>Main Characters</h1>
        <div className="characters-container">
            {
                characters.map(item => <CharacterCard
                    key={item.id}
                    character={item} />)
                // characters.map(item => <p>{item.name}</p>)
            }
        </div>
    </div>
  )
}

export default Homepage