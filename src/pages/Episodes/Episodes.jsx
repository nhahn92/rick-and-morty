import React from 'react'
import './Episodes.css'
import axios from 'axios'
import CharacterCard from '../../components/CharacterCard/CharacterCard'

function Episodes() {
  // Create state for the option numbers
  const [options, setOptions] = React.useState([])
  // Create state to store option selected
  const [selectedOption, setSelectedOption] = React.useState(1)
  // Create state for episode data
  const [selectedEpisode, setSelectedEpisode] = React.useState('')
  // Create state for characters
  const [characterList, setCharacterList] = React.useState([])

  // https://rickandmortyapi.com/api/episode
  // I need to build the dropdown list when the page loads
  React.useEffect(
    () => {
      // Make API call to find out number of episodes
      axios.get(`https://rickandmortyapi.com/api/episode`)
      .then(res => {
        console.log(res.data.info.count)
        // Use a loop to create array of numbers from 1 to this value
        const newOptions = []
        for (let i = 1; i <= res.data.info.count; i++) {
          newOptions.push(i)
        }
        console.log(newOptions)
        // Store in state
        setOptions(newOptions)
      })
      .catch(err => console.log(err))
    }, [] // Run once when page loads
  )

  const handleSelectChange = (e) => {
    // console.log('you selected', e.target.value)
    // Store in state
    setSelectedOption(e.target.value)
    // Make API call to get data
  }

  // Set up useEffect to run any time I change the episode
  React.useEffect(
    () => {
      console.log('get episode', selectedOption)
        // Call function to get the data
      fetchEpisodeData()
    }, [selectedOption] // Runs when this state changes
  )

  const fetchEpisodeData = async () => {
    console.log('make api call')
    try {
      // Make API call to get episode info
      // https://rickandmortyapi.com/api/episode/28
      const res = await axios.get(`https://rickandmortyapi.com/api/episode/${selectedOption}`)
      console.log(res.data)
      // Store in state
      setSelectedEpisode(res.data)

      // console.log(res.data.characters)
      // We need to make multiple API calls to get all character data
      const episodeCharacters = await Promise.all (
        res.data.characters.map(url => {
          return axios.get(url).then(res => res.data)
        })
      )
        console.log(episodeCharacters)
        // Store in state
        setCharacterList(episodeCharacters)
    } catch(err) {
      console.log(err)
    }
  }

  return (
    <div className="episodes-container">
      <div>
        <label htmlFor="select-episode">Select an episode</label>
        <select id="select-episode" onChange={handleSelectChange}>
          {
            options.map(num => <option key={num} value={num}>{`Episode ${num}`}</option>)
          }
        </select>
      </div>
      <div>
        <div className="episode-info">
          <p>Episode Name: {selectedEpisode?.name}</p>
          <p>Air Date: {selectedEpisode?.air_date}</p>
        </div>
        <div className="character-container">
          {
            characterList.map(item => <CharacterCard
              key={item.id}
              character={item} />)
              // characters.map(item => <p>{item.name}</p>)
          }
        </div>
      </div>
    </div>
  )
}

export default Episodes