import { useState, createContext, useEffect } from 'react'
// Use hook to create context
export const FavoritesContext = createContext()

export default function FavoritesContextProvider(props) {
    // Create state
    const [favorites, setFavorites] = useState([])

    useEffect(
        () => {
            // Check local storage for initial value
            const storedFavorites = localStorage.getItem('favoritesList')
            // Check if something is there
            if (storedFavorites) {
                // Use this value to initialize state
                setFavorites(JSON.parse(storedFavorites))
            }

        }, [] // Run once when component loads
    )
    

    useEffect(
        () => {
            // Save current state to local storage when favorites changes
            localStorage.setItem('favoritesList', JSON.stringify(favorites))

        }, [favorites] // Run when favorites changes
    )

    const addCharacter = (charToAdd) => {
        console.log('adding', charToAdd)
        // Add this object to favorites
        let newFavorites = [...favorites, charToAdd]
        console.log(newFavorites)
        setFavorites(newFavorites)
    }

    const removeCharacter = (charId) => {
        console.log('remove id', charId)
        // Remove this object from favorites
        let newFavorites = favorites.filter(item => item.id != charId)
        setFavorites(newFavorites)
    }

    return (
        <FavoritesContext.Provider value={{favorites, addCharacter, removeCharacter}}>
            {props.children}
        </FavoritesContext.Provider>
    )
}