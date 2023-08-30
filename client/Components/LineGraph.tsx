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

function LineChart ({ responseTimes }: { responseTimes: number[] }): ReactElement {
  console.log('resTime in lineGraph:', responseTimes)
  
  const data = {
    labels: responseTimes.map((_, index) => index.toString()),
    datasets: [
      {
        label: 'Responce Time',
        data: responseTimes,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false
      }
    ]
  }
  return (
    <div className="lineGraph">
      <Line data={data} />
    </div>
  )
}

export default LineChart
