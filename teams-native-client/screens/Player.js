import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';


class Player extends Component {
  constructor(props) {
    super(props)

    // assigning the player object passed to this screen through the navigation prop to a variable
    const player = this.props.navigation.getParam('body');

    // setting the state to include the data from the variable above
    this.state = {
      value: player.player_name,
      skill: player.skill.toString(),
      id: player.id,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // submits the form with the data filled in by the user
  handleSubmit(e) {
    let { id, value, skill } = this.state;

    e.preventDefault();

    let skillNum = +skill

    this.props.onUpdate(id, value, skillNum);
    this.props.navigation.navigate('Players');
  }

  render() {

    // destructuring the state object
    let { value, skill } = this.state;

    // setting render logic for the error messages and the submit button as a way to validate the form
    let valueError = value.length < 1 || value.length > 30 ? true : false;
    let skillError = skill === "1" || skill === "2" || skill === "3" ? false : true;
    let disabled = (valueError || skillError) ? true : false;

    return (
      <View style={ styles.container }>
        {/* A form is rendered */}
        <FormLabel>Name</FormLabel>
        <TextInput
          placeholder='Player Name'
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={true}
          style={ styles.input }
          keyboardType='default'
          value={ this.state.value }
          onChangeText={(text) => this.setState({ value: text })} />
        { valueError ? <FormValidationMessage>{'Name must be between 1 and 30 characters'}</FormValidationMessage> : null }
        <FormLabel>Skill</FormLabel>
        <TextInput
          placeholder='Skill'
          autoCapitalize='none'
          keyboardType='number-pad'
          autoCorrect={false}
          style={ styles.input }
          value={ this.state.skill }
          onChangeText={(num) => this.setState({ skill: num })} />
        { skillError ? <FormValidationMessage>{'Skill must be between 1 and 3'}</FormValidationMessage> : null }
        <Button
          title="Update Player"
          onPress={ this.handleSubmit }
          disabled={ disabled }
        />
      </View>
    )
  }
}

Player.navigationOptions = ({ navigation }) => ({
  title: navigation.getParam('title'),
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    marginLeft: 20,
    fontSize: 18,
    marginTop: 10
  }
});

export default Player;
