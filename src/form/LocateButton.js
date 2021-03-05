import React from 'react';
import { Button, Icon} from '@ui-kitten/components';
import { StyleSheet, Text, View } from 'react-native';

const LocateIcon = (props) => (
    <Icon name='map-pin' {...props} />
);

const LocateButton = () => {
    
  return (
    <Button title="Locate" accessoryLeft={LocateIcon} style={styles.locate}>Locate</Button>
  );
}

export default LocateButton;

const styles = StyleSheet.create({
    locate: {
        fontStyle: 'italic'
    },
});