export default function Hero() {
  return (
    <section className="hero" id="inicio">
      <div className="orb orb-1" />
      <div className="orb orb-2" />

      <div className="hero-badge">
        Centro de Catarsis y Bienestar · Sincelejo, Sucre
      </div>

      <h1>
        CUARTO<br />DE LA <em>IRA</em>
      </h1>

      <p className="hero-sub">
        Un espacio seguro donde tus emociones encuentran su canal.
        Diagnóstico. Acción. Liberación.
      </p>

      <div className="hero-buttons">
        <a href="#cuartos" className="btn btn-primary">Explorar espacios</a>
        <a href="#proceso" className="btn btn-outline">¿Cómo funciona?</a>
      </div>

      <div className="scroll-indicator">Scroll</div>
    </section>
  )
}