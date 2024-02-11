import React, { useEffect, useState } from 'react';
import { PieChart } from '@mui/x-charts/PieChart';

interface MonthlySpendingItem {
  date: string;
  icon: string;
  name: string;
  value: number;
}

interface LineChartProps {
  monthlySpendingRedux: MonthlySpendingItem[];
  valueRedux: string;
}

interface ChartDimensions {
  width: number;
  height: number;
}

const palette = ['#6115c4', 'skyblue', 'yellow', '#202020'];

const Chart: React.FC<LineChartProps> = ({ monthlySpendingRedux, valueRedux }) => {
  console.log(valueRedux)
  const sortedArray = monthlySpendingRedux.sort((a, b) => b.value - a.value);

  const topFourValues = sortedArray.slice(0, 4);

  console.log(topFourValues);


  const [chartDimensions, setChartDimensions] = useState<ChartDimensions>({
    width: 0,
    height: 0
  });

  useEffect(() => {
    const calculateChartDimensions = () => {
      const windowWidth = window.innerWidth;

      if (windowWidth <= 600) {
        setChartDimensions({
          width: 410, 
          height: 180 
        });
      } else if (windowWidth > 600 && windowWidth <= 1024) {
        setChartDimensions({
          width: 500,
          height: 220
        });
      } else {
        setChartDimensions({
          width: 510,
          height: 220
        });
      }
    };

    calculateChartDimensions();

    window.addEventListener('resize', calculateChartDimensions);

    return () => {
      window.removeEventListener('resize', calculateChartDimensions);
    };
  }, []);

  return (
    <div className='home-chart'>
      <PieChart
        series={[
          {
            data: topFourValues.map((item, index) => ({
              id: index,
              value: item.value, 
            })),
          },
        ]}
        height={chartDimensions.height}
        width={chartDimensions.width}
        colors={palette}
        margin={{
          left: 0,
          right: 310,
          bottom: 80,
        }}
        slotProps={{
          legend: {
            direction: 'column',
            position: { vertical: 'top', horizontal: 'left' },
            labelStyle: {
              marginTop: '20vw',
              fontSize: "3vw",
              fill: 'white',
              overflow:'scroll'
            },
          },
        }}
      />
    </div>
  );
};

export default Chart;
