import React from 'react';
import { Button, Icon} from '@ui-kitten/components';

const LocateIcon = (props) => (
    <Icon name='pin' {...props} />
);

const LocateButton = () => {
    
  return (
    <Button title="Locate" accessoryLeft={LocateIcon}>Locate</Button>
  );
}

export default LocateButton;