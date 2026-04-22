import { useEffect } from 'react'

export default function RoomModal({ room, onClose }) {
  // Cerrar con Escape + bloquear scroll del body
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    <div className="modal" onClick={handleBackdrop}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="modal-image">
          <img src={room.image} alt={room.title} />
        </div>

        <div className="modal-info">
          <span className="modal-tag">{room.tag}</span>
          <h2 className="modal-title">{room.title}</h2>
          <p className="modal-desc">{room.desc}</p>

          <div className="modal-benefits">
            <h3>¿Qué vas a experimentar?</h3>
            <ul>
              {room.benefits.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          </div>

          <button
            className="btn btn-primary modal-reserve-btn"
            onClick={() => {
              onClose()
              alert('¡Excelente elección! Próximamente podrás hacer tu test emocional aquí.')
            }}
          >
            Quiero vivir esta experiencia
          </button>
        </div>
      </div>
    </div>
  )
}