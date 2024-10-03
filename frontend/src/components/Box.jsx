import React from 'react'
import MUIBox from '@mui/material/Box';

function Box (props) {
  return (
    <MUIBox
      {...props}
      sx={{
        // marginRight: '5px',
        // marginBottom: '15px',
        ...props.sx,
      }}
      >
        {props.children}
      </MUIBox>
  );
}

export default Box;
