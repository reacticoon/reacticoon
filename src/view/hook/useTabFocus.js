import React, { useEffect } from 'react';

const useTabFocus = () => {
  const [focused, setIsFocused] = React.useState(true)

  // User has switched back to the tab
  const onFocus = () => {
    setIsFocused(true)
  };

  // User has switched away from the tab (AKA tab is hidden)
  const onBlur = () => {
    setIsFocused(false)
  };


  useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);
    // Specify how to clean up after this effect:
    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  });

  return {tabFocused: focused}
};

export default useTabFocus;