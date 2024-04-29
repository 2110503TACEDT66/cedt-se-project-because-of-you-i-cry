import React, { useState, useEffect } from 'react';
import getTags from "@/libs/getTags";
import addTag from "@/libs/addTag";
import deleteTag from "@/libs/deleteTag";
import { TagJson, Tag } from "../../interface";
import { useSession } from 'next-auth/react';

interface EditTagPopupProps {
  onClose: () => void;
}

const EditTagPopup: React.FC<EditTagPopupProps> = ({ onClose }) => {
  const { data: session } = useSession();
  const [searchTag, setSearchTag] = useState('');
  const [allTags, setAllTags] = useState<Tag[]>([]);
  const [filteredTags, setFilteredTags] = useState<Tag[]>([]);
  const [isDraggingOver, setIsDraggingOver] = useState(false); // New state to indicate if dragging over the delete area

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tagData: TagJson = await getTags();
        if (tagData.success) {
          setAllTags(tagData.tags);
          setFilteredTags(tagData.tags);
        }
      } catch (error) {
        console.error("Failed to fetch tags:", error);
      }
    };

    fetchTags();
  }, []);

  useEffect(() => {
    const filtered = searchTag.trim()
      ? allTags.filter((tag) => tag.name.toLowerCase().startsWith(searchTag.toLowerCase()))
      : allTags;
    setFilteredTags(filtered);
  }, [searchTag, allTags]);

  const addNewTag = async (tagName: string) => {
    if (!tagName) return;
    if (allTags.some((tag) => tag.name.toLowerCase() === tagName.toLowerCase())) {
      console.warn(`Tag '${tagName}' already exists.`);
      return;
    }

    try {
      if (session?.user?.token) {
        const newTagResponse = await addTag({ name: tagName }, session.user.token);
        if (newTagResponse.success) {
          const newTags = newTagResponse.tags || [];
          setAllTags((prevTags) => [...prevTags, ...newTags]);
          setFilteredTags((prevTags) => [...prevTags, ...newTags]);
        }
      }
    } catch (error) {
      console.error("Failed to add tag:", error);
    }
  };

  const addTagFromInput = () => {
    const tag = searchTag.trim();
    if (tag) {
      addNewTag(tag);
      setSearchTag('');
    }
  };

  const addTagFromPrompt = async () => {
    const newTag = window.prompt("Enter a new tag");
    if (newTag) {
      const tagName = newTag.trim();
      await addNewTag(tagName);
      
      // Refetch the updated list of tags
      const tagData: TagJson = await getTags();
      if (tagData.success) {
        setAllTags(tagData.tags);
        setFilteredTags(tagData.tags);
      }
    }
  };

  const handleDragStart = (tag: Tag) => (e: React.DragEvent) => {
    const tagId = tag._id ;
  
    if (tagId) {
      e.dataTransfer.setData("tagId", tagId); // Set the correct tag ID
      e.dataTransfer.effectAllowed = 'move';
      console.log("Drag started with tag ID:", tagId); // Add logging for verification
    } else {
      console.error("Noooo valid tag ID provided:", tag); // Log the problematic tag
      e.preventDefault(); // Prevent dragging if there's no valid ID
    }
  };
  
  
  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault(); // Prevent default behavior during drop
    const tagId = e.dataTransfer.getData("tagId"); // Retrieve the tag ID from dataTransfer
  
    console.log("Dropping tag with ID:", tagId); // Log the retrieved tag ID
  
    if (!tagId) {
      console.warn("No tag ID found in data transfer."); // Warn if the tag ID is missing
      return;
    }
  
    await removeTag(tagId); // Attempt to delete the tag
    setIsDraggingOver(false); // Reset dragging state after dropping
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault(); // Important to allow dropping
    setIsDraggingOver(true);
  };
  
  const handleDragLeave = (e: React.DragEvent) => {
    setIsDraggingOver(false); // Reset dragging state when leaving the drop area
  };
  


// Validate the tag ID before deleting and handle errors properly
const removeTag = async (tagId: string) => {
  if (!tagId) {
    console.warn("Tag ID is required to delete a tag.");
    return;
  }

  try {
    if (session?.user?.token) {
      await deleteTag(tagId, session.user.token);

      // Update the state to remove the tag that was deleted
      setAllTags((prevTags) => prevTags.filter((tag) => tag._id !== tagId));
      setFilteredTags((prevTags) => prevTags.filter((tag) => tag._id !== tagId));
    } else {
      console.warn("User session not available. Cannot delete tag.");
    }
  } catch (error) {
    console.error("Failed to delete tag:", error);

    // Inform the user of the failure with a more detailed message
    alert("Failed to delete tag. Please check the console for more details.");
  }
};

  return (
    <div
      className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-6"
      style={{ width: '700px', height: '500px' }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Edit Tags</h2>
        <button onClick={onClose} className="text-gray-600 hover:text-gray-800">×</button>
      </div>

      <div className="flex flex-col lg:flex-row">
        <div className="flex-1 pr-4">
          <input
            type="text"
            placeholder="Search tag"
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTagFromInput()}
            className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md"
          />

          <div className="flex flex-wrap overflow-y-auto" style={{ maxHeight: '240px' }}>
            {filteredTags.map((tag, index) => (
              <div
                key={`${tag._id}-${index}`} // Use tag ID as part of key
                className="flex items-center bg-gray-200 rounded-md px-2 py-1 mr-2 mb-2 cursor-grabbing"
                draggable
                onDragStart={handleDragStart(tag)}
              >
                <span>{tag.name}</span>
              </div>
            ))}
            <button onClick={addTagFromPrompt} className="bg-transparent border border-dashed border-gray-300 rounded-md px-2 py-1 mr-2 mb-2">+</button>
          </div>
        </div>

        <div className="flex-2 lg:pl-4">
          <div
            className={`h-full border rounded-md flex items-center justify-center px-4 ${
              isDraggingOver ? "bg-red-300 border-red-500" : "bg-red-100 border-red-300"
            }`} // Change background color based on dragging state
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave} // Reset when leaving the drop area
          >
            Drop tags here to delete
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <button onClick={onClose} className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600">
          Save
        </button>
      </div>
    </div>
  );
};

export default EditTagPopup;
