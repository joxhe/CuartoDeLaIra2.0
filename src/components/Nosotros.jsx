const pillars = [

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
              Somos un equipo
              interdisciplinario de psicólogos y especialistas en bienestar emocional
              comprometidos con crear espacios seguros para la expresión y liberación
              de emociones. Nacimos en Sincelejo con la convicción de que el bienestar
              mental no debería ser un privilegio.
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
                "El lugar donde las emociones encuentran la salida del laberinto que confunde nuestro pensar."
              </p>
              <p className="nosotros-quote-author">— Fundadoras, Cuarto de la Ira</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}