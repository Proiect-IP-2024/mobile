import React, { useState, useEffect } from 'react';
import { View, Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import jsonData from './EKF.json'; // Importing JSON data

const screenWidth = Dimensions.get('window').width;

const EKGChart = () => {
  const [data, setData] = useState<number[]>([]);
  const [sensorData, setSensorData] = useState<number[]>(jsonData);

  useEffect(() => {
    const initialData = sensorData.slice(0, 11); // Set initial chunk of 11 elements
    setData(initialData);

    const interval = setInterval(() => {
      setSensorData((prevSensorData) => {
        const newData = prevSensorData.slice(0, 11);
        setData(newData);
        return prevSensorData.slice(11).concat(newData); // Rotate data
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [sensorData]);

  return (
    <View>
      <LineChart
        data={{
          labels: ["", "", "", "", "", "", "", "", "", "", ""],
          datasets: [
            {
                
              data: data,
              color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`, // Line color
              strokeWidth: 2, // Line thickness
            },
          ],
        }}
        width={screenWidth -40 } // from react-native
        height={220}
        
        yAxisLabel=""
        yAxisSuffix=""
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: '#022173',
          backgroundGradientFrom: '#1D2B64',
          backgroundGradientTo: '#F8CDDA',
          decimalPlaces: 2,
          color: (opacity = 0.5) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
            
          },
          propsForDots: {
            r: "6",
            strokeWidth: "1",
            stroke: "#ffa726",
          },
        }}
        bezier={false} // Disable bezier curve
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
};

export default EKGChart;
