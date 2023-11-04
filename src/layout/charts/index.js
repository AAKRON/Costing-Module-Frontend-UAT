import {
  Button,
  Divider,
  Input,
} from '@mui/material'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import { getDate } from '../../helpers/functions'
import restClient from '../../providers/restClient'
import optionsBlanksTypeInitial from './optionsBlanksType'
import optionsItemsTypeInitial from './optionsItemsType'
import optionsBlanksInitial from './optionsNumberBlanks'
import optionsItemsInitial from './optionsNumberItems'
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
    </>
  )
}

const Charts = () => {
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
  })

  const [options, setOptions] = useState({
    optionJobs: optionsJobsInitial,
    optionBlanks: optionsBlanksInitial,
    optionBlanksType: optionsBlanksTypeInitial,
    optionItems: optionsItemsInitial,
    optionItemsType: optionsItemsTypeInitial,
  })

  const submitFilters = (e) => {
    e.preventDefault()
    getDataCharts({
      startDate: filters.startDate,
      endDate: filters.endDate,
    })
  }

  const getDataCharts = async({ startDate, endDate }) => {
    const response = await restClient.getCustom('charts', {
      start_date: startDate,
      end_date: endDate,
    })
  
    const dataJobsByDay = response.data.number_of_jobs_created_each_day
    const dataBlanksByDay = response.data.number_of_blanks_created_each_day
    const dataItemsByDay = response.data.number_of_items_created_each_day
    const dataItemsType = response.data.number_of_items_by_type
    const dataBlanksType = response.data.number_of_blanks_by_type

    const optionJobs = {...options.optionJobs}
    const optionBlanks = {...options.optionBlanks}
    const optionBlanksType = {...options.optionBlanksType}
    const optionItems = {...options.optionItems}
    const optionItemsType = {...options.optionItemsType}
  
    optionJobs.xAxis.categories = dataJobsByDay.dates
    optionJobs.series[0].data = dataJobsByDay.data

    optionBlanks.xAxis.categories = dataBlanksByDay.dates
    optionBlanks.series[0].data = dataBlanksByDay.data

    optionBlanksType.series[0].data = dataBlanksType.data.map((_, index) => ({
      name: dataBlanksType.categories[index],
      y: dataBlanksType.data[index]
    }))

    optionItems.xAxis.categories = dataItemsByDay.dates
    optionItems.series[0].data = dataItemsByDay.data

    optionItemsType.series[0].data = dataItemsType.data.map((_, index) => ({
      name: dataItemsType.categories[index],
      y: dataItemsType.data[index]
    }))

    setOptions({
      optionJobs,
      optionBlanks,
      optionBlanksType,
      optionItems,
      optionItemsType,
    })
  }

  useEffect(() => {
    setFilters({
      startDate: getDate({ day: 1 , year: localStorage.getItem('db')}),
      endDate: getDate({ year: localStorage.getItem('db')}),
    })

    getDataCharts({
      startDate: getDate({ day: 1 , year: localStorage.getItem('db')}),
      endDate: getDate({ year: localStorage.getItem('db')}),
    })
  }, [localStorage.getItem('db')])

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
            inputProps={{
              max: getDate({ day: 31, month: 12, year: localStorage.getItem('db')}),
              min: getDate({ day: 1, month: 1, year: localStorage.getItem('db')}),
            }}
            onChange={(e) => {
              setFilters({
                ...filters,
                startDate: e.target.value
              })
            }}
          />
        
          <Input
            type='date'
            inputProps={{
              max: getDate({ day: 31, month: 12, year: localStorage.getItem('db')}),
              min: getDate({ day: 1, month: 1, year: localStorage.getItem('db')}),
            }}
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

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
        {GenerateComponent(options.optionBlanks, 'Number of blanks created each day')}
        {GenerateComponent(options.optionItems, 'Number of items created each day')}
      </div>

      <Divider />

      <h3>
        Number of blanks and items by type all time
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr'}}>
        {GenerateComponent(options.optionBlanksType, 'Number of blanks by type')}
        {GenerateComponent(options.optionItemsType, 'Number of items by type')}
      </div>
    </>
  )
}

export default Charts