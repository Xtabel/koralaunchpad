import { Box, Container } from '@mui/material'
import React from 'react'
import { styled } from '@mui/material/styles';
import Breadcrumbs from '@/components/ui/Breadcrumbs';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  ...theme.mixins.toolbar,
}));

const MainContent: React.FC<{children:React.ReactNode}> = ({children}) => {
  return (
    <Box 
      component="main" 
      sx={(theme) => ({ 
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        width: '100%',
        boxSizing: 'border-box',
        overflowX: 'hidden',
        backgroundColor: theme.palette.background.default,
      })}
    >
      <DrawerHeader />
      <Container 
        maxWidth="xl"
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          p: { xs: 2, sm: 3 },
        }}
      >
        <Breadcrumbs />
        <Box 
          sx={{
            flexGrow: 1,
            width: '100%',
            boxSizing: 'border-box',
            mt:3
          }}
        >
          {children}
        </Box>
      </Container>
    </Box>
  )
}

export default MainContent