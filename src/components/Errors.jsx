const Errors = ({ error }) => {
  return (
    <div className="text-red-500">
      <span className="text-xs">{error}</span>
    </div>
  )
}
export default Errors