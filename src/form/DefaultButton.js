import React from 'react';
import { Button, Icon, ListItem} from '@ui-kitten/components';
import { StyleSheet, Text, View } from 'react-native';

// const DefaultIcon = (props) => (
//     <Icon name={props.iconName} {...props}/>
// );
// accessoryLeft={DefaultIcon(item)}
const DefaultButton = (item) => {
    
  return (
    <Button accessoryLeft={() =><Icon name={item.iconName} style={{height:20, width:20}}/>} onPress={item.onPress} style={{height:item.height, width: item.width, backgroundColor:'white' ,borderWidth: 0}} />
  );
}

export default DefaultButton;

const styles = StyleSheet.create({
    locate: {
        fontStyle: 'italic',
         backgroundColor: 'white'
    },
});