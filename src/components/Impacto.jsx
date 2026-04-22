const items = [
  { icon: '🧠', title: 'Preventivo',          desc: 'Democratiza el acceso a la liberación emocional sin el estigma de la terapia tradicional.' },
  { icon: '♻️', title: 'Sostenible',           desc: 'Modelo de economía circular: residuos industriales transformados en insumos del Cuarto de Ira.' },
  { icon: '💼', title: 'Generador de empleo', desc: 'Crea puestos para psicólogos y personal logístico en la región de Sucre.' },
  { icon: '🚀', title: 'Disruptivo',           desc: 'Primer servicio de diagnóstico-acción emocional en el mercado regional. Sin competencia directa.' },
]

export default function Impacto() {
  return (
    <section id="impacto">
      <div className="container">
        <p className="overline">Por qué importa</p>
        <h2 className="section-title">
          Impacto más allá de la <em>salud mental.</em>
        </h2>

        <div className="impact-grid">
          {items.map(item => (
            <div className="impact-card" key={item.title}>
              <span className="impact-icon">{item.icon}</span>
              <p className="impact-title">{item.title}</p>
              <p className="impact-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}