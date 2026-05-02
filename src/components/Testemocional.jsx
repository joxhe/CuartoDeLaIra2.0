import { useState, useEffect } from 'react'

export default function TestEmocional() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [open])

  const handleBackdrop = (e) => {
    if (e.target === e.currentTarget) setOpen(false)
  }

  return (
    <>
      <section id="test">
        <div className="container">
          <p className="overline">Test emocional</p>
          <h2 className="section-title">
            ¿Cómo te <em>sientes hoy?</em>
          </h2>
          <p className="section-lead">
            Responde este test honestamente. Nuestras psicólogas revisarán
            tus respuestas y te indicarán qué espacio es el más adecuado
            para ti en este momento.
          </p>

          <div className="test-card">
            <div className="test-card-left">
              <p className="test-card-title">Evaluación emocional personalizada</p>
              <p className="test-card-meta">15 preguntas · 5 minutos · Revisado por una psicóloga</p>
              <ul className="test-steps">
                <li>
                  <span className="test-step-num">1</span>
                  Completa el formulario con tus datos y respuestas
                </li>
                <li>
                  <span className="test-step-num">2</span>
                  Nuestras psicólogas analizan tu perfil emocional
                </li>
                <li>
                  <span className="test-step-num">3</span>
                  Te contactamos para asignarte tu cuarto y agendar tu sesión
                </li>
              </ul>
            </div>
            <button className="btn btn-primary test-card-btn" onClick={() => setOpen(true)}>
              Hacer el test
            </button>
          </div>

          <div className="test-notice">
            <strong>¿Por qué lo hacemos así?</strong><br />
            Cada persona es diferente. La asignación la hace una profesional
            de la salud mental, no un algoritmo, para que tu experiencia
            sea realmente la que necesitas.
          </div>
        </div>
      </section>

      {open && (
        <div className="test-modal" onClick={handleBackdrop}>
          <div className="test-modal-content">
            <div className="test-modal-header">
              <div>
                <span className="modal-tag">Test emocional</span>
                <h3 className="test-modal-title">Cuarto de la Ira · CECAR</h3>
              </div>
              <button className="modal-close" onClick={() => setOpen(false)}>✕</button>
            </div>
            <div className="test-modal-body">
              <iframe
                src="https://docs.google.com/forms/d/e/1FAIpQLSdhujUdVcr2zKObeNPKKePqcTgpChQlJy_BT7rFy2k8jNRIYA/viewform?embedded=true"
                title="Test emocional — Cuarto de la Ira"
                width="100%"
                height="100%"
                frameBorder="0"
                loading="lazy"
              >
                Cargando formulario...
              </iframe>
            </div>
          </div>
        </div>
      )}
    </>
  )
}