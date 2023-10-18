export default {
  chart: {
    type: 'line',
  },
  title: {
    text: 'Number of jobs created each day',
    align: 'left'
  },
  xAxis: {
    categories: [],
  },
  yAxis: {
    title: {
      text: 'Number of Jobs'
    }
  },
  series: [{
    name: 'Number of Jobs',
    data: []
  }],
  credits: {
    enabled: false
  },
}