import { useState } from 'react'

export default function Home() {
  const [phone, setPhone] = useState('')
  const [status, setStatus] = useState('')

  async function callMe() {
    setStatus('Sending...')
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + '/api/call', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber: phone })
      })
      const j = await res.json()
      if (res.ok) setStatus('Call initiated — ' + (j.message || 'ok'))
      else setStatus('Error: ' + (j.error || JSON.stringify(j)) )
    } catch (e) {
      setStatus('Network error: ' + e.message + '  ---  ' + process.env.NEXT_PUBLIC_BACKEND_URL + '/api/call')
    }
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
      <div style={{ width: 420, padding: 24, border: '1px solid #eee', borderRadius: 8 }}>
        <h2>Call me</h2>
        <p>Enter phone number (E.164 preferred, e.g. +12025550123)</p>
        <input value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1234567890" style={{ width: '100%', padding: 8, fontSize: 16 }} />
        <button onClick={callMe} style={{ marginTop: 12, width: '100%', padding: 10, fontSize: 16 }}>Call me</button>
        <div style={{ marginTop: 12, color: '#333' }}>{status}</div>
      </div>
    </div>
  )
}