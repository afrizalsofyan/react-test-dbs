import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import Button from "../components/Button"
import Modal from "../components/Modal"

const ListUserPage = () => {
  const router = useNavigate()
  const user = useSelector(state => state.user.result)
  const [showModal, setShowModal] = useState(false);

  const tableHeadName = ["Name", 'eKTP', 'Address', 'Job', 'Date of Birth', 'Phone Number', 'Family']
  return (
    <section className="px-10">
      <header className="py-10 border-b border-b-blue-600 -mx-10">
        <nav className="px-20">
          <span className="text-4xl font-semibold text-cyan-400">LS</span>
        </nav>
      </header>
      <main className="p-10 flex flex-col gap-6">
        <div className="w-full flex justify-between">
          <span className="capitalize font-bold">list user</span>
          <Button btnName={'craete new user'} onClick={() => router('/create')} />
        </div>
        <div className="overflow-auto w-screen sm:w-full -mx-20 sm:mx-0">
          <div className="w-full">
            <div>
              <div className="grid grid-cols-7 text-start">
                {tableHeadName.map(e => (
                  <span key={'key ' + e} className="border border-white pl-3 text-white bg-blue-700 py-2 text-sm">{e}</span>
                )
                )}
              </div>
            </div>
            <div>
              {user && user.map((e, idx) => {
                return (
                  <div key={idx}>
                    {e.map(el => {
                      return (
                        <div key={el.name.name + ' ' + el.ektp.ektp} className="grid grid-cols-7">
                          <span className="border border-white pl-3 text-black bg-blue-700/20 py-2 text-sm flex items-center">{el.name}</span>
                          <span className="border border-white pl-3 text-black bg-blue-700/20 py-2 text-sm flex items-center">{el.ektp}</span>
                          <span className="border border-white pl-3 text-black bg-blue-700/20 py-2 text-sm flex items-center">{el.address}</span>
                          <span className="border border-white pl-3 text-black bg-blue-700/20 py-2 text-sm flex items-center">{el.job}</span>
                          <span className="border border-white pl-3 text-black bg-blue-700/20 py-2 text-sm flex items-center">{el.birth}</span>
                          <span className="border border-white pl-3 text-black bg-blue-700/20 py-2 text-sm flex items-center">{el.phone}</span>
                          <span className="border border-white pl-3 text-black bg-blue-700/20 py-2 text-sm flex items-center"><Button btnName={`Show (${el.family.length})`} type='button' onClick={() => setShowModal(true)} /></span>
                        </div>
                      )
                    })}
                  </div>
                )
              })}
            </div>
            {
              showModal ? (
                <Modal>
                  <div className="bg-white py-10 px-20 rounded-xl">
                    <h1 className="text-3xl font-bold text-center mb-10">Family Details</h1>
                    <div className="grid grid-cols-4 gap-20 items-start bg-cyan-800 text-white px-5 py-3">
                      <div>No</div>
                      <div>Name</div>
                      <div>Date of Birth</div>
                      <div>Relationship</div>
                    </div>
                    {user && user.map((e, i) => (
                      <div key={i + 'key'}>
                        {e.map(el => (
                          <div key={el.name + ' '}>
                            {el.family.map((fam, index) => (
                              <div key={`${fam.familyname}`} className="grid grid-cols-4 gap-20 items-start px-5 py-3 border-b hover:bg-gray-200">
                                <span>{index + 1}</span>
                                <span className="capitalize">{fam.familyname}</span>
                                <span>{fam.familybirth}</span>
                                <span>{fam.familyrelationship}</span>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    ))}
                    <div className="flex justify-end mt-10">
                      <Button btnName={'Close'} onClick={() => setShowModal(false)} />
                    </div>
                  </div>
                </Modal>
              ) : null
            }
          </div>
        </div>
      </main>
    </section>
  )
}

export default ListUserPage