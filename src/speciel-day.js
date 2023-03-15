// 获取已经过的日期DOM（包括上个月的 和 今天）
export const pastCells = () => {
  const cells = document.querySelectorAll('.cell-day:not(.future)')
  const current = document.querySelector('.cell-day.current')
  return current ? [...cells, current] : [...cells]
}

// 获取该cell里记录的工时
export const getCellTime = cell => {
  const day = cell.children[0]
  const content = day.children[1]
  const events = content.children[0]
  const timeHTMLCollection = events.children.length ? events.children : [] // 类数组对象
  const timeNodeList = Array.from(timeHTMLCollection) // 数组，也可以用解构转换

  const timeList = []
  timeNodeList.forEach(event => {
    const time = event.children[1].innerHTML
    timeList.push(Number(time.split('h')[0]))
  })
  return timeList
}

// 是否是周末（根据cell的class判断）
export const isWeekend = cellClass => {
  return cellClass.filter(item => item === 'weekend-day').length > 0
}
