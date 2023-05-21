import axios from 'axios';
import Dropdown from './Dropdown';
import React, { useState, useRef } from 'react';
import utilStyle from "../utils.module.css"

const editInputStyle = {
    position: 'relative',
    width: '100%',
    display: 'grid',
    gap: '0.3rem',
}

const inputStyle = {
    padding: '0.4rem 0.8rem',
    borderRadius: '0.5rem',
    border: '1px solid var(--clr-border-dark)',
}

const labelStyle = {
    fontSize: '0.875rem',
    fontWeight: 'var(--fw-md)'
}

const radioGroupStyle = {
    display: 'grid',
    gap: '0.5rem'
}

const errorStyle = {
    color: '#F04438',
    position: 'absolute',
    top: '100%',
    width: '100%',
    left: '0',
    height: '1rem',
    marginTop: '0.25rem',
    textAlign: 'right',
    fontSize: '0.8rem',
    fontWeight: 'var(--fw-md)',
}


function AddFrom( {onFormSubmit} ) {
  const formRef = useRef(null);
  const classDropdownRef = useRef();
  const divisionDropdownRef = useRef();
  const [formData, setFormData] = useState({
    name: '',
    date_of_birth: '',
    student_class: '',
    division: '',
    gender: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [nameError, setNameError] = useState('');
  const [dobError, setDobError] = useState('');
  const [classError, setClassError] = useState('');
  const [divisionError, setDivisionError] = useState('');
  const [genderError, setGenderError] = useState('');

  const select_class = [
    { value: "I", label: "Class I" },
    { value: "II", label: "Class II" },
    { value: "III", label: "Class III" },
    { value: "IV", label: "Class IV" },
    { value: "V", label: "Class V" },
    { value: "VI", label: "Class VI" },
    { value: "VII", label: "Class VII" },
    { value: "VIII", label: "Class VIII" },
    { value: "IX", label: "Class IX" },
    { value: "X", label: "Class X" },
    { value: "XI", label: "Class XI" },
    { value: "XII", label: "Class XII" }
  ]

  const select_division = [
    { value: "A", label: "Division A" },
    { value: "B", label: "Division B" },
    { value: "C", label: "Division C" },
  ]

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (option, name) => {
    setFormData((prevData) => ({
        ...prevData,
        [name]: option.value,
      }));
  }

  const handleClear = () => {
    formRef.current.reset()
    classDropdownRef.current.clear();
    divisionDropdownRef.current.clear();
    setFormData({ name: '', date_of_birth: '' ,student_class: '', division: '', gender: '' });
    setNameError(false)
    setDobError(false)
    setClassError(false)
    setDivisionError(false)
    setGenderError(false)
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let isFormValid = true;

    // Form validation
    if (formData.name === '') {
        setNameError('Please enter your name.');
        isFormValid = false; // Set form validity flag as false
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
        setNameError('Name should only contain alphabets.');
        isFormValid = false; // Set form validity flag as false
     } else {
        setNameError('');
    }

    if (formData.date_of_birth === '') {
        setDobError('Please select a date of birth');
        isFormValid = false; // Set form validity flag as false
    } else {
        setDobError('');
      }
  
    if (formData.student_class === '') {
        setClassError('Please select a class');
        isFormValid = false; // Set form validity flag as false
    } else {
        setClassError('');
      }
    
    if (formData.division === '') {
        setDivisionError('Please select a division');
        isFormValid = false; // Set form validity flag as false
    } else {
        setDivisionError('');
      }

    if (formData.gender === '') {
        setGenderError('Please select a gender');
        isFormValid = false; // Set form validity flag as false
    } else {
        setGenderError('');
      }

    // If the form is valid, proceed with form submission
    if (isFormValid) {
        console.log('Form data:', formData);
        axios.post('/api/students', formData)
            .then((response) => {
            // Handle the response from the backend if needed
            console.log('Form submission successful');
            onFormSubmit(response.data);
            })
            .catch((error) => {
            // Handle any error that occurred during the submission
            console.error('Form submission failed:', error);
            });
        setFormSubmitted(true);
        formRef.current.reset()
        handleClear()
        
    }

  }
  

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
        <div style={{display: 'grid', gap: '1.125rem', width: '100%'}}>
            <div style={editInputStyle}>
                <label style={labelStyle} htmlFor="name-input">Full Name</label>
                <input style={{...inputStyle, borderColor: nameError ? 'var(--clr-error)' : 'var(--clr-border-dark)' }}
                       name='name' 
                       id='name-input' 
                       type="text" 
                       placeholder='John Doe'
                       value={formData.name}
                       onChange={handleChange}
                       onFocus= {() => {setNameError('')}}
                />
                {nameError && <p className={utilStyle.bodytextsmlight} style={errorStyle}>{nameError}</p>}
            </div>
            <div style={editInputStyle}>
                <label style={labelStyle} htmlFor="dob-input">Date of Birth</label>
                <input style={{...inputStyle, borderColor: dobError ? 'var(--clr-error)' : 'var(--clr-border-dark)' }} 
                        name='date_of_birth' 
                        id='dob-input' 
                        type="text"
                        onFocus={(e) => {e.target.type='date'; setDobError('')}}
                        onBlur={(e) => e.target.type='text'}
                        value={formData.date_of_birth} 
                        onChange={handleChange}
                        placeholder='DD/MM/YYYY'
                />
                {dobError && <p className={utilStyle.bodytextsmlight} style={errorStyle}>{dobError}</p>}
            </div>
            <div style={editInputStyle}>
                <label style={labelStyle} htmlFor="class-input">Class</label>
                <Dropdown 
                        placeHolder="Select..."
                        ref={classDropdownRef} 
                        options={select_class} 
                        name="student_class" 
                        onChange={(option) => handleSelectChange(option, "student_class")} 
                        key={formSubmitted ? 'dropdown-reset' : 'dropdown'}
                        formSubmitted={formSubmitted}
                        error={classError ? true: false} 
                />
                {classError && <p className={utilStyle.bodytextsmlight} style={errorStyle}>{classError}</p>}
            </div>
            <div style={editInputStyle}>
                <label style={labelStyle} htmlFor="division-input">Division</label>
                <Dropdown 
                        placeHolder="Select..." 
                        ref={divisionDropdownRef}
                        options={select_division} 
                        name="division" 
                        onChange={(option) => handleSelectChange(option, "division")} 
                        formSubmitted={formSubmitted} 
                        error={divisionError ? true: false} 
                />
                {divisionError && <p className={utilStyle.bodytextsmlight} style={errorStyle}>{divisionError}</p>}
            </div>
            <div style={editInputStyle}>
                <p style={labelStyle}>Gender</p>
                <div style={radioGroupStyle}>
                    <div className={utilStyle.flexgap}>
                        <input type="radio" 
                               name='gender' 
                               id='gender-input-male' 
                               className="check-box" 
                               value="MALE" 
                               onChange={handleChange}
                               onFocus={() => setGenderError(false)}
                               checked={formData.gender === 'MALE'}
                        />
                        <label style={labelStyle} htmlFor="gender-input-male">Male</label>
                    </div>
                    <div className={utilStyle.flexgap}>
                        <input type="radio" 
                               name='gender' 
                               id='gender-input-female' 
                               className="check-box" 
                               value="FEMALE"
                               onChange={handleChange}
                               onFocus={() => setGenderError(false)}
                               checked={formData.gender === 'FEMALE'}
                        />
                        <label style={labelStyle} htmlFor="gender-input-female">Female</label>
                    </div>
                </div>
                {genderError && (
                    <p className={utilStyle.bodytextsmlight} style={{...errorStyle, textAlign: 'left'}}>
                    {genderError}
                    </p>
                )}
            </div>
            <div style={{display: 'grid', gap: '0.8rem', gridTemplateColumns: '1fr 1fr', marginTop: '0.75rem'}} className='form-action'>
                <button type='button' className={utilStyle.btn + ' ' + utilStyle.btn_cancel} onClick={handleClear}>Clear</button>
                <button type='submit' className={utilStyle.btn + ' ' + utilStyle.btn_submit} onClick={() => setFormSubmitted(false)}>Add</button>
            </div>
        </div>
    </form>
  )
}

export default AddFrom