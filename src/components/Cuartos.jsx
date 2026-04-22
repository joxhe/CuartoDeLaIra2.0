import { rooms } from '../data/rooms'

export default function Cuartos({ onOpenModal }) {
  return (
    <section id="cuartos">
      <div className="container">
        <p className="overline">La solución</p>
        <h2 className="section-title">
          Cuatro ambientes. Una experiencia <em>personalizada.</em>
        </h2>
        <p className="section-lead">
          Cada usuario completa un test emocional y es dirigido al espacio que
          realmente necesita en ese momento.
        </p>

        <div className="rooms-grid">
          {rooms.map(room => (
            <div
              key={room.id}
              className={`room-card ${room.id}`}
              onClick={() => onOpenModal(room)}
            >
              <div className="room-image">
                <img src={room.image} alt={room.title} />
              </div>
              <div className="room-content">
                <p className="room-tag">{room.step} — {room.tag}</p>
                <h3 className="room-name">{room.title}</h3>
                <p className="room-desc">{room.desc}</p>
                <button className="btn btn-primary room-btn">
                  Explorar este cuarto
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}