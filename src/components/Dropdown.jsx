import React, { useState, useEffect, useRef, useImperativeHandle, forwardRef } from 'react'
import utilStyle from '../utils.module.css'

const errosStyle = {
  border: '1px var(--clr-error) solid'
}

const noErrosStyle = {
  border: '1px var(--clr-border-dark) solid'
}

const Icon = () => {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 7.5L10 12.5L15 7.5" stroke="#667085" strokeWidth="1.66667" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>  
    );
};

const Dropdown = forwardRef(({ placeHolder, options, onChange, formSubmitted, error }, ref) => {
  const inputRef = useRef();
  const [showMenu, setShowMenu] = useState(false)
  const [selectedValue, setSelectedValue] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      if (inputRef.current && !inputRef.current.contains(e.target)){
        setShowMenu(false);
      }
    }
    setSelectedValue(null);

    window.addEventListener("click", handler);
    return () => [
        window.removeEventListener("click", handler)
    ]
  }, [formSubmitted]);

  
  useImperativeHandle(ref, () => ({
    clear() {
      setSelectedValue(null);
    }
  }));
  
  const handleInputClick = (e) => {
    setShowMenu(!showMenu);
  }
  
  const getDisplay = () => {
    if (selectedValue) {
      return (
        <p className={utilStyle.bodytextsmlight}>{selectedValue.label}</p> 
      )
    }else {
      return (
          <p className={utilStyle.bodytextsmlight}>{placeHolder}</p>
      );
    }
  };

  const onItemClick= (option) => {
    setSelectedValue(option);
    onChange(option);
  };

  const isSelected = (option) => {
    if (!selectedValue){
      return false;
    };

    return selectedValue.value === option.value;
  }

  return (
    <div className={utilStyle.dropdown_container} style={error ? errosStyle: noErrosStyle}>
      <div ref={inputRef} className={utilStyle.dropdown_input} onClick={handleInputClick}>
        <div className="dropdown-selected-value">{getDisplay()}</div>
        <div className="dropdown-tools">
          <div className="dropdown-tool">
            <Icon />
          </div>
        </div>
      </div>
      {showMenu && (
      <div className={utilStyle.dropdown_menu}>
        {options.map((option) => (
            <div 
                onClick={() => onItemClick(option)}
                key={option.value} 
                className={utilStyle.dropdown_item}
            >
                <p className={`${utilStyle.bodytextsmdark} ${isSelected(option) ? `${utilStyle.selected}` : ""}`}>
                  {option.label}
                </p>
            </div>
        ))}
      </div>
      )}
    </div>
  )
});

export default Dropdown