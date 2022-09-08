import { useEffect, useRef } from 'react'

// https://stackoverflow.com/questions/55187563/determine-which-dependency-array-variable-caused-useeffect-hook-to-fire

const usePrevious = (value, initialValue) => {
	const ref = useRef(initialValue)
	useEffect(() => {
		ref.current = value
	})
	return ref.current
}

const useEffectDebugger = (effectHook, dependencies, dependencyNames = []) => {
	const previousDeps = usePrevious(dependencies, [])

	const changedDeps = dependencies.reduce((accum, dependency, index) => {
		if (dependency !== previousDeps[index]) {
			const keyName = dependencyNames[index] || index
			return {
				...accum,
				[keyName]: {
					before: previousDeps[index],
					after: dependency
				}
			}
		}

		return accum
	}, {})

	if (Object.keys(changedDeps).length) {
		console.log('[useEffectDebugger] ', changedDeps)
	}

	useEffect(effectHook, dependencies)
}

export default useEffectDebugger