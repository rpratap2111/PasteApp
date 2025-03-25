import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  // Filter the data based on the search term
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete function
  function handelDelete(pasteID) {
    dispatch(removeFromPastes(pasteID));
  }

  // Share function
  function handleShare(pasteID) {
    const shareableLink = `${window.location.origin}/pastes/${pasteID}`;
    navigator.clipboard
      .writeText(shareableLink)
      .then(() => toast.success('Share link copied!'))
      .catch(() => toast.error('Failed to copy link'));
  }

  // Format the date for better display
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('en-US', {
      weekday: 'short', // Mon
      year: 'numeric', // 2025
      month: 'long', // January
      day: 'numeric', // 21
      hour: '2-digit', // 10
      minute: '2-digit', // 45
      hour12: true, // Use 12-hour format
    });
  };

  return (
    <div>
      <input
        type="search"
        placeholder="Search Here"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 rounded-2xl bg-black mt-5 min-w-[600px]"
      />

      <div className="flex flex-col gap-5 mt-5">
        {filteredData.length > 0 ? (
          filteredData.map((paste) => (
            <div className="border" key={paste._id}>
              <div>{paste.title}</div>
              <div>{paste.value}</div>

              <div className="flex flex-row gap-5 place-content-evenly">
                <button>
                  <a href={`/?pasteId=${paste?._id}`} style={{ color: 'white' }}>
                    Edit
                  </a>
                </button>

                <button>
                  <a href={`/pastes/${paste?._id}`} style={{ color: 'white' }}>
                    View
                  </a>
                </button>

                <button onClick={() => handelDelete(paste?._id)}>Delete</button>

                <button
                  onClick={() =>
                    navigator.clipboard.writeText(paste.value).then(() => toast.success('Copied'))
                  }
                >
                  Copy
                </button>

                <button onClick={() => handleShare(paste._id)}>Share</button>
              </div>

              <div>{formatDate(paste.createdAt)}</div>
            </div>
          ))
        ) : (
          <p>No pastes found.</p>
        )}
      </div>
    </div>
  );
};

export default Paste;
