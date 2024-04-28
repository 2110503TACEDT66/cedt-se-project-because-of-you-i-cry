import React, { useState, useEffect } from 'react';

interface EditTagPopupProps {
  onClose: () => void;
}

const EditTagPopup: React.FC<EditTagPopupProps> = ({ onClose }) => {
  const [searchTag, setSearchTag] = useState('');
  const [allTags, setAllTags] = useState([
    'Camping', 'Hiking', 'Campfires', 'Tent', 'Sleeping Bags', 'Wildlife',
    'Trails', 'Lakes', 'Fishing', 'Sunrises', 'Sunsets', 'Nature', 'Woods',
    'Firewood', 'Grilling', 'Barbecue', 'Canoeing', 'Kayaking', 'RV', 'Cabins',
    'Birds', 'Stars', 'Stargazing', 'Maps', 'Biking', 'Running', 'Adventure',
    'Boating', 'Campgrounds', 'Scenery', 'Smores', 'Picnics', 'Rivers',
    'Marshmallows', 'Hiking Boots', 'Waterfalls', 'Camping Gear', 'Forests',
    'Wildlife Photography', 'Campfire Songs', 'Family Fun', 'Relaxation',
    'Quiet Time', 'Beach', 'Swimming', 'Cliff Jumping', 'Day Trips', 'Campsites',
  ]);

  const [filteredTags, setFilteredTags] = useState(allTags);

  useEffect(() => {
    if (searchTag.trim()) {
      const filtered = allTags.filter((tag) =>
        tag.toLowerCase().startsWith(searchTag.toLowerCase())
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags(allTags);
    }
  }, [searchTag, allTags]);

  const addTagFromInput = () => {
    const tag = searchTag.trim();
    if (tag && !allTags.includes(tag)) {
      setAllTags([...allTags, tag]);
      setFilteredTags([...filteredTags, tag]);
      setSearchTag('');
    }
  };

  const addTagFromPrompt = () => {
    const newTag = window.prompt("Enter a new tag");
    if (newTag && !allTags.includes(newTag.trim())) {
      setAllTags([...allTags, newTag.trim()]);
      setFilteredTags([...filteredTags, newTag.trim()]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    setAllTags(allTags.filter((tag) => tag !== tagToRemove));
    setFilteredTags(filteredTags.filter((tag) => tag !== tagToRemove));
  };

  const handleDragStart = (tag: string) => (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', tag);
  };

  const handleDrop = (e: React.DragEvent) => {
    const tag = e.dataTransfer.getData('text/plain');
    removeTag(tag);
    e.preventDefault();
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6"
      style={{ width: '700px', height: '500px' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Tags</h2>
        <button
          aria-label="Close popup"
          className="text-gray-600 hover:text-gray-800"
          onClick={onClose}
        >
          ×
        </button>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 pr-4">
          <input
            type="text"
            placeholder="Search tag"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTagFromInput()}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Tag input field"
          />
          
          <div
            className="flex flex-wrap overflow-y-auto"
            style={{ maxHeight: '240px' }}
          >
            {filteredTags.map((tag, index) => (
              <div
                key={`${tag}-${index}`}
                className="flex items-center bg-gray-200 rounded-md px-2 py-1 mr-2 mb-2"
                draggable
                onDragStart={handleDragStart(tag)}
              >
                <span>{tag}</span>
              </div>
            ))}
            <button
              onClick={addTagFromPrompt}
              className="bg-transparent border border-dashed border-gray-300 rounded-md px-2 py-1 mr-2 mb-2 hover:bg-gray-200"
              aria-label="Add tag with prompt"
            >
              +
            </button>
          </div>
        </div>

        <div className="flex-2 lg:pl-4">
          <div
            className="h-full bg-red-100 border border-red-500 rounded-md flex items-center justify-center px-5"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            aria-label="Tag deletion zone"
          >
            Drop tags here to delete
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={onClose}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
          aria-label="Save and close"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTagPopup;
