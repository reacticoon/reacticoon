import isNil from 'lodash/isNil'

// taken from https://cdn.paymytable.com/outdatedBrowser.js (detectBrowser)
// instead we could use https://github.com/lancedikson/bowser
//
// /!\ do not use for audit, we fallback to the current user agent.
export const getBrowserInfo = () => {
  var ua = navigator.userAgent,
    tem,
    M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []
  if (/trident/i.test(M[1])) {
    tem = /\brv[ :]+(\d+)/g.exec(ua) || []
    return { name: 'IE', version: tem[1] || '' }
  }
  if (M[1] === 'Chrome') {
    tem = ua.match(/\b(OPR|Edge)\/(\d+)/)
    if (tem != null) return { name: tem[1].replace('OPR', 'Opera'), version: tem[2] }
  }
  M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?']
  if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1])
  return { name: M[0], version: M[1] }
}

/**
 * Extracts the browser name and version number from the given user agent string.
 *
 * /!\ since it is used for audit, we do not fallback to the current user agent.
 *
 * @param userAgent
 *            The user agent string to parse. If not specified, the contents of
 *            navigator.userAgent are parsed.
 * @param elements
 *            How many elements of the version number should be returned. A
 *            value of 0 means the whole version. If not specified, defaults to
 *            2 (major and minor release number).
 * @return A string containing the browser name and version number, or null if
 *         the user agent string is unknown.
 *
 * http://odyniec.net/blog/2010/09/decrypting-the-user-agent-string-in-javascript/
 */
export const identifyBrowserWithUserAgent = (userAgent, elements) => {
  var regexps = {
      Chrome: [/Chrome\/(\S+)/],
      Firefox: [/Firefox\/(\S+)/],
      MSIE: [/MSIE (\S+);/],
      Opera: [/Opera\/.*?Version\/(\S+)/ /* Opera 10 */, /Opera\/(\S+)/ /* Opera 9 and older */],
      Safari: [/Version\/(\S+).*?Safari\//],
    },
    re,
    m,
    browser,
    version

  if (isNil(userAgent)) {
    return null
  }

  if (elements === undefined || elements === null) {
    elements = 2
  } else if (elements === 0) {
    elements = 1337
  }

  for (browser in regexps)
    while ((re = regexps[browser].shift())) {
      m = userAgent.match(re)
      if (m) {
        version = m[1].match(new RegExp('[^.]+(?:.[^.]+){0,' + --elements + '}'))[0]
        return browser + ' ' + version
      }
    }

  return null
}
