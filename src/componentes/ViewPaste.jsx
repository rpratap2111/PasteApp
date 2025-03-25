import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useDispatch } from 'react-redux'; 
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'; 


const ViewPaste = () => {

  const {id} = useParams();

  const allPastes = useSelector((state) => state.paste.pastes);
  const paste = allPastes.filter((paste) => paste._id === id)[0];

  return (
    <div>
      <div className='flex flex-row gap-7 place-content-between'>
        <input
          className='p-1 rounded-2xl bg-black mt-2 w-[60%] pl-4'
          type="text"
          placeholder='enter title here'
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* <button onClick={createPaste} className='p-2 rounded-2xl bg-black mt-2'>
          {
            pasteId ? "Update My Paste" : "Create My Paste"
          }
        </button> */}
      </div>

      <div className='mt-8'>
        <textarea
          value={paste.value}
          placeholder='enter your text here'
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          disabled
          className='mt-4 rounded-2xl min-w-[500px] p-4 bg-black'
        />
      </div>
    </div>
  )
}

export default ViewPaste
