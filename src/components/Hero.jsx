import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Hero({ auth, setAuth}) {

  const navigate = useNavigate()

  const logout = () => {
    localStorage.setItem('isCurrentUser', false)
    setAuth(false);
    navigate('/login')
  }


  return (
    <header className='hero_header'>
      <nav className='nav'>
        <h1 className='logo_heading'>Translit</h1>
        <button onClick={(e)=>logout()} className='nav_btn'>
          Log Out
        </button>
      </nav>

      <h1 className='head_text'>AI-Powered Translation</h1> 
      <p style={{
        fontSize: '1.125rem', 
        color: '#6b7280', 
        textAlign: 'center', 
        marginTop: '12px',
        maxWidth: '600px'
      }}>
        Translate text with precision using advanced GPT technology
      </p>
    </header>
  )
}
