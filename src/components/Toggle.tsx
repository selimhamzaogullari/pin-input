import '../assets/styles/toggle.css'

interface ToggleProps {
  checked?: boolean;
  onChange: () => void
}

const Toggle = ({checked = false, onChange}: ToggleProps) => {
  return (
      <label className="switch">
        <input type="checkbox" checked={checked} onChange={onChange}/>
        <span className="slider round"></span>
      </label>
  )
}

export default Toggle