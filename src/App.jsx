import { useEffect, useState } from 'react'
import { pastCells, getCellTime, isWeekend } from './utils/speciel-day'
import './App.css'

const App = () => {
  const TIP_NODE_CLASS = 'incomplete'
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      checkWorkTime()
    }, 500)
  })

  // 移除已添加的工时提示DOM
  const removeTipNodes = () => {
    const tipNodes = document.querySelectorAll(`.${TIP_NODE_CLASS}`)
    tipNodes.forEach(tipNode => {
      tipNode.parentElement.removeChild(tipNode)
    })
  }

  // 确认工时
  const checkWorkTime = () => {
    removeTipNodes()

    const cells = pastCells()
    let complete = true
    cells.forEach(cell => {
      const cellClass = cell.getAttribute('class').split(' ')
      const timeList = getCellTime(cell)
      const totalTime = timeList.length
        ? timeList.reduce((a, b) => {
            return a + b
          })
        : 0

      if (totalTime >= 8) {
        // 记录工时正常
        return
      } else if (totalTime === 0) {
        // 双休日不记录工时（不判断加班）
        if (isWeekend(cellClass)) {
          return
        }
      }

      // 工作日记录工时不足8小时（不判断节假日）
      const heading = cell.children[0].children[0]
      const numberNode = heading.children[1]
      const tipNode = document.createElement('span')
      tipNode.innerHTML = `缺 ${(8 - totalTime).toFixed(2)} h`
      tipNode.style.fontWeight = 600
      tipNode.style.color = 'red'
      tipNode.style.paddingRight = '5px'
      tipNode.setAttribute('class', TIP_NODE_CLASS)

      heading.insertBefore(tipNode, numberNode)
      complete = false
    })
    setIsComplete(complete)
  }

  return (
    <div className="App">
      <div className="btns">
        <button onClick={checkWorkTime}>确认工时</button>
        {/* <span className="rest">添加调休节日</span> */}
      </div>

      {isComplete && <div className="noError">工时没问题</div>}
    </div>
  )
}

export default App
