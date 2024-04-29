import React, { useState, useEffect } from 'react';
import { TagJson, Tag } from '../../interface';
import getTags from '@/libs/getTags';
import createTagToCampground from '@/libs/createTagToCampground';
import { useSession } from 'next-auth/react';

interface EditTagPopupProps {
  onClose: () => void;
  campgroundId: string;
}

const EditTagPopupEach = ({ onClose, campgroundId }: EditTagPopupProps) => {
  const [searchTag, setSearchTag] = useState('');
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [selectedTags, setSelectedTags] = useState<{ [key: string]: boolean }>({});
  const { data: session } = useSession();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tagData: TagJson = await getTags();
        setAllTags(tagData.tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };

    fetchData();
  }, []);

  if (!session) return null;

  const saveTags = async () => {
    // Extract IDs of selected tags
    const selectedTagIDs = Object.keys(selectedTags).filter(tagName => selectedTags[tagName]);

    // Create tags one by one
    for (const tagID of selectedTagIDs) {
      try {
        await createTagToCampground(campgroundId, session.user.token, tagID);
      } catch (error) {
        console.error('Error creating tag:', error);
        // Handle error if needed
      }
    }

    // Close the popup after creating all tags
    onClose();
  };

  useEffect(() => {
    if (searchTag.trim()) {
      const filtered = allTags.filter(tag =>
        tag.name.toLowerCase().startsWith(searchTag.toLowerCase())
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags(allTags);
    }
  }, [searchTag, allTags]);

  const handleTagClick = (tagName: string) => {
    setSelectedTags(prevState => ({
      ...prevState,
      [tagName]: !prevState[tagName],
    }));
  };

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6"
      style={{ width: '700px', height: '500px' }}
      role="dialog"
      aria-modal="true"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit tags for this campground</h2>
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
            onChange={e => setSearchTag(e.target.value)}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Tag input field"
          />

          <div
            className="flex flex-wrap overflow-y-auto"
            style={{ maxHeight: '240px' }}
          >
            {filteredTags.map(tag => (
              <div
                key={tag.name}
                className={`m-1 py-1 px-2 rounded-lg cursor-pointer ${
                  selectedTags[tag.name]
                    ? 'bg-[#AF9670] text-white'
                    : 'bg-[#E1E1E1] text-[#7D7D7D]'
                }`}
                onClick={() => handleTagClick(tag.name)}
              >
                {tag.name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={saveTags}
          className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
          aria-label="Save and close"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTagPopupEach;