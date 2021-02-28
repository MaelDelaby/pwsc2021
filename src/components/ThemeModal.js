import React, { useContext, useEffect } from 'react';
import SwitchUI from '@material-ui/core/Switch'


import {
    FormControlLabel
  } from '@material-ui/core';

import { CustomThemeContext } from '../themes/CustomThemeProvider'

export default function ThemeModal() {
  const { currentTheme, setTheme } = useContext(CustomThemeContext)
  const isDark = Boolean(currentTheme === 'dark')

  const handleThemeChange = (event) => {
      const { checked } = event.target
      console.log(event.target)
      if (checked) {
        setTheme('dark')
        localStorage.setItem('appTheme', 'dark')
      } else {
        setTheme('normal')
        localStorage.setItem('appTheme', 'normal')
      }
    }

  const osThemePreference = () => {
    const userPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if(userPrefersDark && (localStorage.getItem('appTheme') == undefined)){
      localStorage.setItem('appTheme', 'dark')
    }
  }

  useEffect(() => {
    osThemePreference();
  }, []);

  return(
      <FormControlLabel
          control={<SwitchUI checked={isDark} onChange={handleThemeChange} />}
          label="Change theme"
      />
    )
}  
