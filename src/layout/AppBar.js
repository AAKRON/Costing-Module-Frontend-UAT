import { useEffect, useState } from 'react'
import { AppBar as ComponentAppBar, TitlePortal } from 'react-admin'
import restClient from '../providers/restClient'

const AppBar = () => {
  const [locations, setLocations] = useState([])
  const [locationId, setLocationId] = useState(localStorage.getItem('location_id') || '')

  useEffect(() => {
    // LocationsController#index paginates with a hardcoded per_page=10 and
    // derives the page from _end/10 (ignoring _start) - perPage must be 10
    // here for _end to resolve to page 1 instead of some empty later page.
    restClient.getList('locations', { pagination: { page: 1, perPage: 10 }, sort: { field: 'id', order: 'ASC' } })
      .then(({ data }) => {
        console.log('[AppBar] locations response:', data)
        setLocations(data.filter(l => l.active_flag !== false && l.active_flag !== 0))
      })
      .catch(err => console.log('[AppBar] Error fetching locations', err))
  }, [])

  const handleChange = (e) => {
    const value = e.target.value
    setLocationId(value)
    if (value) {
      localStorage.setItem('location_id', value)
    } else {
      localStorage.removeItem('location_id')
    }
    window.location.reload()
  }

  return (
    <ComponentAppBar color='primary'>
      <TitlePortal />

      <span style={{ marginRight: '1.5rem' }}>
        Database: {localStorage.getItem('db')}
      </span>

      <select value={locationId} onChange={handleChange}>
        <option value=''>All Locations</option>
        {locations.map(l => (
          <option key={l.id} value={l.id}>{l.name}</option>
        ))}
      </select>
    </ComponentAppBar>
  )
}

export default AppBar
