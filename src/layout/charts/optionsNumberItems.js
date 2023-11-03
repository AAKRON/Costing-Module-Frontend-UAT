export default {
  chart: {
    type: 'line',
  },
  title: {
    text: 'Number of items created each day',
    align: 'center'
  },
  xAxis: {
    categories: [],
  },
  yAxis: {
    title: {
      text: 'Number of Items'
    }
  },
  series: [{
    name: 'Number of Items',
    color: '#c11512',
    data: []
  }],
  credits: {
    enabled: false
  },
}