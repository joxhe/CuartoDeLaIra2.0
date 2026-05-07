import { useState, useEffect } from 'react'

// ── CONFIG ──────────────────────────────────────────────────────────────────
const SHEET_ID  = '1bPADaT75s-GOWfIGXRCwUIRgmKykQ6bRIcmdyQgU-Zw'
const GID       = '1344338911'
const SHEET_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:csv&gid=${GID}`

const EMAILJS_SERVICE  = 'service_quft1yl'
const EMAILJS_TEMPLATE = 'template_utcb8ar'
const EMAILJS_KEY      = 'zLElrrHRRJo0UgOPN'

// ── SCORE MAP ────────────────────────────────────────────────────────────────
const SCORE_MAP = { 'Nunca': 1, 'A veces': 2, 'Frecuentemente': 3, 'Casi siempre': 4 }

// Índices de columnas (0-based) en el CSV
// Marca temporal=0, Puntuación=1, Nombre=2, Edad=3, Documento=4 (pero en sheet es col 12 segun headers)
// Q1-Q5 = ira (cols 4-8 aprox), Q6-Q10 = bienestar (cols 9-13), Q11-Q15 = estres (cols 14-18)
// Ajustamos según los encabezados reales:
// 0:Marca temporal, 1:Puntuación, 2:Nombre y apellido, 3:Edad, 4:Q1-ira, 5:Q2-ira,
// 6:Q3-ira, 7:Q4-ira, 8:Q5-ira, 9:Q6-bien, 10:Q7-bien, 11:Q8-bien, 12:Q9-bien,
// 13:Q10-bien, 14:Documento, 15:Q11-estres, 16:Q12-estres, 17:Q13-estres,
// 18:Q14-estres, 19:Q15-estres, 20:Email, 21:Col14, 22:Col15

const COL = {
  timestamp: 0, score: 1, name: 2, age: 3,
  ira:  [4,5,6,7,8],
  bien: [9,10,11,12,13],
  doc:  14,
  estres: [15,16,17,18,19],
  email: 20,
}

const IRA_LABELS = [
  'Ganas de gritar', 'Molestia con otros',
  'Cuesta calmarse', 'Tensión corporal', 'Irritación fácil',
]
const BIEN_LABELS = [
  'Energía diaria', 'Capaz de enfrentar', 'Duerme bien',
  'Equilibrio emocional', 'Disfruta actividades',
]
const ESTRES_LABELS = [
  'Cuesta concentrarse', 'Irritabilidad', 'Cuesta relajarse',
  'Abrumado/a', 'Preocupación constante',
]

const ROOMS = [
  { id: 'ira',          label: 'Cuarto de Ira',          color: '#C0392B', icon: '🔥' },
  { id: 'estres',       label: 'Cuarto de Estrés',        color: '#B06818', icon: '⚡' },
  { id: 'estimulacion', label: 'Cuarto de Estimulación',  color: '#5A5A8A', icon: '✨' },
]

// ── CSV PARSER ───────────────────────────────────────────────────────────────
function parseCSV(text) {
  const lines = text.trim().split('\n')
  return lines.slice(1).map(line => {
    const cols = []
    let cur = '', inQ = false
    for (let i = 0; i < line.length; i++) {
      const c = line[i]
      if (c === '"') { inQ = !inQ }
      else if (c === ',' && !inQ) { cols.push(cur.trim()); cur = '' }
      else cur += c
    }
    cols.push(cur.trim())
    return cols
  }).filter(r => r[COL.name] && r[COL.name] !== '')
}

function scoreRow(row) {
  const calc = (idxs) => {
    const vals = idxs.map(i => SCORE_MAP[row[i]] ?? 0)
    const sum  = vals.reduce((a,b) => a+b, 0)
    return { vals, sum, pct: Math.round((sum / (idxs.length * 4)) * 100) }
  }
  return {
    ira:   calc(COL.ira),
    bien:  calc(COL.bien),
    estres: calc(COL.estres),
  }
}

function suggestRoom(scores) {
  const iraScore   = scores.ira.pct
  const estresScore = scores.estres.pct
  const bienScore  = scores.bien.pct

  if (iraScore >= estresScore && iraScore >= (100 - bienScore)) return 'ira'
  if (estresScore >= iraScore && estresScore >= (100 - bienScore)) return 'estres'
  return 'estimulacion'
}

// ── MINI BAR ─────────────────────────────────────────────────────────────────
function Bar({ pct, color }) {
  return (
    <div style={{ background: 'rgba(0,0,0,0.08)', borderRadius: 6, height: 8, overflow: 'hidden' }}>
      <div style={{
        width: `${pct}%`, height: '100%', background: color,
        borderRadius: 6, transition: 'width 0.8s cubic-bezier(.4,0,.2,1)',
      }} />
    </div>
  )
}

// ── QUESTION ROW ─────────────────────────────────────────────────────────────
function QRow({ label, answer, color }) {
  const val = SCORE_MAP[answer] ?? 0
  const pct = (val / 4) * 100
  return (
    <div style={{ marginBottom: '0.7rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
        <span style={{ fontSize: 12, color: '#666', maxWidth: '70%' }}>{label}</span>
        <span style={{
          fontSize: 11, fontWeight: 700, color,
          background: color + '18', padding: '2px 8px', borderRadius: 20,
        }}>{answer || '—'}</span>
      </div>
      <Bar pct={pct} color={color} />
    </div>
  )
}

// ── DIMENSION CARD ────────────────────────────────────────────────────────────
function DimCard({ title, score, color, labels, answers, icon }) {
  return (
    <div style={{
      background: '#fff', border: `1px solid ${color}30`,
      borderRadius: 16, padding: '1.4rem', flex: 1, minWidth: 200,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '0.8rem' }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, color, textTransform: 'uppercase', letterSpacing: 1 }}>{title}</p>
          <p style={{ fontSize: 22, fontWeight: 900, color, lineHeight: 1 }}>{score.pct}%</p>
        </div>
      </div>
      <Bar pct={score.pct} color={color} />
      <div style={{ marginTop: '1rem' }}>
        {labels.map((l, i) => (
          <QRow key={i} label={l} answer={answers[i]} color={color} />
        ))}
      </div>
    </div>
  )
}

// ── USER DETAIL MODAL ─────────────────────────────────────────────────────────
function UserModal({ user, onClose, onAssign }) {
  const [selected, setSelected] = useState(null)
  const [mensaje,  setMensaje]  = useState('')
  const [sending,  setSending]  = useState(false)
  const [sent,     setSent]     = useState(false)
  const [error,    setError]    = useState('')

  const scores  = scoreRow(user.row)
  const suggest = suggestRoom(scores)

  const handleAssign = async () => {
    if (!selected) return setError('Seleccioná un cuarto primero.')
    if (!user.email) return setError('Este usuario no registró correo.')
    setSending(true); setError('')
    try {
      const room = ROOMS.find(r => r.id === selected)
      const bodyObj = {
        service_id:  EMAILJS_SERVICE,
        template_id: EMAILJS_TEMPLATE,
        user_id:     EMAILJS_KEY,
        template_params: {
          to_email:  user.email.trim(),
          to_name:   user.name.trim(),
          cuarto:    room.label,
          mensaje:   mensaje || `Según tu evaluación emocional, te hemos asignado el ${room.label}. ¡Te esperamos!`,
          email:     user.email.trim(),
          name:      user.name.trim(),
        }
      }
      console.log('=== DEBUG ===', JSON.stringify(bodyObj))
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bodyObj)
      })
      const resText = await res.text()
      console.log('Respuesta EmailJS:', res.status, resText)
      if (!res.ok) throw new Error(resText)
      setSent(true)
      onAssign(user.id, selected)
    } catch (e) {
      setError(`Error: ${e.message}`)
    } finally {
      setSending(false)
    }
  }

  return (
    <div onClick={e => e.target === e.currentTarget && onClose()}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'rgba(20,10,5,0.7)', backdropFilter: 'blur(8px)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem',
      }}>
      <div style={{
        background: '#FAF8F5', borderRadius: 24, width: '100%', maxWidth: 860,
        maxHeight: '92vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
        boxShadow: '0 40px 80px rgba(0,0,0,0.3)',
      }}>
        {/* Header */}
        <div style={{
          padding: '1.5rem 2rem', borderBottom: '1px solid rgba(0,0,0,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          background: '#fff', flexShrink: 0,
        }}>
          <div>
            <p style={{ fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: '#C0392B', fontWeight: 600 }}>
              Evaluación emocional
            </p>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.6rem', color: '#2C1810', margin: 0 }}>
              {user.name}
            </h2>
            <p style={{ fontSize: 13, color: '#888', marginTop: 2 }}>
              {user.age && `${user.age} años · `}{user.email || 'Sin correo registrado'} · {user.timestamp}
            </p>
          </div>
          <button onClick={onClose} style={{
            background: 'none', border: 'none', fontSize: 22, cursor: 'pointer', color: '#999',
          }}>✕</button>
        </div>

        {/* Body */}
        <div style={{ overflowY: 'auto', padding: '1.5rem 2rem', flex: 1 }}>

          {/* Dimensiones */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <DimCard
              title="Ira" icon="🔥" color="#C0392B" score={scores.ira}
              labels={IRA_LABELS} answers={COL.ira.map(i => user.row[i])}
            />
            <DimCard
              title="Estrés" icon="⚡" color="#B06818" score={scores.estres}
              labels={ESTRES_LABELS} answers={COL.estres.map(i => user.row[i])}
            />
            <DimCard
              title="Bienestar" icon="🌿" color="#3A7D5A" score={scores.bien}
              labels={BIEN_LABELS} answers={COL.bien.map(i => user.row[i])}
            />
          </div>

          {/* Sugerencia */}
          <div style={{
            background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
            borderRadius: 16, padding: '1.2rem 1.5rem', marginBottom: '1.5rem',
            display: 'flex', alignItems: 'center', gap: '1rem',
          }}>
            <span style={{ fontSize: 28 }}>🧠</span>
            <div>
              <p style={{ fontSize: 12, color: '#888', marginBottom: 2 }}>Sugerencia del sistema</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: '#2C1810' }}>
                {ROOMS.find(r => r.id === suggest)?.icon} {ROOMS.find(r => r.id === suggest)?.label}
              </p>
              <p style={{ fontSize: 12, color: '#aaa' }}>
                Basado en los scores — la decisión final es tuya
              </p>
            </div>
          </div>

          {/* Asignación */}
          {sent ? (
            <div style={{
              background: '#f0faf5', border: '1px solid #3A7D5A50',
              borderRadius: 16, padding: '1.5rem', textAlign: 'center',
            }}>
              <p style={{ fontSize: 28, marginBottom: 8 }}>✅</p>
              <p style={{ fontWeight: 700, color: '#3A7D5A', fontSize: 16 }}>
                ¡Correo enviado exitosamente!
              </p>
              <p style={{ color: '#666', fontSize: 14, marginTop: 4 }}>
                Se notificó a <strong>{user.email}</strong> sobre su asignación al {ROOMS.find(r => r.id === selected)?.label}
              </p>
            </div>
          ) : (
            <div style={{
              background: '#fff', border: '1px solid rgba(0,0,0,0.08)',
              borderRadius: 16, padding: '1.5rem',
            }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: '#2C1810', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: 1 }}>
                Asignar cuarto
              </p>

              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                {ROOMS.map(r => (
                  <button key={r.id} onClick={() => setSelected(r.id)} style={{
                    padding: '10px 20px', borderRadius: 30, border: `2px solid ${r.color}`,
                    background: selected === r.id ? r.color : 'transparent',
                    color: selected === r.id ? '#fff' : r.color,
                    fontWeight: 600, fontSize: 14, cursor: 'pointer',
                    transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: 6,
                  }}>
                    {r.icon} {r.label}
                  </button>
                ))}
              </div>

              <textarea
                value={mensaje}
                onChange={e => setMensaje(e.target.value)}
                placeholder="Mensaje personalizado para el usuario (opcional)..."
                style={{
                  width: '100%', minHeight: 80, padding: '10px 14px',
                  border: '1.5px solid rgba(0,0,0,0.12)', borderRadius: 12,
                  fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: '#2C1810',
                  resize: 'vertical', outline: 'none', background: '#FAF8F5',
                  boxSizing: 'border-box',
                }}
              />

              {error && (
                <p style={{ color: '#C0392B', fontSize: 13, marginTop: 8 }}>{error}</p>
              )}

              <button
                onClick={handleAssign}
                disabled={sending || !selected}
                style={{
                  marginTop: '1rem', padding: '12px 36px',
                  background: selected ? ROOMS.find(r=>r.id===selected)?.color : '#ccc',
                  color: '#fff', border: 'none', borderRadius: 30,
                  fontWeight: 700, fontSize: 15, cursor: selected ? 'pointer' : 'not-allowed',
                  transition: 'all 0.2s',
                }}
              >
                {sending ? 'Enviando correo...' : '✉️ Asignar y notificar por correo'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ── MAIN PANEL ────────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [users,      setUsers]      = useState([])
  const [loading,    setLoading]    = useState(true)
  const [error,      setError]      = useState('')
  const [selected,   setSelected]   = useState(null)
  const [assigned,   setAssigned]   = useState({}) // { userId: roomId }
  const [filter,     setFilter]     = useState('todos')
  const [search,     setSearch]     = useState('')

  useEffect(() => {
    fetchSheet()
  }, [])

  const fetchSheet = async () => {
    setLoading(true); setError('')
    try {
      const res  = await fetch(SHEET_URL)
      if (!res.ok) throw new Error('No se pudo acceder al Sheet')
      const text = await res.text()
      const rows = parseCSV(text)
      const parsed = rows.map((row, i) => ({
        id:        i,
        row,
        name:      row[COL.name]  || 'Sin nombre',
        age:       row[COL.age]   || '',
        email:     row[COL.email] || '',
        doc:       row[COL.doc]   || '',
        timestamp: row[COL.timestamp] || '',
        scores:    scoreRow(row),
      }))
      setUsers(parsed)
    } catch (e) {
      setError('Error al cargar el Sheet. Verificá que esté compartido como público (solo lectura).')
    } finally {
      setLoading(false)
    }
  }

  const handleAssign = (userId, roomId) => {
    setAssigned(prev => ({ ...prev, [userId]: roomId }))
  }

  const filtered = users.filter(u => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                        u.email.toLowerCase().includes(search.toLowerCase()) ||
                        u.doc.toLowerCase().includes(search.toLowerCase())
    if (filter === 'asignados')    return matchSearch && assigned[u.id]
    if (filter === 'pendientes')   return matchSearch && !assigned[u.id]
    return matchSearch
  })

  const totalAssigned = Object.keys(assigned).length
  const totalPending  = users.length - totalAssigned

  // Distribución por cuarto asignado
  const dist = ROOMS.map(r => ({
    ...r,
    count: Object.values(assigned).filter(v => v === r.id).length,
  }))

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'DM Sans', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-thumb { background: rgba(192,57,43,0.3); border-radius: 10px; }
      `}</style>

      <div style={{
        minHeight: '100vh', background: '#F5F0EB',
        fontFamily: "'DM Sans', sans-serif",
      }}>

        {/* ── SIDEBAR ── */}
        <div style={{
          position: 'fixed', top: 0, left: 0, bottom: 0, width: 260,
          background: '#2C1810', display: 'flex', flexDirection: 'column',
          padding: '2rem 1.5rem', zIndex: 100,
        }}>
          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ color: '#C0392B', fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', fontWeight: 700 }}>
              Panel clínico
            </p>
            <h1 style={{
              fontFamily: "'Playfair Display', serif", color: '#FAF8F5',
              fontSize: '1.6rem', fontWeight: 900, lineHeight: 1.1, marginTop: 6,
            }}>
              CUARTO<span style={{ color: '#C0392B' }}>.</span>ira
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12, marginTop: 4 }}>
              Gestión de asignaciones
            </p>
          </div>

          {/* Stats sidebar */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
            {[
              { label: 'Total respuestas', val: users.length, color: '#FAF8F5' },
              { label: 'Asignados',         val: totalAssigned, color: '#3A7D5A' },
              { label: 'Pendientes',         val: totalPending,  color: '#C0392B' },
            ].map(s => (
              <div key={s.label} style={{
                background: 'rgba(255,255,255,0.05)', borderRadius: 12,
                padding: '0.9rem 1rem', border: '1px solid rgba(255,255,255,0.08)',
              }}>
                <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 11, marginBottom: 2 }}>{s.label}</p>
                <p style={{ color: s.color, fontSize: 24, fontWeight: 900, fontFamily: "'Playfair Display', serif" }}>
                  {s.val}
                </p>
              </div>
            ))}
          </div>

          {/* Distribución cuartos */}
          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11, letterSpacing: 2, textTransform: 'uppercase', marginBottom: '0.75rem' }}>
              Distribución
            </p>
            {dist.map(r => (
              <div key={r.id} style={{ marginBottom: '0.6rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12 }}>{r.icon} {r.label.replace('Cuarto de ', '')}</span>
                  <span style={{ color: r.color, fontSize: 12, fontWeight: 700 }}>{r.count}</span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 4, height: 4 }}>
                  <div style={{
                    width: totalAssigned ? `${(r.count/totalAssigned)*100}%` : '0%',
                    height: '100%', background: r.color, borderRadius: 4,
                    transition: 'width 0.6s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>

          <button onClick={fetchSheet} style={{
            marginTop: 'auto', padding: '10px', background: 'rgba(192,57,43,0.15)',
            border: '1px solid rgba(192,57,43,0.3)', borderRadius: 12,
            color: '#C0392B', fontWeight: 600, fontSize: 13, cursor: 'pointer',
          }}>
            ↻ Actualizar datos
          </button>
        </div>

        {/* ── MAIN CONTENT ── */}
        <div style={{ marginLeft: 260, padding: '2rem' }}>

          {/* Header */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{
              fontFamily: "'Playfair Display', serif", fontSize: '1.8rem',
              color: '#2C1810', fontWeight: 900,
            }}>
              Respuestas del formulario
            </h2>
            <p style={{ color: '#888', fontSize: 14, marginTop: 4 }}>
              Revisá los perfiles emocionales y asigná los cuartos correspondientes
            </p>
          </div>

          {/* Filtros y búsqueda */}
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Buscar por nombre, correo o documento..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{
                flex: 1, minWidth: 240, padding: '10px 16px',
                border: '1.5px solid rgba(44,24,16,0.12)', borderRadius: 30,
                fontFamily: "'DM Sans', sans-serif", fontSize: 14, outline: 'none',
                background: '#fff', color: '#2C1810',
              }}
            />
            {['todos', 'pendientes', 'asignados'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '9px 20px', borderRadius: 30, border: '1.5px solid',
                borderColor: filter === f ? '#C0392B' : 'rgba(44,24,16,0.15)',
                background:  filter === f ? '#C0392B' : '#fff',
                color:       filter === f ? '#fff' : '#666',
                fontWeight: 500, fontSize: 13, cursor: 'pointer', textTransform: 'capitalize',
                transition: 'all 0.2s',
              }}>
                {f === 'todos' ? `Todos (${users.length})` :
                 f === 'pendientes' ? `Pendientes (${totalPending})` :
                 `Asignados (${totalAssigned})`}
              </button>
            ))}
          </div>

          {/* Estado */}
          {loading && (
            <div style={{ textAlign: 'center', padding: '4rem', color: '#888' }}>
              <p style={{ fontSize: 32, marginBottom: 12 }}>⏳</p>
              <p>Cargando respuestas...</p>
            </div>
          )}

          {error && (
            <div style={{
              background: '#FEF0EE', border: '1px solid #C0392B40',
              borderRadius: 16, padding: '1.5rem', color: '#C0392B', fontSize: 14,
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Lista de usuarios */}
          {!loading && !error && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {filtered.length === 0 && (
                <div style={{ textAlign: 'center', padding: '3rem', color: '#aaa' }}>
                  No hay resultados para esta búsqueda.
                </div>
              )}
              {filtered.map(user => {
                const assignedRoom = assigned[user.id]
                const room = ROOMS.find(r => r.id === assignedRoom)
                const suggest = suggestRoom(user.scores)
                const suggestRoom_ = ROOMS.find(r => r.id === suggest)

                return (
                  <div
                    key={user.id}
                    onClick={() => setSelected(user)}
                    style={{
                      background: '#fff',
                      border: `1.5px solid ${assignedRoom ? room.color + '40' : 'rgba(44,24,16,0.08)'}`,
                      borderRadius: 16, padding: '1.2rem 1.5rem',
                      display: 'flex', alignItems: 'center', gap: '1.2rem',
                      cursor: 'pointer', transition: 'all 0.2s',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    }}
                    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                  >
                    {/* Avatar */}
                    <div style={{
                      width: 44, height: 44, borderRadius: '50%', flexShrink: 0,
                      background: assignedRoom ? room.color : '#F0EBE5',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: assignedRoom ? 20 : 16, fontWeight: 700,
                      color: assignedRoom ? '#fff' : '#C0392B',
                    }}>
                      {assignedRoom ? room.icon : user.name.charAt(0).toUpperCase()}
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontWeight: 700, color: '#2C1810', fontSize: 15, marginBottom: 2 }}>
                        {user.name}
                        {user.age && <span style={{ fontWeight: 400, color: '#aaa', fontSize: 13 }}> · {user.age} años</span>}
                      </p>
                      <p style={{ fontSize: 12, color: '#aaa', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {user.email || 'Sin correo'} · {user.timestamp}
                      </p>
                    </div>

                    {/* Mini scores */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                      {[
                        { label: 'IRA',    val: user.scores.ira.pct,    color: '#C0392B' },
                        { label: 'ESTRÉS', val: user.scores.estres.pct, color: '#B06818' },
                        { label: 'BIEN.',  val: user.scores.bien.pct,   color: '#3A7D5A' },
                      ].map(s => (
                        <div key={s.label} style={{ textAlign: 'center', minWidth: 48 }}>
                          <p style={{ fontSize: 10, color: '#aaa', marginBottom: 2 }}>{s.label}</p>
                          <p style={{ fontSize: 15, fontWeight: 900, color: s.color }}>{s.val}%</p>
                        </div>
                      ))}
                    </div>

                    {/* Estado / Sugerencia */}
                    <div style={{ flexShrink: 0, textAlign: 'right', minWidth: 140 }}>
                      {assignedRoom ? (
                        <span style={{
                          background: room.color + '18', color: room.color,
                          padding: '5px 12px', borderRadius: 20, fontSize: 12, fontWeight: 700,
                        }}>
                          {room.icon} {room.label.replace('Cuarto de ', '')}
                        </span>
                      ) : (
                        <span style={{
                          background: 'rgba(44,24,16,0.05)', color: '#aaa',
                          padding: '5px 12px', borderRadius: 20, fontSize: 12,
                        }}>
                          Sugerido: {suggestRoom_?.icon} {suggestRoom_?.label.replace('Cuarto de ', '')}
                        </span>
                      )}
                    </div>

                    <span style={{ color: '#ccc', fontSize: 20, flexShrink: 0 }}>›</span>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <UserModal
          user={selected}
          onClose={() => setSelected(null)}
          onAssign={handleAssign}
        />
      )}
    </>
  )
}