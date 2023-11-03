export default {
  chart: {
    type: 'pie',
  },
  title: {
    text: 'Number of items by type',
    align: 'center'
  },
  yAxis: {
    title: {
      text: 'Number of Items'
    }
  },
  series: [{
    name: 'Number of Items',
    data: []
  }],
  credits: {
    enabled: false
  },
}