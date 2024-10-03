import React from 'react'
import MUITextField from '@mui/material/TextField';

function TextField (props) {
  return (
    <MUITextField
      variant="outlined"
      {...props}
      sx={{
        ...props.sx,
      }}
    >
      {props.children}
    </MUITextField>
  );
}

export default TextField;
