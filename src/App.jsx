import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Nosotros from './components/Nosotros'
import QueHacemos from './components/QueHacemos'
import Problema from './components/Problema'
import Cuartos from './components/Cuartos'
import RoomModal from './components/RoomModal'
import Proceso from './components/Proceso'
import Publico from './components/Publico'
import Impacto from './components/Impacto'
import Contacto from './components/Contacto'
import Footer from './components/Footer'
import './App.css'

function App() {
  const [modalRoom, setModalRoom] = useState(null)

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Nosotros />
        <QueHacemos />
        <Problema />
        <Cuartos onOpenModal={setModalRoom} />
        <Proceso />
        <Publico />
        <Impacto />
        <Contacto />
      </main>
      <Footer />

      {/* Modal global — recibe el cuarto seleccionado */}
      {modalRoom && (
        <RoomModal room={modalRoom} onClose={() => setModalRoom(null)} />
      )}
    </>
  )
}

export default App