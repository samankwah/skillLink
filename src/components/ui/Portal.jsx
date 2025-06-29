import { createPortal } from 'react-dom'
import { useEffect, useState } from 'react'

const Portal = ({ children, selector = 'body' }) => {
  const [container, setContainer] = useState(null)

  useEffect(() => {
    let element = document.querySelector(selector)
    
    if (!element) {
      element = document.body
    }
    
    setContainer(element)
  }, [selector])

  return container ? createPortal(children, container) : null
}

export default Portal