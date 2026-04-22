const servicios = [
  {
    num: '01',
    icon: '🧪',
    title: 'Diagnóstico emocional',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Evaluación psicométrica rápida que identifica tu estado emocional y te dirige al espacio más adecuado.',
  },
  {
    num: '02',
    icon: '🏛️',
    title: 'Experiencias de catarsis',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cuatro ambientes únicos diseñados para diferentes necesidades emocionales, desde la descarga física hasta la relajación profunda.',
  },
  {
    num: '03',
    icon: '🌱',
    title: 'Seguimiento y bienestar',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Acompañamiento posterior con herramientas prácticas para sostener el equilibrio emocional en el día a día.',
  },
]

export default function QueHacemos() {
  return (
    <section id="que-hacemos">
      <div className="container">
        <div className="que-hacemos-intro">
          <div>
            <p className="overline">Qué hacemos</p>
            <h2 className="section-title">
              Más que un espacio.<br />Una <em>experiencia terapéutica.</em>
            </h2>
          </div>
          <p className="section-lead">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Combinamos herramientas
            psicológicas, tecnología sensorial y entornos diseñados para liberar, sanar
            y reconectar.
          </p>
        </div>

        <div className="servicios-grid">
          {servicios.map(s => (
            <div className="servicio-card" key={s.num}>
              <p className="servicio-num">{s.num}</p>
              <span className="servicio-icon">{s.icon}</span>
              <p className="servicio-title">{s.title}</p>
              <p className="servicio-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}