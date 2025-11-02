import UsersLogIn from './UsersLogIn'

const LeftSide = () => {
  return (
     <div className=" h-full w-[50%] flex px-7  items-center">
        <div>

            <UsersLogIn/>
            <h1 className=" text-6xl text-gray-700 font-bold">
               More than just frients  truly connect 
            </h1>
            <div className='text-gray-500 mt-2.5 ml-1.5 '>
               connet with global community on USMP 
            </div>
        </div>
      </div>
  )
}

export default LeftSide