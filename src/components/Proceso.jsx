const steps = [
  { n: 1, title: 'Llegas',              desc: 'Reservas tu sesión y te registras en el centro' },
  { n: 2, title: 'Test emocional',      desc: 'Completas una evaluación psicométrica rápida' },
  { n: 3, title: 'Diagnóstico',         desc: 'Una psicóloga revisa tu perfil y te asigna el cuarto indicado' },
  { n: 4, title: 'Liberas',             desc: 'Vives la experiencia en un entorno seguro y acompañado' },
  { n: 5, title: 'Sales en equilibrio', desc: 'Con herramientas para sostener tu bienestar en el día a día' },
]

export default function Proceso() {
  return (
    <section id="proceso">
      <div className="container">
        <p className="overline">¿Cómo funciona?</p>
        <h2 className="section-title">
          Diagnóstico. Acción. <em>Equilibrio.</em>
        </h2>

        <div className="steps-wrapper">
          {steps.map(s => (
            <div className="step" key={s.n}>
              <div className="step-circle">{s.n}</div>
              <p className="step-title">{s.title}</p>
              <p className="step-desc">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}