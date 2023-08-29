import React, {
  useState,
  useEffect,
  useContext,
  type ReactElement
} from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

function LineChart (): ReactElement {
  const data = {
    labels: ['x', 'xx', 'xxx', 'xxxx', 'xxxx'],
    datasets: [
      {
        label: 'Responce Time',
        data: [1, 2, 3, 2, 6],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false
      }
    ]
  }
  return (
    <div className="line-chart">
      <Line data={data} />
    </div>
  )
}

export default LineChart
