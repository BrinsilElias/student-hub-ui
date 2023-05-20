import React from 'react';

const blueTagStyle = {
    width: '44px',
    padding: '2px 8px',
    fontSize: '12px',
    fontWeight: '500',
    borderRadius: '100vw',
    backgroundColor: '#EFF8FF',
    color: '#175CD3'
}

const violetTagStyle = {
    width: '58px',
    padding: '2px 8px',
    fontSize: '12px',
    fontWeight: '500',
    borderRadius: '100vw',
    backgroundColor: '#F9F5FF',
    color: '#6941C6'
}

function BlueTags() {
  return (
    <div style={blueTagStyle}>Male</div>
  )
}

function VioletTags() {
  return (
    <div style={violetTagStyle}>Female</div>
  )
}

export { BlueTags, VioletTags }