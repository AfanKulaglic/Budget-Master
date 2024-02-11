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

const palette = ['#6115c4', 'yellow', 'green', '#202020'];

const Chart: React.FC<LineChartProps> = ({ monthlySpendingRedux, valueRedux }) => {
  // Sortiranje niza prema vrijednostima u silaznom redoslijedu
  const sortedArray = monthlySpendingRedux.sort((a, b) => b.value - a.value);

  const topFourValues = sortedArray.slice(0, 4);

  console.log(topFourValues);

  //responsive design
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
          height: 250 
        });
      } else if (windowWidth > 600 && windowWidth <= 1024) {
        setChartDimensions({
          width: 400,
          height: 400
        });
      } else {
        setChartDimensions({
          width: 1010,
          height: 340
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
    <div className='statistic-chart'>
      <h6>Spending Statistic</h6>
      <div className='statistic-chart-content'>
        {monthlySpendingRedux.length > 0 ?
        <PieChart
          series={[
            {
              data: topFourValues.map((item, index) => ({
                id: index,
                value: item.value,
                label: item.name + ":" + item.value + " " + valueRedux,
              })),
            },
          ]}
          colors={palette}
          height={chartDimensions.height}
          width={chartDimensions.width}
          margin={{
            left: 80,
            right: 80,
            bottom: 80,
          }}
          slotProps={{
            legend: {
              direction: 'row',
              position: { vertical: 'bottom', horizontal: 'middle' },
              labelStyle: {
                marginTop: '10vw',
                fontSize: "2vh",
                fill: 'white',
              },
            },
          }}
        />
        :
        <img src='https://i.ibb.co/QpbdTkV/Screenshot-2024-01-31-191236-1-preview-rev-1.png' id='img' />
        }
      </div>
    </div>
  );
};

export default Chart;
