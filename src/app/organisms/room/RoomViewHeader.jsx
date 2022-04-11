import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './RoomViewHeader.scss';

import { twemojify } from '../../../util/twemojify';
import { blurOnBubbling } from '../../atoms/button/script';

import initMatrix from '../../../client/initMatrix';
import cons from '../../../client/state/cons';
import navigation from '../../../client/state/navigation';
import { toggleRoomSettings, openReusableContextMenu } from '../../../client/action/navigation';
import { togglePeopleDrawer } from '../../../client/action/settings';
import colorMXID from '../../../util/colorMXID';
import { getEventCords } from '../../../util/common';

import { tabText } from './RoomSettings';
import Text from '../../atoms/text/Text';
import RawIcon from '../../atoms/system-icons/RawIcon';
//import IconButton from '../../atoms/button/IconButton';
import Header, { TitleWrapper } from '../../atoms/header/Header';
import Avatar from '../../atoms/avatar/Avatar';
import RoomOptions from '../../molecules/room-options/RoomOptions';

import ChevronBottomIC from '../../../../public/res/ic/outlined/chevron-bottom.svg';
import SearchIC from '../../../../public/res/ic/outlined/search.svg';
import UserIC from '../../../../public/res/ic/outlined/user.svg';
import VerticalMenuIC from '../../../../public/res/ic/outlined/vertical-menu.svg';

import { useForceUpdate } from '../../hooks/useForceUpdate';
//--------------------------changes-------------------------
import VideocamOutlinedIcon from '@mui/icons-material/VideocamOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
function RoomViewHeader({ roomId }) {
  const [, forceUpdate] = useForceUpdate();
  const mx = initMatrix.matrixClient;
  const isDM = initMatrix.roomList.directs.has(roomId);
  let avatarSrc = mx.getRoom(roomId).getAvatarUrl(mx.baseUrl, 36, 36, 'crop');
  avatarSrc = isDM ? mx.getRoom(roomId).getAvatarFallbackMember()?.getAvatarUrl(mx.baseUrl, 36, 36, 'crop') : avatarSrc;
  const roomName = mx.getRoom(roomId).name;
  console.log(isDM)
  const roomHeaderBtnRef = useRef(null);
  useEffect(() => {
    const settingsToggle = (isVisibile) => {
      const rawIcon = roomHeaderBtnRef.current.lastElementChild;
      rawIcon.style.transform = isVisibile
        ? 'rotateX(180deg)'
        : 'rotateX(0deg)';
    };
    navigation.on(cons.events.navigation.ROOM_SETTINGS_TOGGLED, settingsToggle);
    return () => {
      navigation.removeListener(cons.events.navigation.ROOM_SETTINGS_TOGGLED, settingsToggle);
    };
  }, []);

  useEffect(() => {
    const { roomList } = initMatrix;
    const handleProfileUpdate = (rId) => {
      if (roomId !== rId) return;
      forceUpdate();
    };

    roomList.on(cons.events.roomList.ROOM_PROFILE_UPDATED, handleProfileUpdate);
    return () => {
      roomList.removeListener(cons.events.roomList.ROOM_PROFILE_UPDATED, handleProfileUpdate);
    };
  }, [roomId]);

  const openRoomOptions = (e) => {
    openReusableContextMenu(
      'bottom',
      getEventCords(e, '.ic-btn'),
      (closeMenu) => <RoomOptions roomId={roomId} afterOptionSelect={closeMenu} />,
    );
  };

  return (
    <Header>
      <button
        ref={roomHeaderBtnRef}
        className="room-header__btn"
        onClick={() => toggleRoomSettings()}
        type="button"
        onMouseUp={(e) => blurOnBubbling(e, '.room-header__btn')}
      >
        <Avatar imageSrc={avatarSrc} text={roomName} bgColor={colorMXID(roomId)} size="small" />
        <TitleWrapper>
          <Text variant="h2" weight="medium" primary>{twemojify(roomName)}</Text>
        </TitleWrapper>
        <RawIcon src={ChevronBottomIC} />
      </button>
      <Tooltip title="Search" placement='bottom'><IconButton size='large' onClick={() => toggleRoomSettings(tabText.SEARCH)}><SearchOutlinedIcon sx={{color:'var(--text-primary)'}}/></IconButton></Tooltip>
      <Tooltip title="Video call" placement='bottom'><IconButton size='large'><VideocamOutlinedIcon sx={{color:'var(--text-primary)'}}/></IconButton></Tooltip>
      <Tooltip title="Voice call" placement='bottom'><IconButton size='large'><CallOutlinedIcon sx={{color:'var(--text-primary)'}}/></IconButton></Tooltip>
      <Tooltip title="People" placement='bottom'><IconButton size='large' onClick={togglePeopleDrawer} > <PersonOutlineOutlinedIcon sx={{color:'var(--text-primary)'}}/> </IconButton></Tooltip>
      <Tooltip title="Options" placement='bottom'><IconButton size='large' onClick={openRoomOptions}><MoreVertOutlinedIcon sx={{color:'var(--text-primary)'}}/></IconButton></Tooltip>
      {/* <IconButton onClick={() => toggleRoomSettings(tabText.SEARCH)} tooltip="Search" src={SearchIC} />
      <IconButton onClick={togglePeopleDrawer} tooltip="People" src={UserIC} />
      <IconButton
        onClick={openRoomOptions}
        tooltip="Options"
        src={VerticalMenuIC}
      /> */}
    </Header>
  );
}
RoomViewHeader.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default RoomViewHeader;
