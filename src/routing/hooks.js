import { useLocation } from 'react-router-dom'
import { getQueryFromUri } from './utils' 

export function useQueryParams() {
  const location = useLocation()
  const queryParams = getQueryFromUri(`http://reacticoon.fr/${location.search}`)
  return queryParams
}