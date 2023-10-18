import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { useEffect, useState } from 'react'
import restClient from '../../providers/restClient'
import optionsNumberJobsInitial from './options'

const Charts = () => {
  const [optionsNumberJobs, setOptionsNumberJobs] = useState(null)

  const getDataCharts = async() => {
    const response = await restClient.getCustom('charts')
    const numberJobs = response.data.number_of_jobs_created_each_day

    const optionsTemp = optionsNumberJobsInitial
    optionsTemp.xAxis.categories = numberJobs.dates
    optionsTemp.series[0].data = numberJobs.data

    setOptionsNumberJobs({ ...optionsTemp })
  }

  useEffect(() => {
    getDataCharts()
  }, [localStorage.getItem('db')])

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={optionsNumberJobs}
    />
  )
}

export default Charts