import axios from 'axios';
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

const selectStyle = {
    padding: '0.5rem 0.8rem',
    borderRadius: '0.5rem',
    border: '1px solid var(--clr-border-dark)',
    fontSize: '14px',
    color: 'var(--clr-text-light)'
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
  const [formData, setFormData] = useState({
    name: '',
    date_of_birth: '',
    student_class: '',
    division: '',
    gender: '',
  });
  const [nameError, setNameError] = useState('');
  const [dobError, setDobError] = useState('');
  const [classError, setClassError] = useState('');
  const [divisionError, setDivisionError] = useState('');
  const [genderError, setGenderError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClear = () => {
    formRef.current.reset()
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
        axios.post('http://localhost:8080/api/students', formData)
            .then((response) => {
            // Handle the response from the backend if needed
            console.log('Form submission successful');
            onFormSubmit(response.data);
            })
            .catch((error) => {
            // Handle any error that occurred during the submission
            console.error('Form submission failed:', error);
            });
        
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
                <select style={{...selectStyle, borderColor: classError ? 'var(--clr-error)' : 'var(--clr-border-dark)'}} 
                        name='student_class' 
                        id='class-input'
                        value={formData.student_class}
                        onChange={handleChange}
                        onFocus= {() => {setClassError('')}}
                >
                    <option value="">Select</option>
                    <option value='I'>I</option>
                    <option value='II'>II</option>
                    <option value='III'>III</option>
                    <option value='IV'>IV</option>
                    <option value='V'>V</option>
                    <option value='VI'>VI</option>
                    <option value='VII'>VII</option>
                    <option value='VIII'>VIII</option>
                    <option value='XI'>IX</option>
                    <option value='X'>X</option>
                    <option value='XI'>XI</option>
                    <option value='XII'>XII</option>
                </select>
                {classError && <p className={utilStyle.bodytextsmlight} style={errorStyle}>{classError}</p>}
            </div>
            <div style={editInputStyle}>
                <label style={labelStyle} htmlFor="division-input">Division</label>
                <select style={{...selectStyle, borderColor: classError ? 'var(--clr-error)' : 'var(--clr-border-dark)'}} 
                        name='division' 
                        id='division-input'
                        value={formData.division}
                        onChange={handleChange}
                        onFocus= {() => {setDivisionError('')}}
                >
                    <option value=''>Select</option>
                    <option value='A'>A</option>
                    <option value='B'>B</option>
                    <option value='C'>C</option>
                </select>
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
                               defaultChecked={formData.gender === 'MALE'}
                               onChange={handleChange}
                               onFocus={() => setGenderError(false)}
                        />
                        <label style={labelStyle} htmlFor="gender-input-male">Male</label>
                    </div>
                    <div className={utilStyle.flexgap}>
                        <input type="radio" 
                               name='gender' 
                               id='gender-input-female' 
                               className="check-box" 
                               value="FEMALE"
                               defaultChecked={formData.gender === 'FEMALE'}
                               onChange={handleChange}
                               onFocus={() => setGenderError(false)}
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
                <button type='submit' className={utilStyle.btn + ' ' + utilStyle.btn_submit}>Add</button>
            </div>
        </div>
    </form>
  )
}

export default AddFrom