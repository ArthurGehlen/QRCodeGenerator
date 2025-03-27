import { useState } from 'react'
import './App.css'

const api_token = import.meta.env.VITE_API_TOKEN

function App() {
  const [qrCodeText, setQrCodeText] = useState('')
  const [qrCodeColor, setQrCodeColor] = useState('000000')
  const [qrCodeLabel, setQrCodeLabel] = useState('')
  const [qrCodeImage, setQrCodeImage] = useState('')

  const download = () => {
    if (qrCodeImage) {
      const link = document.createElement("a")
      link.href = qrCodeImage
      link.download = 'qrcode.png'
      link.click()
    }
  }

  const handle_submit = (e) => {
    e.preventDefault()

    fetch(`https://api.invertexto.com/v1/qrcode?token=${api_token}&text=${qrCodeText}&scale=10&foreground=%23${qrCodeColor}&label=${qrCodeLabel}`)
      .then((resp) => resp.blob())
      .then((data) => {
        const imageUrl = URL.createObjectURL(data)
        setQrCodeImage(imageUrl)
      })
      .catch((err) => console.error(err))
  };

  return (
    <>
      <main>
        <h1>
          <span className="qrcode">QRCode</span>
          <span className="generator">Generator</span>
        </h1>

        <div className="mid_page">
          <form onSubmit={handle_submit}>
            <input
              type="text"
              placeholder="Texto que será armazenado no QR Code"
              onChange={(e) => setQrCodeText(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Cor do QR Code em hexadecimal. Exemplo:000000 (opcional)"
              maxLength="6"
              pattern="[A-Fa-f0-9]{3}{1,2}"
              onChange={(e) => setQrCodeColor(e.target.value)}
            />
            <input
              type="text"
              onChange={(e) => setQrCodeLabel(e.target.value)}
              placeholder="Legenda embaixo do QR Code. (opcional)"
            />
            <section className="buttons">
              <button type="button" onClick={download}>
                Download
              </button>
              <input type="submit" value="Gerar QRCode" />
            </section>
          </form>

          <div className="qrcode_area">
            {qrCodeImage && <img src={qrCodeImage} alt="QR Code" />}
          </div>
        </div>
      </main>
    </>
  )
}

export default App
