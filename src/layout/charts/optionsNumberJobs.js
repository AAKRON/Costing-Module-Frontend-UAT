export default {
  chart: {
    type: 'line',
  },
  title: {
    text: 'Number of jobs created each day',
    align: 'center'
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
    color: '#752092',
    data: []
  }],
  credits: {
    enabled: false
  },
}