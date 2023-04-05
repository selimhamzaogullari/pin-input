import { useEffect, useState } from 'react'
import './assets/styles/app.css'
import { useDispatch } from 'react-redux'
import PinInputs from './components/PinInputs'
import Setting from './components/Setting'
import { useSelector } from 'react-redux'
import { RootState } from './store/store'
import service from './services/validate-service'
import SettingSvg from '/setting.svg'
import { changeTheme } from './store/settingSlice'

function App() {

  const pinLength = useSelector((state: RootState) => state.setting.pinLength)
  const darkMode = useSelector((state: RootState) => state.setting.darkMode)
  const dispatch = useDispatch()

  const [pin, setPin] = useState<Array<number | undefined>>(new Array(pinLength))
  const [showModal, setShowModal] = useState(false)
  const [message, setMessage] = useState('')

  const onPinChanged = (pinEntry: number | undefined, index: number) => { // Save pin
    const newPin = [...pin]
    newPin[index] = pinEntry
    setPin(newPin)
  }

  const validate = async () => {
    const validate = await service.checkValidate()
    setMessage(validate ? 'correct' : 'wrong')
    setTimeout(() => {
      setMessage('')
    }, 2000)
  }

  useEffect(() => { // check change pinLength
    setPin(new Array(pinLength))
  }, [pinLength])

  useEffect(() => { // check change darkMode
    const classList = document.getElementsByTagName('body')[0].classList
    classList.add('dark')
    if (darkMode) {
      classList.remove('light')
      !classList.contains('dark') && classList.add('dark')
    }
    else {
      classList.remove('dark')
      !classList.contains('light') && classList.add('light')
    }
  }, [darkMode])


  useEffect(() => { // Arrange Theme
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      dispatch(changeTheme(true))
    } else dispatch(changeTheme(false))
  }, [])

  return (
    <div className="App">
      <PinInputs onPinChanged={onPinChanged} pasteCopiedText={arr => setPin([...arr])} pin={pin} pinLength={pinLength} />
      <button className="validate" onClick={validate} disabled={pin.includes(undefined)}>Validate</button>
      <Setting show={showModal} position="center" closeModal={() => setShowModal(false)} />
      <div className={`message ${message === 'correct' ? 'correct' : 'wrong'}`}>
        {(message && message !== '') && (message === 'correct' ? 'The pin is correct.' : 'The pin is wrong.')}
      </div>
      <div className="setting-icon">
        <img className="" src={SettingSvg} alt="Your SVG" onClick={() => setShowModal(true)} />
      </div>
    </div>
  )
}

export default App
