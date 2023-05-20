import React from 'react';

const avatarStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '35px',
    aspectRatio: '1',
    borderRadius: '50%',
    fontSize: '14px',
    fontWeight: '500',
    backgroundColor: 'var(--clr-primary-200)',
    color: 'var(--clr-primary-800)'
}

function generateInitials(name) {
    try {
        if (name) {
          if (name.includes(' ') && name.split(' ')[1][0]) {
            return name.split(' ')[0][0] + name.split(' ')[1][0];
          } else {
            return name.split(' ')[0][0];
          }
        }
        return 'AV';
    } catch (error) {
        console.error('An error occurred while generating initials:', error);
        return 'AV';
    }
}

function Avatar(props) {

  return (
    <div style={avatarStyle}>
        {generateInitials(props.name)}
    </div>
  )
}

export default Avatar