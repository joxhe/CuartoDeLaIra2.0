import { useState } from 'react'

const initialForm = { name: '', email: '', message: '' }

export default function Contacto() {
  const [form, setForm]       = useState(initialForm)
  const [status, setStatus]   = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const [errMsg, setErrMsg]   = useState('')

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')
    setErrMsg('')

    try {
      // ── Aquí conectarás tu API Route (Next.js) o servicio de email ──
      // Por ahora simula un delay de 1.2s y éxito
      await new Promise(r => setTimeout(r, 1200))

      // Cuando tengas el endpoint listo, reemplazá el bloque de arriba por:
      // const res = await fetch('/api/send', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(form),
      // })
      // if (!res.ok) throw new Error('Error al enviar')

      setStatus('success')
      setForm(initialForm)
    } catch (err) {
      setStatus('error')
      setErrMsg('Hubo un problema al enviar. Intentá de nuevo.')
    }
  }

  return (
    <section id="contacto">
      <div className="container">
        <div className="contact-box">
          <p className="overline">Contacto</p>
          <h2 className="section-title">
            ¿Querés saber <em>más?</em>
          </h2>
          <p className="section-lead" style={{ margin: '0 auto 0.5rem' }}>
            Dejanos tu mensaje y te contactamos.
          </p>

          {status === 'success' ? (
            <div className="form-success">
              ✦ ¡Mensaje recibido! Te responderemos a <strong>{form.email || 'tu correo'}</strong> pronto.
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Tu nombre"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="Tu correo"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <textarea
                name="message"
                className="form-textarea"
                placeholder="Tu mensaje..."
                value={form.message}
                onChange={handleChange}
                required
              />

              {errMsg && <p className="form-error">{errMsg}</p>}

              <button
                type="submit"
                className="btn btn-primary"
                style={{ alignSelf: 'center', padding: '14px 48px' }}
                disabled={status === 'loading'}
              >
                {status === 'loading' ? 'Enviando...' : 'Enviar mensaje'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}