import {
  Button
} from '@mui/material'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import restClient from '../../providers/restClient'
import optionsNumberBlanksInitial from './optionsNumberBlanks'
import optionsNumberJobsInitial from './optionsNumberJobs'

const Charts = () => {
  const [filters, setFilters] = useState({
    startDate: null,
    endDate: null,
  })

  const [options, setOptions] = useState({
    optionJobs: optionsNumberJobsInitial,
    optionBlanks: optionsNumberBlanksInitial,
  })

  const submitFilters = (e) => {
    e.preventDefault()
    const startDate = e.currentTarget.elements.startDate.value
    const endDate = e.currentTarget.elements.endDate.value

    setFilters({
      startDate,
      endDate,
    })
  }

  const getDataCharts = async() => {
    if(!filters.startDate || !filters.endDate) {
      return
    }

    const response = await restClient.getCustom('charts', {
      start_date: filters.startDate,
      end_date: filters.endDate,
    })
  
    const dataJobs = response.data.number_of_jobs_created_each_day
    const dataBlanks = response.data.number_of_blanks_created_each_day

    const optionJobs = {...options.optionJobs}
    const optionBlanks = {...options.optionBlanks}
  
    optionJobs.xAxis.categories = dataJobs.dates
    optionJobs.series[0].data = dataJobs.data

    optionBlanks.xAxis.categories = dataBlanks.dates
    optionBlanks.series[0].data = dataBlanks.data

    setOptions({
      optionJobs,
      optionBlanks,
    })
  }

  useEffect(() => {
    getDataCharts()
  }, [filters])

  return (
    <>
      <form
        onSubmit={submitFilters}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <h3>
          Selected dates:
        </h3>

        <input
          type='date'
          name='startDate'
        />
        <input
          type='date'
          name='endDate'
        />
        <Button color='secondary' variant='contained' type='submit'>
          Filter
        </Button>
      </form>

      {
        options.optionJobs?.series[0].data.length === 0
          ? <div style={{ padding: '5rem', margin: 'auto' }}>
              Empty of number of jobs
            </div>
          : <HighchartsReact
              highcharts={Highcharts}
              options={options.optionJobs}
            />
      }

      <div style={{ margin: '1rem 0'}} />
    
      {
        options.optionBlanks?.series[0].data.length === 0
          ? <div style={{ padding: '5rem', margin: 'auto' }}>
              Empty of number of blanks
            </div>
          : <HighchartsReact
              highcharts={Highcharts}
              options={options.optionBlanks}
            />
      }
    </>
  )
}

export default Charts