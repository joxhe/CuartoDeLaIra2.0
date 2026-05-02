import { useState, useEffect } from 'react'

const links = [
  { href: '#nosotros',   label: 'Quiénes somos' },
  { href: '#problema',   label: 'El problema' },
  { href: '#cuartos',    label: 'Los cuartos' },
  { href: '#proceso',    label: 'Proceso' },
  { href: '#impacto',    label: 'Impacto' },
  { href: '#test',       label: 'Test emocional' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen]         = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleLink = () => setOpen(false)

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="nav-logo">CUARTO<span>.</span>ira</div>

      <ul className={`nav-links ${open ? 'open' : ''}`}>
        {links.map(l => (
          <li key={l.href}>
            <a href={l.href} onClick={handleLink}>{l.label}</a>
          </li>
        ))}
        <li>
          <a href="#contacto" className="nav-cta" onClick={handleLink}>
            Contáctanos
          </a>
        </li>
      </ul>

      <button
        className={`burger ${open ? 'open' : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-label="Menú"
      >
        <span /><span /><span />
      </button>
    </nav>
  )
}