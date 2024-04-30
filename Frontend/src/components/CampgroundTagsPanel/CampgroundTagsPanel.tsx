import React, { useState, useRef, useEffect } from 'react';
import styles from './campgroundtagspanel.module.css';
import CampgroundTag from '@/components/CampgroundTag/CampgroundTag';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

export default function CampgroundTagsPanel({ tagsArray }: { tagsArray: any }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [visibleTags, setVisibleTags] = useState<any[]>([]);
  const [hiddenTags, setHiddenTags] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      const containerWidth = container.offsetWidth;
      let totalTagWidth = 0;
      const visibleTags:any = [];
      const hiddenTags:any = [];

      tagsArray.tags.forEach((tag: any) => {
        const tagWidth = calculateTagWidth(tag.name);
        if (totalTagWidth + tagWidth <= containerWidth) {
          visibleTags.push(tag);
          totalTagWidth += tagWidth;
        } else {
          hiddenTags.push(tag);
        }
      });

      setVisibleTags(visibleTags);
      setHiddenTags(hiddenTags);
    }
  }, [tagsArray.tags]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        context.font = 'bold 14px Arial'; // Set the font style you're using for the tags
        // Additional font settings if needed (e.g., context.direction = 'ltr';)
      }
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const calculateTagWidth = (tagName: string) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        const metrics = context.measureText(tagName);
        return metrics.width + 45; // Add some padding (20 pixels in this example)
      }
    }
    return 0;
  };

  return (
    <div>
      <div ref={containerRef} className={styles.tagContainer}>
        {visibleTags.map((tag: any) => (
          <CampgroundTag key={tag.name} tagName={tag.name} />
        ))}
        {hiddenTags.length > 0 && (
          <div className={styles.dropdownIconContainer} onClick={toggleDropdown}>
            {isDropdownOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
          </div>
        )}
      </div>
      {isDropdownOpen && (
        <div className={styles.dropdownContainer}>
          {hiddenTags.map((tag: any) => (
            <CampgroundTag key={tag.name} tagName={tag.name} />
          ))}
        </div>
      )}
      <canvas ref={canvasRef} width={1} height={1} style={{ display: 'none' }} />
    </div>
  );
}