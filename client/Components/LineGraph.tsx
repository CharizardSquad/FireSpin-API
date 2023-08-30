import React, {
  useState,
  useEffect,
  useContext,
  type ReactElement
} from 'react'
import { Line } from 'react-chartjs-2'
import { Chart, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js'
import { GlobalContext } from './Contexts'

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
)

function LineChart ({ responseTimes }: { responseTimes: number[] }): ReactElement {
  // console.log('resTime in lineGraph:', responseTimes)
  const { historyData, selectedDataset, setSelectedDataset } = useContext(GlobalContext)

  const [chartData, setChartData] = useState<number[]>([])

  useEffect(() => {
    const selectedData = historyData.find((data) => data.apiUrl === selectedDataset)
    if (selectedData != null) {
      setChartData(selectedData.responseTimesArray)
    }else {
      setChartData([])
    }
  }, [historyData, selectedDataset])

  const data = {
    labels: chartData.map((_, index) => index.toString()),
    datasets: [
      {
        label: 'Responce Time',
        data: chartData,
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false
      }
    ]
  }
  return (
    // <div className="lineGraph">
    //   <Line data={data} />
    // </div>
    <div className="lineGraph">
      <select onChange={(e) => setSelectedDataset(e.target.value)}>
        {historyData.map((data) => (
          <option key={data.apiUrl} value={data.apiUrl}>
            {data.apiUrl}
          </option>
        ))}
      </select>
      <Line data={data} />
    </div>
  )
}

export default LineChart
