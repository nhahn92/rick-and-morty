import React from 'react'
import './Search.css'
import axios from 'axios'

function Search({setCharacters}) {
    // Need state to hold user input
    const [query, setQuery] = React.useState('')

    // https://rickandmortyapi.com/api/character/?name=beth

    const handleSubmit = (e) => {
        // Stop page from refreshing
        e.preventDefault()

        console.log("Search", query)

        // I need to make API call to find matching characters
        axios.get(`https://rickandmortyapi.com/api/character/?name=${query}`)
        .then(res => {
            console.log(res.data.results)
            // I have the data. What do I do with it?
            // Change the data in characters
            setCharacters(res.data.results)
        })
        .catch(err => {
            console.log(err.response.status)
            // Check for character not found
            if (err.response.status === 404) {
                alert(`No character named ${query}`)
            }
        })

        // Clear textbox
        setQuery('')
    }

  return (
    <form className="search-container" onSubmit={handleSubmit}>
        <input
            value={query}
            type="text"
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search all characters"
        />
    </form>
  )
}

export default Search