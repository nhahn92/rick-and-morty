import React, { useContext, useEffect } from 'react'
import './CharacterCard.css'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { FavoritesContext } from '../../contexts/FavoritesContext'

function CharacterCard({character}) {

  // Change to use global state
  // Note: {} not []
  const {favorites, addCharacter, removeCharacter} = useContext(FavoritesContext)

  // Create variable to control heart icons
  // const isFavorite = false;
  // Change to state
  const [isFavorite, setIsFavorite] = React.useState(false)

  // Need to check if this character in favorites
  // any time favorites changes
  useEffect (
    () => {
      // console.log('favorites changed')
      // Is this character in favorites?
      setIsFavorite(favorites.find(item => item.id == character.id))
    }
  ), [favorites] // Runs when favorites changes

  return (
    <div className="character-card">
        <img src={character?.image} />
        <p>{character?.name}</p>
        <Link to={`/details/${character?.id}`}>See Details</Link>
        {
          isFavorite?
          <FaHeart className="heart-icon" onClick={() => removeCharacter(character?.id)} />
          :
          <FaRegHeart className="heart-icon" onClick={() => addCharacter(character)} />
        }
    </div>
  )
}

export default CharacterCard