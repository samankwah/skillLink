import { useEffect } from 'react'

export const useDocumentTitle = (title, dependencies = []) => {
  useEffect(() => {
    const defaultTitle = 'SkillLink'
    const prevTitle = document.title
    
    if (title) {
      document.title = `${title} | ${defaultTitle}`
    } else {
      document.title = defaultTitle
    }
    
    // Cleanup function to restore previous title if needed
    return () => {
      // Only restore if the component is unmounting and title hasn't been changed by another component
      if (document.title === `${title} | ${defaultTitle}` || document.title === defaultTitle) {
        document.title = prevTitle
      }
    }
  }, [title, ...dependencies])
}

export default useDocumentTitle