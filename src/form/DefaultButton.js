import React from 'react';
import { Button, Icon, ListItem} from '@ui-kitten/components';
import { StyleSheet, Text, View } from 'react-native';
import SpecialText from '../form/SpecialText';

// const DefaultIcon = (props) => (
//     <Icon name={props.iconName} {...props}/>
// );
// accessoryLeft={DefaultIcon(item)}
const DefaultButton = (item) => {
    
  return (
    <Button status={item.status} children={item.children} appearance={item.appearance} text={item.text} title={item.text} options={{title:{fontFamily: 'Comfortaa', fontSize: 20}}} accessoryLeft={() =><Icon name={item.iconName} style={{height:30, width:30}}/>}  onPress={item.onPress}  />
  );
}

export default DefaultButton;

const styles = StyleSheet.create({
    locate: {
        fontStyle: 'italic',
    },
    title: {
        fontFamily: 'Comfortaa',
        fontSize: 20,
        color : 'black'
      },
});