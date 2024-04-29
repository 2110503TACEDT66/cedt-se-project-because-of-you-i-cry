'use client';

import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import EditTagPopupEach from '@/components/EditTagPopupEach';

export default function PopupExample() {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { id } = useParams();

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <button
        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none"
        onClick={handleButtonClick}
      >
        Open Popup
      </button>
      {isPopupOpen && (
        <EditTagPopupEach onClose={handleClosePopup} campgroundId={id} />
      )}
    </div>
  );
}