const steps = [
  { n: 1, title: 'Llegás',           desc: 'Reservás tu sesión y te registrás en el centro' },
  { n: 2, title: 'Test emocional',   desc: 'Completás una evaluación psicométrica rápida' },
  { n: 3, title: 'Diagnóstico',      desc: 'El software te asigna el cuarto indicado' },
  { n: 4, title: 'Liberás',          desc: 'Vivís la experiencia en un entorno seguro' },
  { n: 5, title: 'Salís equilibrado',desc: 'Con herramientas para sostener tu bienestar' },
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