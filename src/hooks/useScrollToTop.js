import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// hace scroll al tope cada vez que cambia la ruta
function useScrollToTop() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
}

export default useScrollToTop
