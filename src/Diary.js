import React, {Fragment} from 'react';

class Diary extends React.Component {
  static navigationOptions = {
    title: 'Diary',
  };
  render() {
    const {navigate} = this.props.navigation;
    return <Button title="Go home" onPress={() => navigate('MainScreen')} />;
  }
}

export default Diary;
