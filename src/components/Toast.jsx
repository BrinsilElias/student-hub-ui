import React, { useState } from 'react'
import utilStyle from '../utils.module.css'

const toastStyle = {
    position: 'relative',
    paddingRight: '1rem',
    paddingLeft: '0.5rem',
    borderRadius: '0.75rem',
    backgroundColor: 'var(--clr-success)',
    border: '1px hsla(153, 96%, 30%, 32%) solid'
}

function Toast() {
  const [showToast, setShowToast] = useState(true)

  const handleclick = () => {
    setShowToast(false)
  }
  
  return (
    <>
        { showToast && <div style={toastStyle}>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div className={utilStyle.success_icon}></div>
                <p className={utilStyle.bodytextsmdark}>Details added successfully.</p>
                <button className={utilStyle.btn + ' ' + utilStyle.btn_close} data-icon="close-icon" onClick={handleclick}></button>
            </div>
        </div>}
    </>
  )
}

export default Toast