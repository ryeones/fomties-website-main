const html = document.documentElement
const rm = html.classList.contains('rm')
const fine = html.classList.contains('fine')
const $ = (s) => document.querySelector(s)

const intro = $('#intro')
if (intro && !html.classList.contains('nointro')) {
  try { sessionStorage.setItem('intro', '1') } catch (e) {}
  const name = $('#iname'), tc = $('#itc')
  const from = name.dataset.from, to = name.dataset.to
  const keep = []
  let j = 0
  for (let i = 0; i < from.length && j < to.length; i++) if (from[i] === to[j]) { keep.push(i); j++ }
  name.textContent = ''
  ;[...from].forEach((ch, i) => {
    const b = document.createElement('b')
    b.textContent = ch
    b.className = keep.includes(i) ? 'keep' : (ch === ' ' ? 'sp' : 'drop-later')
    name.appendChild(b)
  })
  const tm = document.createElement('span'); tm.className = 'tm'; tm.textContent = '\u2122'; name.appendChild(tm)
  requestAnimationFrame(() => requestAnimationFrame(() => intro.classList.add('go')))
  const born = new Date(tc.dataset.born + 'T00:00:00+08:00')
  const thirty = new Date(born); thirty.setFullYear(born.getFullYear() + 30)
  const fmt = () => {
    const ms = thirty - Date.now()
    const d = Math.floor(ms / 864e5), h = Math.floor(ms % 864e5 / 36e5), m = Math.floor(ms % 36e5 / 6e4), sec = Math.floor(ms % 6e4 / 1e3)
    return d.toLocaleString() + ' days ' + String(h).padStart(2, '0') + ':' + String(m).padStart(2, '0') + ':' + String(sec).padStart(2, '0') + ' left of my twenties'
  }
  tc.textContent = fmt()
  const iv = setInterval(() => { tc.textContent = fmt() }, 1000)
  setTimeout(() => {
    intro.classList.add('morph')
    name.querySelectorAll('.drop-later').forEach((b) => b.classList.add('drop'))
  }, 1100)
  setTimeout(() => {
    clearInterval(iv)
    intro.classList.add('done')
    html.classList.add('ready')
    setTimeout(() => intro.remove(), 1000)
  }, 3000)
}

const clock = $('#clock')
if (clock) {
  const fmt = new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone: 'Asia/Singapore' })
  const tick = () => { clock.textContent = fmt.format(new Date()) }
  tick()
  setInterval(tick, 1000)
}

const rotate = (el, every) => {
  if (!el) return null
  const list = JSON.parse(el.dataset.list || '[]')
  if (list.length < 2) return null
  let i = 0, held = false
  el.textContent = list[0]
  const swap = () => {
    el.classList.add('out')
    setTimeout(() => {
      i = (i + 1) % list.length
      el.classList.remove('out')
      el.classList.add('pre')
      el.textContent = list[i]
      void el.offsetWidth
      el.classList.remove('pre')
    }, 340)
  }
  setInterval(() => { if (!held) swap() }, every)
  return {
    hold: () => { held = true },
    release: () => { held = false },
    spin: (ms) => { i = (i + 1) % list.length; el.textContent = list[i] }
  }
}
const placeRot = rotate($('#place'), 2800)
rotate($('#turn'), 3600)

const placeEl = $('.place')
if (placeEl && placeRot && !rm) {
  let iv = null
  placeEl.addEventListener('pointerenter', () => { placeRot.hold(); iv = setInterval(() => placeRot.spin(), 90) })
  placeEl.addEventListener('pointerleave', () => { clearInterval(iv); placeRot.release() })
}

const scramble = (el, pool) => {
  if (!el || rm) return
  const t = el.dataset.t
  let iv = null
  const rnd = () => pool[Math.floor(Math.random() * pool.length)]
  el.addEventListener('pointerenter', () => {
    el.classList.add('roll')
    iv = setInterval(() => { el.textContent = t.replace(/[a-z0-9]/g, rnd) }, 60)
  })
  el.addEventListener('pointerleave', () => {
    clearInterval(iv)
    let k = 0
    const chars = [...t]
    const step = () => {
      k++
      el.textContent = chars.map((c, i) => /[a-z0-9]/.test(c) && i > k * 2 ? rnd() : c).join('')
      if (k * 2 < chars.length) setTimeout(step, 28)
      else { el.textContent = t; el.classList.remove('roll') }
    }
    step()
  })
}
scramble($('#tag'), 'abcdefghijklmnopqrstuvwxyz')

const io = new IntersectionObserver((es) => {
  for (const e of es) if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target) }
}, { rootMargin: '0px', threshold: 0.05 })
document.querySelectorAll('.reveal').forEach((el) => io.observe(el))

const hint = $('#hint')
if (hint) {
  const onScroll = () => hint.classList.toggle('off', scrollY > 40)
  onScroll()
  addEventListener('scroll', onScroll, { passive: true })
}

const glow = $('#glow')
const photo = $('#photo')
const cur = $('#cur')
const curlbl = $('#curlbl')
if (fine && !rm) {
  let tx = 0, ty = 0, gx = 0, gy = 0, cx = 0, cy = 0, px = 0, py = 0, raf = 0
  const step = () => {
    gx += (tx - gx) * 0.05
    gy += (ty - gy) * 0.05
    glow.style.transform = `translate(calc(-50% + ${gx * 80}px), calc(-50% + ${gy * 60}px))`
    photo.style.translate = `${gx * -14}px ${gy * -10}px`
    cx += (px - cx) * 0.22
    cy += (py - cy) * 0.22
    cur.style.transform = `translate(${cx}px, ${cy}px)`
    raf = (Math.abs(tx - gx) > 0.002 || Math.abs(px - cx) > 0.2) ? requestAnimationFrame(step) : 0
  }
  addEventListener('pointermove', (e) => {
    px = e.clientX; py = e.clientY
    tx = e.clientX / innerWidth - 0.5
    ty = e.clientY / innerHeight - 0.5
    if (!raf) raf = requestAnimationFrame(step)
  }, { passive: true })
  addEventListener('pointerdown', () => cur.classList.add('down'))
  addEventListener('pointerup', () => cur.classList.remove('down'))
  document.addEventListener('mouseleave', () => { cur.style.opacity = '0' })
  document.addEventListener('mouseenter', () => { cur.style.opacity = '1' })
  document.querySelectorAll('a, button').forEach((el) => {
    el.addEventListener('pointerenter', () => { cur.classList.add('on'); curlbl.textContent = el.dataset.cur || el.getAttribute('aria-label') || '' ; blip(880, 0.02) })
    el.addEventListener('pointerleave', () => { cur.classList.remove('on'); curlbl.textContent = '' })
  })
}

const room = $('#room')
const hero = $('.hero')
if (room && hero && fine && !rm) {
  const list = JSON.parse(room.dataset.list || '[]')
  const keep = [...hero.children].filter((el) => el.id !== 'hint')
  const spot = (lane, j, n) => {
    const r = hero.getBoundingClientRect()
    const bs = keep.map((el) => el.getBoundingClientRect())
    const L = Math.min(...bs.map((b) => b.left)), R = Math.max(...bs.map((b) => b.right))
    const T = Math.min(...bs.map((b) => b.top)), B = Math.max(...bs.map((b) => b.bottom))
    const top = Math.max(80, r.top), bot = Math.min(r.bottom, innerHeight) - 70
    const f = (j + 0.5) / n
    if (lane === 0) return [40 + (L - 260) * (0.2 + 0.6 * Math.random()), top + (bot - top) * f]
    if (lane === 1) return [Math.min(innerWidth - 230, R + 40 + (innerWidth - R - 270) * (0.2 + 0.6 * Math.random())), top + (bot - top) * f]
    if (lane === 2) return [40 + (innerWidth - 260) * f, top + Math.max(10, T - top - 50) * Math.random()]
    return [40 + (innerWidth - 260) * f, B + 30 + Math.max(10, bot - B - 50) * Math.random()]
  }
  const lanes = [[], [], [], []]
  list.forEach((n, i) => lanes[i % 4].push(n))
  let mx = -1e4, my = -1e4
  const gs = []
  lanes.forEach((names, lane) => names.forEach((n, j) => {
    const d = document.createElement('div')
    d.className = 'gc' + (gs.length % 3 === 1 ? ' alt' : '')
    d.innerHTML = '<span class="bob"><i class="tally"></i><b>' + n + '</b></span>'
    const [x, y] = spot(lane, j, names.length)
    d.style.setProperty('--x', x + 'px')
    d.style.setProperty('--y', y + 'px')
    d.style.setProperty('--d', (200 + gs.length * 110) + 'ms')
    room.appendChild(d)
    gs.push({ d, hx: x, hy: y, x, y, lane, j, n: names.length })
  }))
  const place = () => gs.forEach((g) => { const [x, y] = spot(g.lane, g.j, g.n); g.hx = x; g.hy = y })
  let raf = 0
  const step = () => {
    let busy = false
    for (const g of gs) {
      const dx = g.hx + 40 - mx, dy = g.hy - my
      const dist = Math.hypot(dx, dy)
      let tx = g.hx, ty = g.hy, sc = 1
      if (dist < 36) { sc = 1.6 }
      else if (dist < 170) { const push = (170 - dist) / 170 * 70; tx += dx / dist * push; ty += dy / dist * push }
      g.x += (tx - g.x) * 0.12
      g.y += (ty - g.y) * 0.12
      g.s = (g.s || 1) + (sc - (g.s || 1)) * 0.18
      g.d.style.setProperty('--x', g.x + 'px')
      g.d.style.setProperty('--y', g.y + 'px')
      g.d.style.setProperty('--s', g.s.toFixed(3))
      if (Math.abs(tx - g.x) > 0.3 || Math.abs(ty - g.y) > 0.3 || Math.abs(sc - g.s) > 0.01) busy = true
    }
    raf = busy ? requestAnimationFrame(step) : 0
  }
  addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; if (!raf) raf = requestAnimationFrame(step) }, { passive: true })
  addEventListener('resize', () => { place(); if (!raf) raf = requestAnimationFrame(step) })
  const vis = () => room.classList.toggle('off', hero.getBoundingClientRect().bottom < 160)
  vis()
  addEventListener('scroll', vis, { passive: true })
}

let ac = null
let muted = false
try { muted = localStorage.getItem('mute') === '1' } catch (e) {}
const arm = () => { if (!ac) { try { ac = new (window.AudioContext || window.webkitAudioContext)() } catch (e) {} } ; if (ac && ac.state === 'suspended') ac.resume() }
addEventListener('pointerdown', arm, { once: true })
addEventListener('keydown', arm, { once: true })
function blip (freq = 660, vol = 0.04, len = 0.05) {
  if (!ac || muted || ac.state !== 'running') return
  const o = ac.createOscillator(), g = ac.createGain()
  o.type = 'sine'
  o.frequency.setValueAtTime(freq, ac.currentTime)
  o.frequency.exponentialRampToValueAtTime(freq * 0.6, ac.currentTime + len)
  g.gain.setValueAtTime(vol, ac.currentTime)
  g.gain.exponentialRampToValueAtTime(0.0001, ac.currentTime + len)
  o.connect(g).connect(ac.destination)
  o.start()
  o.stop(ac.currentTime + len)
}
document.querySelectorAll('.golink').forEach((b) => b.addEventListener('pointerdown', () => blip(440, 0.06, 0.08)))

scramble($('#coords'), '0123456789')

const toast = $('#toast')
const mail = $('#mail')
const copy = async () => {
  if (!mail) return
  try { await navigator.clipboard.writeText(mail.dataset.email) } catch (e) { return }
  blip(1200, 0.05, 0.1)
  toast.classList.add('on')
  clearTimeout(copy.t)
  copy.t = setTimeout(() => toast.classList.remove('on'), 1600)
}
mail?.addEventListener('click', copy)
addEventListener('keydown', (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey || document.activeElement?.tagName === 'INPUT') return
  if (e.key === 'c') copy()
  if (e.key === 'm') { muted = !muted; try { localStorage.setItem('mute', muted ? '1' : '0') } catch (err) {} ; if (!muted) blip(660) }
})

const track = document.getElementById('track')
if (track && !rm) {
  const x = () => new DOMMatrixReadOnly(getComputedStyle(track).transform).m41
  setTimeout(() => {
    if (x() !== 0) return
    track.style.animation = 'none'
    void track.offsetWidth
    track.style.animation = ''
    setTimeout(() => {
      if (x() !== 0) return
      const w = track.scrollWidth / 2 + 7
      const dur = parseFloat(getComputedStyle(track).animationDuration) * 1000 || 45000
      let t0 = performance.now()
      const run = (t) => { track.style.transform = `translate3d(${-(((t - t0) / dur) % 1) * w}px,0,0)`; requestAnimationFrame(run) }
      track.style.animation = 'none'
      requestAnimationFrame(run)
    }, 1200)
  }, 1500)
}
