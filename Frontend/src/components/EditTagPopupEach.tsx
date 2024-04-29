import React, { useState, useEffect } from 'react';
import getTags from "@/libs/getTags";
import { TagJson } from "../../interface";
import createTagToCampground from '@/libs/createTagToCampground';



interface EditTagPopupProps {
  onClose: () => void;
}

const EditTagPopup: React.FC<EditTagPopupProps> = ({ onClose }) => {
  const [searchTag, setSearchTag] = useState('');
  const [allTags, setAllTags] = useState<string[]>([]);

  
  const [filteredTags, setFilteredTags] = useState(allTags);


  useEffect(() => {
    getTags()
      .then((data: TagJson) => {
        const tagNames = data.tags.map((tag) => tag.name);
        setAllTags(tagNames);
      })
      .catch((error) => {
        console.error("Error fetching tags:", error);
      });
  }, []);

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

  const [selectedTags, setSelectedTags] = useState<{ [key: string]: boolean }>(
    {}
  );

  const handleTagClick = (tagName: string) => {
    setSelectedTags((prevState) => ({
      ...prevState,
      [tagName]: !prevState[tagName],
    }));
  };

  const [tagsData, setTagsData] = useState<string[]>([]);



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
            onChange={(e) => setSearchTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTagFromInput()}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Tag input field"
          />
          
          <div
            className="flex flex-wrap overflow-y-auto"
            style={{ maxHeight: '240px' }}
          >
            {filteredTags.map((tagName) => (
                      <div
                        key={tagName}
                        className={`m-1 py-1 px-2 rounded-lg cursor-pointer ${
                          selectedTags[tagName]
                            ? "bg-[#AF9670] text-white"
                            : "bg-[#E1E1E1] text-[#7D7D7D]"
                        }`}
                        onClick={() => handleTagClick(tagName)}
                      >
                        {tagName}
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

      </div>

      <div className="flex justify-center mt-4">
        <button
          onClick={createTagToCampground}
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
