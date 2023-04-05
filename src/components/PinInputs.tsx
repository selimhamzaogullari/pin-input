import { ChangeEvent, useEffect, useRef } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

interface PropsData {
  pin: Array<number | undefined>,
  onPinChanged: (pinEntry: number | undefined, index: number) => void,
  pasteCopiedText: (arr: number[]) => void
  pinLength: number
}

const PinInputs = ({pin, onPinChanged, pinLength, pasteCopiedText}: PropsData) => {

  const secretMode = useSelector((state: RootState) => state.setting.secretMode)

  const inputRefs = useRef<HTMLInputElement[]>([])

  const changePinFocus = (pinIndex: number) => {
    const ref = inputRefs.current[pinIndex] // current input ref
    if(ref) ref.focus()
  }

  const changeInput = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value
    const pinNumber = Number(value.trim())
    if(isNaN(pinNumber) || value.length === 0) return // It is not number 
    if(pinNumber >= 0 && pinNumber <= 9) { // between 0-9, pin change and focus next input
      onPinChanged(pinNumber, index)
      if(index < pinLength - 1) changePinFocus(index + 1)
    }
  }

  const keyDownInput = async (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    // Control ctrl+v
    let key = e.which || e.keyCode;
    let ctrl = e.ctrlKey ? e.ctrlKey : ((key === 17) ? true : false);
    if (key == 86 && ctrl) {
      const text = await navigator.clipboard.readText();
      const copiedText = Number(text.trim())
      if(!isNaN(copiedText) && text.length === pinLength) {
        const newVal = text.split("").map(t => parseInt(t))
        pasteCopiedText(newVal)
      }
    }

    // Control Backspace
    const keyboardKeyCode = e.nativeEvent.code
    if(keyboardKeyCode !== 'Backspace') return  // The code is not backspace
    if(pin[index] === undefined) changePinFocus(index - 1) // Focus previous input
    else onPinChanged(undefined, index) // pin change
  }

  useEffect(() => {
    changePinFocus(0)
  }, [])

  return (
    <div>
      {
        Array.from({length: pinLength}, (_, index) => (
          <input ref={el => {
            if(el) inputRefs.current[index] = el
          }}
          type={secretMode ? 'password' : 'text'}
          key={index} 
          onChange={e => changeInput(e, index)}
          onKeyDown={e => keyDownInput(e, index)}
          value={(pin[index] || pin[index] === 0) ? pin[index] : ''} />
        ))
      }
   </div>
  )
}

export default PinInputs