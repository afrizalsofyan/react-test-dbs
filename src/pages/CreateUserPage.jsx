import { Formik } from "formik"
import { useState } from "react"
import Button from "../components/Button"
import Input from "../components/Input"
import Layout from "../components/Layout"
import { fieldCreateUser, relationship, tableHeadName } from "../helpers/item"
import * as Yup from 'yup'
import Errors from "../components/Errors"
import { useDispatch } from "react-redux"
import { addUser } from "../redux/reducer/user"
import { useNavigate } from "react-router-dom"

const userScheme = Yup.object().shape({
  name: Yup.string().min(4, 'Name must be greater than 4 characters.').required('Field Name is required'),
  ektp: Yup.string().required('Field eKTP is required'),
  job: Yup.string().required('Field Job is required'),
  phone: Yup.string().length(12).required('Field phone is required'),
  birth: Yup.string().required('Field Date of Birth is required'),
  address: Yup.string().required('Field Address is required')
})

const CreateUserPage = () => {
  const dispatch = useDispatch()
  const router = useNavigate()
  const [countField, setCountField] = useState([])
  const [count, setCount] = useState(0)

  const onSaveData = (val) => {
    const dataFam = []
    for (let i = 0; i < count; i++) {
      const fam = {}
      Object.keys(val).map(e => {
        if (e.includes(i)) {
          let index = Object.keys(val).indexOf(e)
          let key = Object.keys(val)[index]
          let value = Object.values(val)[index]
          fam[key.split('-').slice(0, 2).join('')] = value
        }
      })
      dataFam.push(fam)
    }
    const payload = { name: val.name, ektp: val.ektp, address: val.address, job: val.job, birth: val.birth, phone: val.phone, dataFamily: dataFam }
    dispatch(addUser(payload))
    setTimeout(() => {
      router('/')
    }, 1000);
  }

  const famField = []
  for (let i = 1; i <= count; i++) {
    const famName = {}
    const famBirth = {}
    const famRelation = {}
    famName['family-name-' + i] = ''
    famBirth['family-birth-' + i] = ''
    famRelation['family-relation-' + i] = ''
    famField.push(famName, famBirth, famRelation)
  }
  const initialValues = { name: '', ektp: '', job: '', birth: '', phone: '', address: '' }
  const finalInitialValues = Object.assign(initialValues, ...famField)

  return (
    <Layout>
      <Formik initialValues={finalInitialValues} onSubmit={onSaveData} validationSchema={userScheme}>
        {({ handleSubmit, handleChange, isValid, errors }) => (
          <form className="" onSubmit={handleSubmit} onChange={handleChange}>
            <div className="mb-10">
              <div className="w-full flex justify-between">
                <span className="capitalize font-bold">Create new user</span>
              </div>
              <div className="grid grid-cols-2 gap-5 mt-7">
                {fieldCreateUser.map(e => (
                  <Input key={'key ' + e.idInput} labelName={e.labelName} htmlFor={e.htmlFor} idInput={e.idInput} name={e.name} type={e.type} />
                ))}
                <div className="col-span-2 grid grid-cols-3">
                  {errors && errors.name ? <Errors error={errors.name} /> : null}
                  {errors && errors.ektp ? <Errors error={errors.ektp} /> : null}
                  {errors && errors.job ? <Errors error={errors.job} /> : null}
                  {errors && errors.birth ? <Errors error={errors.birth} /> : null}
                  {errors && errors.phone ? <Errors error={errors.phone} /> : null}
                  {errors && errors.address ? <Errors error={errors.address} /> : null}
                </div>
              </div>
            </div>
            <div>
              <div className="w-full flex justify-between">
                <span className="capitalize font-bold">Family Member {count > 0 ? `(${count})` : ''}</span>
              </div>
              <div className='w-1/2 mt-4'>
                <div>
                  <div className={'grid grid-cols-3 text-start'}>
                    {tableHeadName.map(e => (
                      <div key={'key head' + e} className="border border-white px-3 text-white bg-blue-700 py-2 text-sm">{e}</div>
                    )
                    )}
                  </div>
                </div>
                {countField && countField.map(el => (
                  <div key={'key body' + el} className={`grid ${tableHeadName && `grid-cols-${tableHeadName.length}`} text-start`}>
                    <div className="border border-white px-3 text-black bg-blue-700/40 py-2 text-sm"><input type={'text'} name={`family-name-${el}`} className="w-full py-1 border border-green-600 rounded-md px-2 outline-none" /></div>
                    <div className="border border-white px-3 text-black bg-blue-700/40 py-2 text-sm"><input type={'date'} name={`family-birth-${el}`} className="w-full py-1 border border-green-600 rounded-md px-2 outline-none" /></div>
                    <div className="border border-white px-3 text-black bg-blue-700/40 py-2 text-sm">
                      <select className="w-full py-1 border border-green-600 rounded-md outline-none px-2" name={`family-relationship-${el}`}>
                        <option>Relationship</option>
                        {relationship.map(e => (<option key={'key option ' + e} value={e}>{e}</option>))}
                      </select>
                    </div>
                  </div>
                ))}
                <div className="flex justify-start mt-4">
                  <Button type='button' btnName={'add family member'} onClick={() => { setCount(count + 1); setCountField([...countField, count]) }} />
                </div>
              </div>
            </div>
            <div className="mt-20 flex justify-end">
              <Button type={'submit'} btnName={'Save data'} disabled={!isValid} />
            </div>
          </form>
        )}
      </Formik>
    </Layout>
  )
}

export default CreateUserPage