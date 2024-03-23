import './App.css'
import AudioList from './Components/AudioList'
import Player from './Components/Player'
import { SongProvider } from './Contexts/SongContext'
import { ThemeProvider } from './Contexts/ThemeContext'

function App() {
  
  return (
    <>
    <ThemeProvider>
    <SongProvider>
      <div className='parentBox'>
        <AudioList/>
        <Player/>
      </div>
      
    </SongProvider>
    </ThemeProvider>
    </>
  )
}

export default App
