import React from 'react'
import {Line} from 'react-chartjs-2'
import {Chart as ChartJS} from 'chart.js/auto'

export default function LineChart() {
  return (
    <div>
        <Line
            data={{
                labels: ['January','February','March','April','May','June','July','August','September','October','November','December'],
                datasets:[{
                    label:'Sale History'
                }]
            }}
            options={{
                maintainAspectRatio:true,
                scales: {
                    x: {
                        grid: {
                          display: false
                        }
                      },
                    y: {
                        grid: {
                          display: false
                        },
                        max: 5,
                        min: 0,
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }}
            height={40}
            width={100}
        />
    </div>
  )
}
