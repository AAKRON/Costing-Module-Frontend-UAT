import {
  Button,
  Input,
} from '@mui/material'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { getDate } from '../../helpers/functions'
import restClient from '../../providers/restClient'
import optionsBlanksTypeInitial from './optionsBlanksType'
import optionsBlanksInitial from './optionsNumberBlanks'
import optionsJobsInitial from './optionsNumberJobs'

const GenerateComponent = (options, name) => {
  return (
    <>
      {
        options?.series[0].data.length === 0
          ? <div style={{ padding: '6rem', margin: 'auto', textAlign: 'center' }}>
              {name}
            </div>
          : <HighchartsReact
              highcharts={Highcharts}
              options={options}
            />
      }

      <div style={{ margin: '1rem 0'}} />
    </>
  )
}

const Charts = () => {
  const [filters, setFilters] = useState({
    startDate: getDate({ day: 1 }),
    endDate: getDate({ }),
  })

  const [options, setOptions] = useState({
    optionJobs: optionsJobsInitial,
    optionBlanks: optionsBlanksInitial,
    optionBlanksType: optionsBlanksTypeInitial,
  })

  const submitFilters = (e) => {
    e.preventDefault()
    getDataCharts()
  }

  const getDataCharts = async() => {
    if(!filters.startDate || !filters.endDate) return

    const response = await restClient.getCustom('charts', {
      start_date: filters.startDate,
      end_date: filters.endDate,
    })
  
    const dataJobs = response.data.number_of_jobs_created_each_day
    const dataBlanks = response.data.number_of_blanks_created_each_day
    const dataBlanksType = response.data.number_of_blanks_by_type

    const optionJobs = {...options.optionJobs}
    const optionBlanks = {...options.optionBlanks}
    const optionBlanksType = {...options.optionBlanksType}
  
    optionJobs.xAxis.categories = dataJobs.dates
    optionJobs.series[0].data = dataJobs.data

    optionBlanks.xAxis.categories = dataBlanks.dates
    optionBlanks.series[0].data = dataBlanks.data

    optionBlanksType.series[0].data = dataBlanksType.data.map((_, index) => ({
      name: dataBlanksType.categories[index],
      y: dataBlanksType.data[index]
    }))

    setOptions({
      optionJobs,
      optionBlanks,
      optionBlanksType,
    })
  }

  useEffect(() => {
    getDataCharts()
  }, [])

  return (
    <>
      <form
        onSubmit={submitFilters}
      >
        <h3>
          Selected dates:
        </h3>

        <div 
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <Input
            type='date'
            value={filters.startDate}
            max={filters.endDate}
            onChange={(e) => {
              setFilters({
                ...filters,
                startDate: e.target.value
              })
            }}
          />
        
          <Input
            type='date'
            min={filters.startDate}
            value={filters.endDate}
            onChange={(e) => {
              setFilters({
                ...filters,
                endDate: e.target.value
              })
            }}
          />
          <Button color='secondary' variant='contained' type='submit'>
            Filter
          </Button>
        </div>
      </form>

      {GenerateComponent(options.optionJobs, 'Number of jobs created each day')}
      {GenerateComponent(options.optionBlanks, 'Number of blanks created each day')}
      {GenerateComponent(options.optionBlanksType, 'Number of blanks by type')}
    </>
  )
}

export default Charts