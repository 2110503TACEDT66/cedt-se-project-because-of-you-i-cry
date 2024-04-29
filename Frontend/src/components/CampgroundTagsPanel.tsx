import React, { useState } from 'react';
import styles from './campgroundtagspanel.module.css';
import CampgroundTag from '../CampgroundTag/CampgroundTag';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function CampgroundTagsPanel({ tagsArray }: { tagsArray: string[] }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleTags, setVisibleTags] = useState<string[]>([]);
  const [hiddenTags, setHiddenTags] = useState<string[]>([]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <div className={styles.tagContainer}>
        {tagsArray.map((tag: string, index: number) => (
          <CampgroundTag key={index} tagName={tag} />
        ))}
        {tagsArray.length > 0 && (
          <div className={styles.dropdownIconContainer} onClick={toggleDropdown}>
            {isDropdownOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </div>
        )}
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdownContainer}>
          {tagsArray.map((tag: string, index: number) => (
            <CampgroundTag key={index} tagName={tag} />
          ))}
        </div>
      )}
    </div>
  );
}
