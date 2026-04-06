import React from 'react';
import {
  Avatar,
  Box,
  Grid,
  IconButton,
  // Skeleton,
  styled,
  Typography,
  useTheme,
  useMediaQuery,
  Tooltip,
} from '@mui/material';

import Background from '@/components/ui/Paper/Background';
import { boy, girl } from '@/assets/img';
import { CopyIcon, SuccessBadgeColorIcon } from '@/assets/icons/Icons';
import useAuthUser from '@/hooks/auth/useAuthUser';
import dayjs from 'dayjs';
import useFarm from '@/hooks/farm/useFarm';
import { DoneAll } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';
import { useLanguageSync } from '@/hooks';
import { getCountryName } from '@/utils/HelperFunc';

const InfoLabel = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[600],
  fontSize: '10px',
  fontWeight: 400,
  marginBottom: theme.spacing(0.5),
}));

const InfoValue = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[800],
  fontSize: '12px',
  fontWeight: 500,
  wordBreak: 'break-word',
  overflowWrap: 'break-word',
}));

const SectionTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[900],
  fontSize: '12px',
  fontWeight: 500,
  marginBottom: theme.spacing(2),
}));

const backgroundStyle = {
  padding: 2,
  borderRadius: '12px',
  border: '1px solid #ECEEFB',
  marginBottom: 4,
};

const ProfileContent: React.FC = () => {
  useLanguageSync(); // Sync language on component mount
  const { t } = useTranslation();
  const authUser = useAuthUser();
  const { farmData, isRegistered } = useFarm();
  const [isRegIdCopied, setIsRegIdCopied] = React.useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); // Mobile breakpoint (< 600px)
  const userProfile = authUser?.profile;
  const isFarmer = authUser?.userType === 'Farmer';
  const isExtensionOfficer = authUser?.userType === 'ExtensionOfficer';
  const isPolicyMaker = authUser?.userType === 'PolicyMaker';
  const isAdmin = authUser?.userType === 'Admin';
  // const isLoadingEmployee = false;
  const renderGender = userProfile?.gender === 'Female' ? girl : boy;
  const profilePic = userProfile?.exdImage
    ? userProfile.exdImage.startsWith('data:')
      ? userProfile.exdImage
      : `data:image/png;base64,${userProfile.exdImage}`
    : renderGender;

  console.log(authUser, 'Steve Harrington');
  const avatarOptions = userProfile?.gender === 'Female' ? [girl] : [boy];

  const handleCopyRegistrationId = async () => {
    const registrationId = userProfile?.registrationId;
    if (!registrationId) return;

    try {
      await navigator.clipboard.writeText(registrationId);
      setIsRegIdCopied(true);
      setTimeout(() => setIsRegIdCopied(false), 1500);
    } catch {
      setIsRegIdCopied(false);
    }
  };

  const fullName = [userProfile?.firstName, isExtensionOfficer ? null : userProfile?.lastName]
    .filter(Boolean)
    .join(' ');

  const topInfo = [
    { label: t('profile.content.name'), value: fullName },
    {
      label: t('profile.content.registration_id'),
      value:
        isFarmer && !isRegistered
          ? t('profile.content.register_farm_first_for_registration_id')
          : userProfile?.registrationId,
    },
    // { label: 'Phone Number', value: userProfile?.phoneNumber },
  ];

  const personalInfo = [
    { label: t('profile.content.first_name'), value: userProfile?.firstName },
    ...(isExtensionOfficer ? [] : [{ label: t('profile.content.last_name'), value: userProfile?.lastName }]),
    ...(!isAdmin
      ? [{ label: t('profile.content.date_of_birth'), value: dayjs(userProfile?.dob).format('DD, MMMM YYYY') }]
      : []),
    { label: t('profile.content.email_address'), value: userProfile?.email },
    // { label: t('profile.content.phone_number'), value: `${authUser?.countryCode || ''}${userProfile?.phoneNumber}` },
    { label: t('profile.content.phone_number'), value: `${authUser?.countryCode || ''}${userProfile?.phoneNumber}` },
    { label: t('profile.content.gender'), value: userProfile?.gender },
  ];

  const workAddressInfo = [
    { label: t('profile.content.country'), value: getCountryName(userProfile?.country as string)|| t('profile.content.default_country') },
    ...(!isExtensionOfficer ? [] : [{ label: t('profile.content.state'), value: userProfile?.stateName }]),
    ...(!isExtensionOfficer ? [] : [{ label: t('profile.content.lga'), value: userProfile?.lgaName }]),
    ...(!isExtensionOfficer
      ? []
      : [{ label: t('profile.content.geopolitical_zone'), value: userProfile?.geopoliticalZone }]),
    ...(!isExtensionOfficer ? [] : [{ label: t('profile.content.department'), value: userProfile?.department }]),
    ...(!isExtensionOfficer
      ? []
      : [{ label: t('profile.content.account_type'), value: userProfile?.accountType ?? '-' }]),
    ...(isPolicyMaker ? [{ label: t('profile.content.organisation'), value: userProfile?.organization ?? '-' }] : []),
    ...(isPolicyMaker ? [{ label: t('profile.content.interest'), value: userProfile?.interest ?? '-' }] : []),
  ];

  return (
    <Box>
      {/* Profile Photo */}
      <Background sx={{ ...backgroundStyle, bgcolor: '#F9FDFF' }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: isMobile ? 'column' : 'row', // Stack vertically on mobile
            gap: isMobile ? 2 : 2,
            alignItems: isMobile ? 'center' : 'flex-start',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: isMobile ? 'center' : 'center',
              alignItems: isMobile ? 'center' : 'flex-start',
              gap: isMobile ? 2 : 2,
              borderRight: isMobile ? 'none' : '1px dashed #ECEEFB', // Keep border on desktop
              paddingRight: isMobile ? 0 : 2, // Keep padding on desktop
              flexDirection: isMobile ? 'column' : 'row',
            }}
          >
            {/* {isLoadingEmployee ? (
              <Skeleton
                variant="circular"
                width={isMobile ? 80 : 100} // Smaller on mobile
                height={isMobile ? 80 : 100}
                sx={{ position: 'static', flexShrink: 0 }}
              />
            ) : ( */}
              <Box sx={{ position: 'relative' }}>
                <Avatar
                  alt={String(personalInfo[0]?.value || 'Profile Photo')}
                  src={profilePic}
                  sx={{
                    width: isMobile ? 80 : 100,
                    height: isMobile ? 80 : 100,
                    border: '1px dashed #D2D6DB',
                    padding: '4px',
                    '& img': {
                      objectFit: 'cover',
                      borderRadius: 'inherit', // keeps it circular within the padding
                    },
                  }}
                />

                {/* <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: isMobile ? '5px' : '10px', 
                      cursor: 'pointer',
                    }}
                  >
                    <label style={{ cursor: 'pointer' }}>
                      <CameraBoxIcon sx={{ fontSize: isMobile ? '24px' : '30px' }} />{' '}

                      <input
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                      />
                    </label>
                  </Box>
           */}
              </Box>
            {/* )} */}
            <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
              <Grid container spacing={isMobile ? 1 : 2}>
                {' '}
                {/* Adjust spacing for mobile */}
                {topInfo.map((item, index) => (
                  <Grid size={12} key={index}>
                    <InfoLabel>{item.label}</InfoLabel>
                    {item.label === t('profile.content.registration_id') ? (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <InfoValue sx={{ fontSize: isMobile ? '12px' : '13px' }}>
                          {item.value}
                        </InfoValue>
                        {((isRegistered && isFarmer) || !isFarmer) && (
                          <Tooltip title={isRegIdCopied ? t('profile.content.copied') : t('profile.content.copy')}>
                          <span>
                            <IconButton
                              size="small"
                              onClick={handleCopyRegistrationId}
                              disabled={!userProfile?.registrationId}
                              aria-label={t('profile.content.copy_registration_id')}
                            >
                              {isRegIdCopied?<DoneAll sx={{ fontSize: 14 }}/>:<CopyIcon sx={{ fontSize: 14 }} />}
                            </IconButton>
                          </span>
                        </Tooltip>
                        )}
                      </Box>
                    ) : (
                      <InfoValue sx={{ fontSize: isMobile ? '12px' : '13px' }}>
                        {item.value}
                      </InfoValue>
                    )}
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>

          {userProfile?.isApproved && (
            <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
              <InfoLabel>
                {isExtensionOfficer
                  ? t('profile.content.verification_status')
                  : t('profile.content.choose_avatar')}
              </InfoLabel>
              {!isExtensionOfficer ? (
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: isMobile ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)', // Keep 4 columns on desktop
                    gridTemplateRows: isMobile ? 'auto' : 'repeat(3, auto)', // Keep original rows on desktop
                    gap: isMobile ? 0.5 : 1, // Reduce gap on mobile
                    justifyContent: isMobile ? 'center' : 'center',
                    alignItems: 'center',
                  }}
                >
                  {avatarOptions.slice(0, 12).map((avatarOption, index) => (
                    <Avatar
                      key={index}
                      alt={`Avatar ${index + 1}`}
                      src={avatarOption}
                      sx={{
                        width: isMobile ? 32 : 40, // Keep 40x40 on desktop
                        height: isMobile ? 32 : 40,
                        cursor: 'default',
                        border:
                          profilePic === avatarOption
                            ? `1.5px solid ${theme.palette.primary.main}`
                            : '1px solid #DBDDE0',
                        padding: isMobile ? '1px' : '2px', // Keep 2px padding on desktop
                      }}
                    />
                  ))}
                </Box>
              ) : (
                <Tooltip
                  title={
                    userProfile?.isApproved
                      ? t('profile.content.approved')
                      : t('profile.content.not_approved')
                  }
                >
                  <SuccessBadgeColorIcon
                    sx={{
                      fontSize: isMobile ? '24px' : '100px',
                      color: userProfile?.isApproved ? '#00A241' : '#DBDDE0',
                    }}
                  />
                </Tooltip>
              )}
            </Box>
          )}

          {isRegistered && isFarmer && (
            <Box sx={{ textAlign: isMobile ? 'center' : 'left' }}>
              <InfoLabel>{t('profile.content.no_of_farms')}</InfoLabel>
              <InfoValue sx={{ fontSize: isMobile ? '12px' : '13px' }}>
                {farmData ? farmData?.length : 0}
              </InfoValue>
            </Box>
          )}
        </Box>
        {/* <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'end' }}>
          {hasProfilePicChanged && (
            <CustomButton loading={isLoading} onClick={handleUpdateProfile}>
              Update Profile Picture
            </CustomButton>
          )}
        </Box> */}
      </Background>

      {/* Personal Information */}
      <Background sx={{ ...backgroundStyle }}>
        <SectionTitle>{t('profile.content.personal_information')}</SectionTitle>
        <Grid container spacing={isMobile ? 1 : 2}>
          {personalInfo.map((item, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <InfoLabel>{item.label}</InfoLabel>
              <InfoValue>{item.value}</InfoValue>
            </Grid>
          ))}
        </Grid>
      </Background>

      {/* Work/Address Information */}
      {authUser?.userType !== 'Farmer' && (
        <Background sx={{ ...backgroundStyle }}>
          <SectionTitle>{t('profile.content.work_address_information')}</SectionTitle>
          <Grid container spacing={isMobile ? 1 : 2}>
            {workAddressInfo.map((item, index) => (
              <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <InfoLabel>{item.label}</InfoLabel>
                <InfoValue>{item.value}</InfoValue>
              </Grid>
            ))}
          </Grid>
        </Background>
      )}
    </Box>
  );
};

export default ProfileContent;
