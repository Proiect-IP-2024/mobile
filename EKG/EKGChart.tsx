import React from 'react';
import { View, StyleSheet } from 'react-native';
import { LineChart, Grid } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

const data = [0, 20, 10, 30, 15, 40, 25, 60, 45, 50, 60, 55, 70, 65, 80, 75, 90, 85, 100];

const EKGChart = () => {
  return (
    <View style={styles.container}>
      <LineChart
        style={{ height: 200 }}
        data={data}
        svg={{ stroke: 'rgb(134, 65, 244)' }}
        contentInset={{ top: 20, bottom: 20 }}
        curve={shape.curveNatural}
      >
        <Grid />
      </LineChart>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
});

export default EKGChart;
