import React from 'react'
import { useParams } from 'react-router-dom'
import './CharacterDetails.css'
import axios from 'axios'

function CharacterDetails() {
    // This page shows the details of a specific character
    // What character?
    // The ID is in the URL
    // Get the parameter

    const {characterId} = useParams()

    // Create state to hold data from API
    const [character, setCharacter] = React.useState('')

    // I want to see character details when page loads
    // https://rickandmortyapi.com/api/character/2

    React.useEffect(
        () => {
            // Make API call to get the data
            axios.get(`https://rickandmortyapi.com/api/character/${characterId}`)
            .then(res => {
                console.log(res.data)
                // I have the data. What do I do with it?
                // Store the data in state
                setCharacter(res.data)
            })

            .catch(err => console.log(err))

        }, [] // Run once when the page loads
    )

  return (
    <div className="details-container">
        <img src={character?.image} />
        <div className="container-info">
            <p>Name: {character?.name}</p>
            <p>Gender: {character?.gender}</p>
            <p>Location: {character?.location?.name}</p>
            <p>Species: {character?.species}</p>
        </div>
    </div>
  )
}

export default CharacterDetails