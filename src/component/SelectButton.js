import React from 'react'

const SelectButton = ({children, Selected, onClick}) => {
  return (
    <span onClick={onClick} className={`select-button ${Selected ? "selected" : ""}`}>
      {children}
    </span>
  )
}

export default SelectButton
