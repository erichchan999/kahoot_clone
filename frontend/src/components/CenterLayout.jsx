import React from 'react';
import Container from '@mui/material/Container'

function CenterLayout (props) {
  return (
    <Container
      maxWidth="lg"
      {...props}
      sx={{
        textAlign: 'center',
        marginTop: '50px',
        marginBottom: '50px',
        ...props.sx,
      }}
    >
      {props.children}
    </Container>
  );
}

export default CenterLayout;
