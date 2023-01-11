const Button = ({ btnName, onClick, type, disabled }) => {
  return (
    <button type={type} onClick={onClick} disabled={disabled ?? false} className="bg-blue-700 rounded-lg px-4 py-2 text-white text-sm capitalize hover:opacity-80 disabled:opacity-70">{btnName}</button>
  )
}

export default Button