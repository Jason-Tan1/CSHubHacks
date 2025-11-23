import './App.css'
import Header from './components/Header'
import Home from './pages/Home'
import Signup from './pages/Signup'
import { useState } from 'react'

function App() {
  const [signedUp, setSignedUp] = useState(false)
  const [user, setUser] = useState(null)

  if (!signedUp) {
    return (
      <div className="app">
        <Signup onSignup={(user) => { setUser(user); setSignedUp(true) }} />
      </div>
    )
  }

  return (
    <div className="app">
      <Header />
      <Home user={user} />
    </div>
  )
}

export default App
