const pillars = [
  { icon: '🎯', title: 'Misión',    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.' },
  { icon: '🔭', title: 'Visión',    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.' },
  { icon: '🤝', title: 'Valores',   desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod.' },
  { icon: '📍', title: 'Contexto',  desc: 'Arraigados en la región Caribe colombiana, para su comunidad.' },
]

export default function Nosotros() {
  return (
    <section id="nosotros">
      <div className="container">
        <div className="nosotros-grid">

          {/* Texto */}
          <div className="nosotros-text">
            <p className="overline">Quiénes somos</p>
            <h2 className="section-title">
              Un equipo que cree en el <em>bienestar real.</em>
            </h2>
            <p className="section-lead">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Somos un equipo
              interdisciplinario de psicólogos y especialistas en bienestar emocional
              comprometidos con crear espacios seguros para la expresión y liberación
              de emociones. Nacimos en Sincelejo con la convicción de que el bienestar
              mental no debería ser un privilegio.
            </p>
            <p className="section-lead" style={{ marginTop: '1rem' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
              quis nostrud exercitation ullamco laboris.
            </p>

            <div className="nosotros-pillars">
              {pillars.map(p => (
                <div className="pillar" key={p.title}>
                  <span className="pillar-icon">{p.icon}</span>
                  <p className="pillar-title">{p.title}</p>
                  <p className="pillar-desc">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Cita visual */}
          <div className="nosotros-visual">
            <div className="nosotros-big-card">
              <p className="nosotros-quote">
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nemo enim ipsam
                voluptatem quia voluptas sit aspernatur aut odit aut fugit."
              </p>
              <p className="nosotros-quote-author">— Fundadoras, Cuarto de la Ira</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}