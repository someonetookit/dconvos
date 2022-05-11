import React from 'react';
import PropTypes from 'prop-types';

import { twemojify } from '../../../util/twemojify';

import initMatrix from '../../../client/initMatrix';
import { openInviteUser } from '../../../client/action/navigation';
import * as roomActions from '../../../client/action/room';
import { markAsRead } from '../../../client/action/notifications';

import { MenuHeader, MenuItem } from '../../atoms/context-menu/ContextMenu';
import RoomNotification from '../room-notification/RoomNotification';

import TickMarkIC from '../../../../public/res/ic/outlined/tick-mark.svg';
import AddUserIC from '../../../../public/res/ic/outlined/add-user.svg';
import LeaveArrowIC from '../../../../public/res/ic/outlined/leave-arrow.svg';

//---------changes-----------------------------//
import DoneAllIcon from '@mui/icons-material/DoneAll';
import PersonAddAltOutlinedIcon from '@mui/icons-material/PersonAddAltOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import styles from './RoomOptions.module.css'

function RoomOptions({ roomId, afterOptionSelect }) {
  const mx = initMatrix.matrixClient;
  const room = mx.getRoom(roomId);
  const canInvite = room?.canInvite(mx.getUserId());

  const handleMarkAsRead = () => {
    markAsRead(roomId);
    afterOptionSelect();
  };

  const handleInviteClick = () => {
    openInviteUser(roomId);
    afterOptionSelect();
  };
  const handleLeaveClick = () => {
    if (confirm('Are you really want to leave this room?')) {
      roomActions.leave(roomId);
      afterOptionSelect();
    }
  };

  return (
    <div style={{ maxWidth: '300px' }}>
      {<span className={styles.menuHeader}>Options for {initMatrix.matrixClient.getRoom(roomId)?.name}</span>}
      <div className={styles.addOptions} onClick={handleMarkAsRead}>
        <div className={styles.optionIcons}><DoneAllIcon sx={{color:'var(--text-primary)'}}/></div>
        <span className={styles.optionTexts}>Mark as read</span>
      </div>
      <div className={styles.addOptions} onClick={handleInviteClick}
        disabled={!canInvite}>
        <div className={styles.optionIcons}><PersonAddAltOutlinedIcon sx={{color:'var(--text-primary)'}}/></div>
        <span className={styles.optionTexts}>Invite</span>
      </div>
      <div className={styles.addOptions} onClick={handleLeaveClick}>
        <div className={styles.optionIcons}><LogoutOutlinedIcon sx={{color:'red'}}/></div>
        <span className={styles.optionTexts}>Leave</span>
      </div>
      <div className={styles.menuHeader}>Notification</div>
      
      {/* <MenuHeader>{twemojify(`Options for ${initMatrix.matrixClient.getRoom(roomId)?.name}`)}</MenuHeader>
      <MenuItem iconSrc={TickMarkIC} onClick={handleMarkAsRead}>Mark as read</MenuItem>
      <MenuItem
        iconSrc={AddUserIC}
        onClick={handleInviteClick}
        disabled={!canInvite}
      >
        Invite
      </MenuItem>
      <MenuItem iconSrc={LeaveArrowIC} variant="danger" onClick={handleLeaveClick}>Leave</MenuItem>
      <MenuHeader>Notification</MenuHeader> */}
      <RoomNotification roomId={roomId} />
    </div>
  );
}

RoomOptions.defaultProps = {
  afterOptionSelect: null,
};

RoomOptions.propTypes = {
  roomId: PropTypes.string.isRequired,
  afterOptionSelect: PropTypes.func,
};

export default RoomOptions;
