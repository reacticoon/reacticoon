// https://danielcompton.net/2017/07/06/detect-user-timezone-javascript
// -> does not work on IE
export const getBrowserTimeZone = () =>
  Intl && Intl.DateTimeFormat ? Intl.DateTimeFormat().resolvedOptions().timeZone : null
