import React, { useEffect, useState } from 'react'
import Helmet from 'react-helmet'

import styles from './style.module.css'

const darkModeButton: React.FC = () => {
  const [icon, setIcon] = useState('moon')

  useEffect(() => {
    localStorage.getItem('theme') === 'light' && setIcon('moon')
    localStorage.getItem('theme') === 'dark' && setIcon('sun')

    !('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches &&
      setIcon('sun')
  }, [])

  function toggleColorMode(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault()

    if (
      !localStorage.getItem('theme') ||
      localStorage.getItem('theme') === 'light'
    ) {
      localStorage.theme = 'dark'
      document.querySelector('html')?.classList.add('dark')
      setIcon('sun')
    } else {
      localStorage.theme = 'light'
      document.querySelector('html')?.classList.remove('dark')
      setIcon('moon')
    }
  }

  return (
    <>
      <Helmet>
        <script>
          {`
            if (
              localStorage.getItem('theme') === 'dark' ||
              (!('theme' in localStorage) &&
                window.matchMedia('(prefers-color-scheme: dark)').matches)
            ) {
              document.querySelector('html').classList.add('dark')
            } else {
              document.querySelector('html').classList.remove('dark')
            }
          `}
        </script>
      </Helmet>
      <button
        data-a11y="false"
        aria-label="Ativar modo escuro"
        title="Ativar modo escuro"
        className={`${styles.darkMode} ${styles[icon]}`}
        onClick={e => toggleColorMode(e)}
      >
        <div className={styles.darkMode__inner}></div>
        <div className={styles.darkMode__outer}></div>
      </button>
    </>
  )
}

export default darkModeButton
