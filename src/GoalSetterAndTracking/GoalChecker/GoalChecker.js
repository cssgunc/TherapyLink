import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Button,
  StatusBar,
  AsyncStorage,
  ViewPagerAndroid
} from 'react-native';
import GoalCard from '../GoalCard/GoalCard'
import CreateGoalCardModal from '../GoalCard/CreateGoalCardModal'

class GoalChecker extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
        verify: [],
        completedItems: {},
        completedItemCount: 0,
        buttonColor: {}
    }
    this.setVerify();
  }

  setVerify = () => [
    this.setState({
        verify: this.props.verify
    })
  ]
  componentDidMount() {
    this.setState({
        verify: this.props.verify
    })
  }

  addCompletedItem = (index) => {
    let newButtonColor = Object.assign({}, this.state.buttonColor);
    newButtonColor[index] = 1;
    if (!this.state.completedItems[index]) {
        let completedItemsReplacement = Object.assign({}, this.state.completedItems);
        completedItemsReplacement[index] = true;
        this.setState({
            completedItems: completedItemsReplacement,
            completedItemCount: this.state.completedItemCount + 1,
            buttonColor: newButtonColor
        });
    } else {
        this.setState({
            buttonColor: newButtonColor
        });
    }
  }

  removeCompletedItem = (index) => {
    let newButtonColor = Object.assign({}, this.state.buttonColor);
    newButtonColor[index] = 2;
    if (this.state.completedItems[index]) {
        let completedItemsReplacement = Object.assign({}, this.state.completedItems);
        completedItemsReplacement[index] = false;
        this.setState({
            completedItems: completedItemsReplacement,
            completedItemCount: this.state.completedItemCount - 1,
            buttonColor: newButtonColor
        });
    } else {
        this.setState({
            buttonColor: newButtonColor
        });
    }
  }

  render() {
    return (
        <View>
        <ScrollView>
          {this.state.verify.map((verifyObj, i) => {
                 let tenTimesPageIndex = i * 10;
                 return (
                     <View key={i}>
                          <Text> For your plan starting {new Date(verifyObj.startDate).toDateString()} and ending {new Date(verifyObj.endDate).toDateString()} have you... </Text>
                          {verifyObj.plan.map((p, i) => {
                            let buttonColorStyle = this.state.buttonColor[tenTimesPageIndex + i];
                            return (
                                <View>
                                    <Text> {p.information}? </Text>
                                    <View style={styles.buttonContainer}>
                                        <Button style={styles.button} color={(buttonColorStyle == null || buttonColorStyle == 2) ? "blue" : "green"} title="Yes 🙂" onPress={() => {this.addCompletedItem(tenTimesPageIndex + i)}}/>
                                        <Button style={styles.button} color={(buttonColorStyle == 2) ? "green" : "blue"} title="Not Yet 🙁" onPress={() => {this.removeCompletedItem(tenTimesPageIndex + i)}}/>
                                    </View>
                                </View>
                            )
                          })}
                     </View>
                 );
          })}
          <View key="done">
            <Button title="Finished Checking Goals" onPress={() => {this.props.finishedGoalVerification(this.state.completedItemCount)}}/>
          </View>
        </ScrollView>
        </View>
      );
  }

}

const styles = StyleSheet.create({
  viewPager: {
    flex: 1
  },
  pageStyle: {
    alignItems: 'center',
    padding: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    margin: 3,
    borderWidth: 1,
    borderColor: 'black',
  },
  button: {
    flex: 1
  }
})

export default GoalChecker;