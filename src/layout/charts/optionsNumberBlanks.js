export default {
  chart: {
    type: 'line',
  },
  title: {
    text: 'Number of blanks created each day',
    align: 'center'
  },
  xAxis: {
    categories: [],
  },
  yAxis: {
    title: {
      text: 'Number of Blanks'
    }
  },
  series: [{
    name: 'Number of Blanks',
    color: '#c16912',
    data: []
  }],
  credits: {
    enabled: false
  },
}