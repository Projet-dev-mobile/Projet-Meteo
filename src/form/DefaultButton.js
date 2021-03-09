import React from 'react';
import { Button, Icon, ListItem} from '@ui-kitten/components';
import { StyleSheet, Text, View } from 'react-native';

// const DefaultIcon = (props) => (
//     <Icon name={props.iconName} {...props}/>
// );
// accessoryLeft={DefaultIcon(item)}
const DefaultButton = (item) => {
    
  return (
    <Button appearance='ghost' accessoryLeft={() =><Icon name={item.iconName} style={{height:30, width:30}}/>} onPress={item.onPress} style={{borderWidth: 0}} />
  );
}

export default DefaultButton;

const styles = StyleSheet.create({
    locate: {
        fontStyle: 'italic',
    },
});