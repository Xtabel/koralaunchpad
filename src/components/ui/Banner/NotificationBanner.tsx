import React from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  useTheme,
  Skeleton,
  Stack,
  Tooltip,
} from '@mui/material';
import { dashboardBanner } from '@/assets/img';
import { EmptyStates, InfoIcon } from '@/assets/icons';
import { CustomButton } from '../Button';

interface NotificationBannerProps {
  title: string;
  count1?: number;
  count2?: number;
  messageTemplate: string;
  icon?: React.ReactNode;
  backgroundImage?: string;
  loading?: boolean;
  infoMsg?: string;
  onclick?: () => void;
  disabled?: boolean;
    buttonText?: string;
  messageStyle?: React.CSSProperties;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  title,
  count1,
  count2,
  messageTemplate,
  icon,
  backgroundImage = dashboardBanner,
  loading,
  infoMsg,
  onclick,
  disabled,
  buttonText = "Apply",
  messageStyle,
}) => {
  const message = messageTemplate.replace('{count1}', count1?.toString() || '0').replace('{count2}', count2?.toString() || '0');
  const theme = useTheme();
  return (
    <Paper
      elevation={0}
      sx={{
        padding: '24px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderRadius: '16px',
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: 'cover',
        width: '100%',
        height: '106px',
        border: `1px solid ${theme.palette.grey['A700']}`,
        // backgroundPosition: 'center',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          gap: '12px',
          color: '#FFFFFF',
          flex: 1,
          minWidth: 0,
        }}
      >
        <IconButton
          disableFocusRipple
          disableRipple
          disableTouchRipple
          sx={{
            backgroundColor: 'primary.dark',
            borderRadius: '50%',
            color: '#FFFFFF',
            padding: '14px',
            cursor: 'default',
            '&:hover': {
              backgroundColor: '##5AA0881A',
            },
          }}
        >
          {icon || <EmptyStates.EmptyDashboardIcon sx={{ fontSize: '20px' }} />}
        </IconButton>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0px',
            justifyContent: 'space-between',
            flexDirection: 'column',
          }}
        >
          <Stack direction={"row"} alignItems={"top"} gap={0.2}>
            <Typography
              sx={{
                fontSize: '16px',
                lineHeight: '25.6px',
                letterSpacing: '-0.02px',
                fontWeight: '700',
                fontFamily: 'Avertape, sans-serif',
                opacity: '1',
                color: '#FFFFFF',
              }}
            >
              {title}
            </Typography>
            {infoMsg && (
              <Tooltip title={infoMsg} placement="top" arrow>
                <InfoIcon sx={{ fontSize: '16px', color: '#FFFFFF', opacity: 0.8 }} />
              </Tooltip>
            )}
          </Stack>
          {loading ? (
            <Skeleton
              variant="rectangular"
              width="100px"
              height="24px"
              sx={{
                borderRadius: '4px',
                backgroundColor: theme.palette.primary.light,
              }}
            />
          ) : (
            <Typography
              fontWeight={500}
              fontSize={{ xs: '12px', sm: '12px', md: '12px', lg: '12px' }}
              fontFamily="Avertape, sans-serif"
              lineHeight="30px"
              color='#CACCCF'
              sx={{...messageStyle ?? {}}}
            
            >
              {message}
            </Typography>
          )}
        </Box>
      </Box>
     {buttonText &&  <Stack width={"fit-content"} direction="row" alignItems="center" spacing={{ xs: 1.0, sm: 2.0 }} sx={{ flexShrink: 0 }}>
        <CustomButton
        onClick={onclick}
        variant="contained"
        disabled={disabled}
        sx={{ fontSize: '10px !important', bgcolor:"common.white", width: "fit-content", whiteSpace: 'nowrap', color: 'primary.main', padding: '6px 16px' }}
      >
        {buttonText}
      </CustomButton>
        </Stack>}
    </Paper>
  );
};

export default NotificationBanner;
