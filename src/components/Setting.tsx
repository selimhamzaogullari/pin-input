import Toggle from "./Toggle"
import '../assets/styles/setting.css'
import { useDispatch } from "react-redux"
import { changePinLength, changeSecretMode, changeTheme } from "../store/settingSlice"
import { useSelector } from "react-redux"
import { RootState } from "../store/store"

interface SettingProps {
  show?: boolean,
  position?: "center" | "left" | "right" ,
  closeModal: () => void
}

const Setting = ({show = false, position = "center", closeModal}: SettingProps) => {

  const secretMode = useSelector((state: RootState) => state.setting.secretMode)
  const darkMode = useSelector((state: RootState) => state.setting.darkMode)
  const dispatch = useDispatch()

  const toggleSecretMode = () => {
    dispatch(changeSecretMode(!secretMode))
  }

  const changePinInputLength = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changePinLength(parseInt(e.target.value)))
  }

  const toggleDarkMode = () => {
    dispatch(changeTheme(!darkMode))
  }

  return (
    <div className={`vulture-modal-bg ${show && 'show'}`}>
      <div className={`vulture-modal ${show && 'show'}`} data-position={`${position}`}>
        <div className="vulture-modal-header">
          <span className="vulture-header-text">Preferences</span>
          <button className="vulture-close" onClick={closeModal}></button>
        </div>
        <div className="vulture-modal-content">

          <div className="setting">
            <div>Pin Input Length</div>
            <input type="number" defaultValue="4" 
            onChange={e => changePinInputLength(e)}
            max={8} min={2}/>
          </div> 

          <div className="setting">
            <div>Secret Mode</div>
            <Toggle onChange={toggleSecretMode} checked={secretMode}/>
          </div> 

          <div className="setting">
            <div>Dark Mode</div>
            <Toggle onChange={toggleDarkMode} checked={darkMode}/>
          </div> 

        </div>
        <div className="vulture-modal-footer"></div>
      </div>
    </div>
  )
}

export default Setting