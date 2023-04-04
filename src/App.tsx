import { useState } from 'react'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from './store/settingSlice'
import { RootState } from './store/store'

function App() {

  const count = useSelector((state: RootState) => state.setting.value)
  const dispatch = useDispatch()

  const handleClick = () => {
    console.log('increment')
    dispatch(increment())
  }

  return (
    <div className="App">
      Empty Page {count}
      <button onClick={handleClick}>Increment</button>
    </div>
  )
}

export default App
