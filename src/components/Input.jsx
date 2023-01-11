const Input = ({ labelName, htmlFor, type, idInput, name }) => {
  return (
    <div className="grid grid-cols-5 gap-4 items-center">
      <label htmlFor={htmlFor}>{labelName}</label>
      {type === 'textarea' ? <textarea placeholder="" id={idInput} name={name} className="border border-green-700 col-span-2 outline-none px-3 py-1" /> : <input type={type} placeholder="" id={idInput} name={name} className="border border-green-700 col-span-2 outline-none px-3 py-1" />}
    </div>
  )
}
export default Input