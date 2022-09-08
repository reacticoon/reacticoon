import { useRef } from 'react'

// https://stackoverflow.com/questions/28889826/how-to-set-focus-on-an-input-field-after-rendering

const useFocus = () => {
	const htmlElRef = useRef()
	const setFocus = () => {
		setTimeout(() => { // trick with setTimeout, does not work without..
			htmlElRef.current && htmlElRef.current.focus()
			// Moving cursor to the end
			htmlElRef.current.selectionStart = htmlElRef.current.value.length
			htmlElRef.current.selectionEnd = htmlElRef.current.value.length
		}, 1)
	}

	return [ htmlElRef, setFocus ] 
}

export default useFocus