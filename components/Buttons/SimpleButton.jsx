import {React,useState} from 'react'
function SimpleButton({text,className = ''}) {
  return (
    <button className={`bg-transparent px-3 py-0 ${className}`}>{text}</button>
  )
}

export default SimpleButton