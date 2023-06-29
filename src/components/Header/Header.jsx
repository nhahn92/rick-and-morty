import React, { useContext } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import { ThemeContext } from '../../contexts/ThemeContext'

function Header() {
  // Create a variable for Dark Mode
  // const darkMode = false;

  // Create state for Dark Mode/Light Mode
  // const [darkMode, setDarkMode] = React.useState(false)

  // Change to use global state
  // Note: {} not []
  const {darkMode, setDarkMode} = useContext(ThemeContext)

  return (
    <div className={darkMode?"header-container header-dark" : "header-container"}>
        <div>
            <Link to="/" style={{marginRight: "10px"}}>Home</Link>
            <Link to="/about" style={{marginRight: "10px"}}>About</Link>
            <Link to="/episodes">Episodes</Link>
        </div>
        <div>
          <Link to="/favorites">My Favorites</Link>
          <button className={darkMode?"theme-button theme-button-dark" : "theme-button"}
          onClick={() => setDarkMode(!darkMode)}>
            {
              darkMode?"Light Mode" : "Dark Mode"
            }
          </button>
        </div>
    </div>
  )
}

export default Header