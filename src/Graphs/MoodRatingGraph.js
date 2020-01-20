import React from 'react';

import {Button, View, Text} from 'react-native';

import {selectAllDailyMoods} from '../Database.js';
import GenerateGraphs from './GenerateGraphs.js';

class MoodRatingGraph extends React.Component {
  static navigationOptions = {
    title: 'Mood History',
  };

  render = () => {
    const {navigate} = this.props.navigation;
    return (
      <View>
        <Button title="Go home" onPress={() => navigate('MainScreen')} />
        <Text>Mood History</Text>
        <GenerateGraphs cb={selectAllDailyMoods} />
      </View>
    );
  };
}

export default MoodRatingGraph;
