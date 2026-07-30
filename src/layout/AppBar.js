import { useEffect, useState } from 'react'
import { AppBar as ComponentAppBar, TitlePortal } from 'react-admin'
import restClient from '../providers/restClient'

const AppBar = () => {
  const [locations, setLocations] = useState([])
  const [locationId, setLocationId] = useState(localStorage.getItem('location_id') || '')

  useEffect(() => {
    restClient.getList('locations', { pagination: { page: 1, perPage: 100 }, sort: { field: 'id', order: 'ASC' } })
      .then(({ data }) => setLocations(data.filter(l => l.active_flag)))
      .catch(err => console.log('Error fetching locations', err))
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
