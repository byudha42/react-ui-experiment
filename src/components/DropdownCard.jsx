import React, { useState } from 'react';
import './DropdownCard.css';

const DropdownCard = () => {
  const [checkedItems, setCheckedItems] = useState({
    'all-pages': false,
    'page-1': false,
    'page-2': false,
    'page-3': false,
    'page-4': false,
  });

  const items = [
    { id: 'all-pages', label: 'All pages' },
    { id: 'page-1', label: 'Page 1' },
    { id: 'page-2', label: 'Page 2' },
    { id: 'page-3', label: 'Page 3' },
    { id: 'page-4', label: 'Page 4' },
  ];

  const handleCheckboxChange = (id) => {
    setCheckedItems((prev) => {
      const newValue = !prev[id];
      
      if (id === 'all-pages') {
        return {
          ...prev,
          'all-pages': newValue,
          'page-1': newValue,
          'page-2': newValue,
          'page-3': newValue,
          'page-4': newValue,
        };
      }
      
      // If unchecking a page and all-pages is checked, also uncheck all-pages
      if (!newValue && prev['all-pages']) {
        return {
          ...prev,
          [id]: newValue,
          'all-pages': false,
        };
      }
      
      // Update the page state
      const updatedState = {
        ...prev,
        [id]: newValue,
      };
      
      // If checking a page, check if all pages are now checked, then check all-pages
      if (newValue) {
        const allPagesChecked = 
          updatedState['page-1'] && 
          updatedState['page-2'] && 
          updatedState['page-3'] && 
          updatedState['page-4'];
        
        if (allPagesChecked) {
          updatedState['all-pages'] = true;
        }
      }
      
      return updatedState;
    });
  };

  const handleDoneClick = () => {
    console.log('Done clicked', checkedItems);
  };

  return (
    <div className="dropdown-card">
      <ul className="dropdown-list">
        {items.map((item) => (
          <React.Fragment key={item.id}>
            <li className="dropdown-item">
              <label className="dropdown-label">
                <span className="dropdown-text">{item.label}</span>
                <input
                  type="checkbox"
                  checked={checkedItems[item.id]}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="dropdown-checkbox-input"
                />
                <span className="dropdown-checkbox-custom" aria-hidden="true">
                  {checkedItems[item.id] && (
                    <svg
                      className="checkbox-checkmark"
                      viewBox="0 0 16 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.3333 4L6 11.3333L2.66667 8"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  )}
                </span>
              </label>
            </li>
            {item.id === 'all-pages' && <div className="dropdown-separator"></div>}
          </React.Fragment>
        ))}
      </ul>
      <div className="dropdown-separator"></div>
      <button className="dropdown-done-button" onClick={handleDoneClick}>
        Done
      </button>
    </div>
  );
};

export default DropdownCard;

