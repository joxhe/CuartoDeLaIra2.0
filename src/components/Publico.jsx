const publicos = [
  'Jóvenes profesionales',
  'Estudiantes universitarios',
  'Personal de salud',
  'Trabajadores del sector financiero',
  'Personas con estrés crónico',
  'Empresas y equipos de trabajo',
]

export default function Publico() {
  return (
    <section id="publico">
      <div className="container">
        <p className="overline">Público objetivo</p>
        <h2 className="section-title">
          Para quienes <em>viven al límite.</em>
        </h2>

        <div className="who-grid">
          {publicos.map(p => (
            <div className="who-card" key={p}>{p}</div>
          ))}
        </div>
      </div>
    </section>
  )
}