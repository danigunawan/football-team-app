import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements';

class Create extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: "",
      skill: "0"
    }

    this.handleSubmit = this.handleSubmit.bind(this);

  }

  handleSubmit(e) {
    e.preventDefault();

    let player_name = this.state.value;
    let skill = +this.state.skill

    this.props.onSubmit(player_name, skill);

    this.setState({
      value: "",
      skill: "0"
    });

    this.props.navigation.navigate('Players');
  }

  render() {

    let { value, skill } = this.state;
    let valueError = value.length < 1 || value.length > 30 ? true : false;
    let skillError = skill === "1" || skill === "2" || skill === "3" ? false : true;

    return(
      <View>
        <FormLabel>Name</FormLabel>
        <TextInput
          placeholder='Player Name'
          autoCapitalize='none'
          autoCorrect={false}
          autoFocus={true}
          keyboardType='default'
          value={this.state.value}
          onChangeText={(text) => this.setState({ value: text })} />
        { valueError ? <FormValidationMessage>{'Name must be between 1 and 30 characters'}</FormValidationMessage> : null }
        <FormLabel>Skill</FormLabel>
        <TextInput
          placeholder='Skill'
          autoCapitalize='none'
          keyboardType='number-pad'
          autoCorrect={false}
          value={this.state.skill}
          onChangeText={(num) => this.setState({ skill: num })} />
        { skillError ? <FormValidationMessage>{'Skill must be between 1 and 3'}</FormValidationMessage> : null }
        <Button
          title="Add Player"
          onPress={this.handleSubmit}
        />
      </View>
    )
  }
}

Create.navigationOptions = {
  title: 'Add a Player',
};

export default Create;