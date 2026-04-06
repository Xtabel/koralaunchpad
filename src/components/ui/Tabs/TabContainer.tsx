import React from 'react'
import Background from '@/components/ui/Paper/Background'
import { CircularProgress } from '@mui/material'


interface TabContainerProps {
  activeComponent: React.ComponentType
  loading?: boolean
}

const TabContainer: React.FC<TabContainerProps> = ({ 
  activeComponent: ActiveComponent, 
  loading = false
}) => {
  return (
    <Background sx={{ padding: "20px", marginTop:"20px", borderRadius:"10px", border: "none", minHeight: "500px" }}>
      {loading ? (
        <CircularProgress />
      ) : (
          <ActiveComponent />
      )}
    </Background>
  )
}

export default TabContainer