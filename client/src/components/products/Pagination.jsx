import React, {useContext} from 'react'
import { UserContext } from '../context/UserContext'
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { BiArrowToLeft, BiArrowToRight } from "react-icons/bi";


const Pagination = () => {
    const {currentPage, setCurrentPage} = useContext(UserContext)
  return (
    <div className='flex flex-row justify-center items-center p-4'>
        {currentPage > 1 ? <BiArrowToLeft className='text-[#dfcdc9] text-xl mr-2 cursor-pointer' onClick={(() => setCurrentPage(1))}/> : ''}
        <BsFillArrowLeftCircleFill className='text-[#dfcdc9] text-3xl mr-2 cursor-pointer' onClick={currentPage > 1 ? () => setCurrentPage(currentPage - 1) : ''}/>
        <p className='px-2 shadow-inner rounded-full text-white bg-[#dfcdc9]'>{currentPage}</p>
        <BsFillArrowRightCircleFill className='text-[#dfcdc9] text-3xl ml-2 cursor-pointer'onClick={currentPage < 20 ? () => setCurrentPage(currentPage + 1) : ''}/>
        {currentPage > 1 ? <BiArrowToRight className='text-[#dfcdc9] text-xl ml-2 cursor-pointer' onClick={(() => setCurrentPage(20))}/> : ''}

    </div>
  )
}

export default Pagination