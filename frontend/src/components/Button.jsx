import React from 'react'
import MUIButton from '@mui/material/Button'

function Button (props) {
  return (
    <MUIButton
      {...props}
      role='button'
      variant='text'
      sx={{
        ...props.sx,
      }}
    >
      {props.children}
    </MUIButton>
  );
}

export default Button;
