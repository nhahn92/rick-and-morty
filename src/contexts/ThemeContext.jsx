import { useState, createContext, useEffect } from 'react'
// Use hook to create context
export const ThemeContext = createContext()

export default function ThemeContextProvider(props) {
    // Create state
    const [darkMode, setDarkMode] = useState(false)

    useEffect(
        () => {
            // Check local storage for initial value
            const storedDarkMode = localStorage.getItem('darkMode')
            console.log('darkMode is', storedDarkMode)
            // Check if something is there
            if (storedDarkMode) {
                // Use this value to initialize state
                setDarkMode(JSON.parse(storedDarkMode))
            }

        }, [] // Run once when component loads
    )

    useEffect(
        () => {
            console.log('darkMode change')
            // Save current state to local storage when it changes
            localStorage.setItem('darkMode', JSON.stringify(darkMode))

        }, [darkMode] // Run when darkMode changes
    )

    return (
        <ThemeContext.Provider value={{darkMode, setDarkMode}}>
            {props.children}
        </ThemeContext.Provider>
    )
}