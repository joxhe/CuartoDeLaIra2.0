const stats = [
  { num: '+30%', label: 'aumento en trastornos de ansiedad a nivel global',          source: 'OMS, 2022' },
  { num: '30%',  label: 'reducción del riesgo cardiovascular al canalizar emociones', source: 'APA, 2023' },
  { num: '0',    label: 'centros de catarsis existentes en el mercado regional',       source: 'Análisis de mercado local' },
]

export default function Problema() {
  return (
    <section id="problema">
      <div className="container">
        <p className="overline">El problema</p>
        <h2 className="section-title">
          La sociedad está en una <em>olla de presión</em> emocional
        </h2>
        <p className="section-lead">
          El estrés crónico, la rabia reprimida y la ansiedad han alcanzado niveles críticos.
          Hoy no existe un canal seguro y accesible para liberar emociones intensas sin el
          estigma de la terapia tradicional.
        </p>

        <div className="stats-grid">
          {stats.map(s => (
            <div className="stat-card" key={s.num + s.source}>
              <span className="stat-num">{s.num}</span>
              <p className="stat-label">{s.label}</p>
              <p className="stat-source">{s.source}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}