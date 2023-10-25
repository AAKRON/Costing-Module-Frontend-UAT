export default {
  chart: {
    type: 'pie',
  },
  title: {
    text: 'Number of blanks by type',
    align: 'center'
  },
  yAxis: {
    title: {
      text: 'Number of Blanks'
    }
  },
  series: [{
    name: 'Number of Blanks',
    data: []
  }],
  credits: {
    enabled: false
  },
}