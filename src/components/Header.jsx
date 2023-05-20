import React from 'react';
import logo from '../logo.svg';
import Avatar from './Avatar';
import utilsStyle from '../utils.module.css'

const navStyle = {
    maxWidth: '1200px',
    margin: '0 auto',
    paddingBlock: '0.8rem',
}
  
const navItemStyle = {
    display: 'flex',
    alignItems: 'center',
    height: '30px',
    gap: '0.2rem',
}
  
const pageLinkStyle = {
    marginLeft: '1rem',
    padding: '0.2rem 0.75rem',
    backgroundColor: '#7F56D9',
    borderRadius: '0.3rem',
}

function Header() {
    return (
        <div>
          <header>
            <nav style={navStyle}>
              <div className={utilsStyle.flexbetween}>
                  <div style={navItemStyle} className="nav-item">
                    <div className='logo'>
                      <img  src={logo} alt="Student dashboard logo" />
                    </div>
                    <div style={pageLinkStyle} className='page-link'>
                      <p className={utilsStyle.headerlink}>Dashboard</p>
                    </div>
                  </div>
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    <Avatar name="A D" />
                    <p style={{fontSize: '0.875rem', fontWeight: '500', color: 'var(--clr-neutral-100)'}}>ADMIN</p>
                  </div>
              </div>
            </nav>
          </header>
        </div>
    )
}

export default Header