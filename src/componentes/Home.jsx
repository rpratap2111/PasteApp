import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';
import { useDispatch } from 'react-redux'; 
import { useSelector } from 'react-redux';


const Home = () => {

    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const pasteId = searchParams.get("pasteId");
    const dispatch = useDispatch();
    const allPastes = useSelector((state) => state.paste.pastes);

    useEffect(() => {

        if(pasteId) {
            const paste = allPastes.find((paste) => paste._id === pasteId);
            if(paste) {
                setTitle(paste.title);
                setValue(paste.value);
            }
        }

    }, [pasteId])

    function createPaste() {
        const paste ={
            title: title,
            value: value,
            _id: pasteId || Date.now().toString(36),
            createdAt: new Date().toISOString(),
        }

        

        if(pasteId) {
            dispatch(updateToPastes(paste));
        }
        else {
            dispatch(addToPastes(paste));
        }

        setTitle('');
        setValue('');
        setSearchParams({});

    }

    return (
        <div>
            <div className='flex flex-row gap-7 place-content-between'>
                <input
                    className='p-1 rounded-2xl bg-black mt-2 w-[60%] pl-4'
                    type="text"
                    placeholder='enter title here'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <button onClick={createPaste} className='p-2 rounded-2xl bg-black mt-2'>
                    {
                        pasteId ? "Update My Paste" : "Create My Paste"
                    }
                </button>
            </div>

            <div className='mt-8'>
                    <textarea 
                        value={value}
                        placeholder='enter your text here'
                        onChange={(e) => setValue(e.target.value)}
                        rows={20}
                        className= 'mt-4 rounded-2xl min-w-[500px] p-4 bg-black'
                    />
            </div>
        </div>
    )
}

export default Home;
