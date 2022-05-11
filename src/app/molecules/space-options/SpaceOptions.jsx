import React from 'react';
import PropTypes from 'prop-types';

import { twemojify } from '../../../util/twemojify';

import initMatrix from '../../../client/initMatrix';
import { openSpaceSettings, openSpaceManage, openInviteUser } from '../../../client/action/navigation';
import { leave } from '../../../client/action/room';
import {
  createSpaceShortcut,
  deleteSpaceShortcut,
  categorizeSpace,
  unCategorizeSpace,
} from '../../../client/action/accountData';

import { MenuHeader, MenuItem } from '../../atoms/context-menu/ContextMenu';

// import CategoryIC from '../../../../public/res/ic/outlined/category.svg';
// import CategoryFilledIC from '../../../../public/res/ic/filled/category.svg';
// import AddUserIC from '../../../../public/res/ic/outlined/add-user.svg';
// import SettingsIC from '../../../../public/res/ic/outlined/settings.svg';
// import HashSearchIC from '../../../../public/res/ic/outlined/hash-search.svg';
// import LeaveArrowIC from '../../../../public/res/ic/outlined/leave-arrow.svg';
// import PinIC from '../../../../public/res/ic/outlined/pin.svg';
// import PinFilledIC from '../../../../public/res/ic/filled/pin.svg';

//--------------changes---------------------------//
import styles from './SpaceOptions.module.css';
import CategoryOutlinedIcon from '@mui/icons-material/CategoryOutlined';
import CategoryIcon from '@mui/icons-material/Category';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import SearchIcon from '@mui/icons-material/Search';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';
import PushPinIcon from '@mui/icons-material/PushPin';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
function SpaceOptions({ roomId, afterOptionSelect }) {
  const mx = initMatrix.matrixClient;
  const room = mx.getRoom(roomId);
  const canInvite = room?.canInvite(mx.getUserId());
  const isPinned = initMatrix.accountData.spaceShortcut.has(roomId);
  const isCategorized = initMatrix.accountData.categorizedSpaces.has(roomId);

  const handleInviteClick = () => {
    openInviteUser(roomId);
    afterOptionSelect();
  };
  const handlePinClick = () => {
    if (isPinned) deleteSpaceShortcut(roomId);
    else createSpaceShortcut(roomId);
    afterOptionSelect();
  };
  const handleCategorizeClick = () => {
    if (isCategorized) unCategorizeSpace(roomId);
    else categorizeSpace(roomId);
    afterOptionSelect();
  };
  const handleSettingsClick = () => {
    openSpaceSettings(roomId);
    afterOptionSelect();
  };
  const handleManageRoom = () => {
    openSpaceManage(roomId);
    afterOptionSelect();
  };

  const handleLeaveClick = () => {
    if (confirm('Are you really want to leave this space?')) {
      leave(roomId);
      afterOptionSelect();
    }
  };

  return (
    <div style={{ maxWidth: 'calc(var(--navigation-drawer-width) - var(--sp-normal))' }}>
      {<span className={styles.menuHeader}>Options for {initMatrix.matrixClient.getRoom(roomId)?.name}</span>}
      <div className={styles.addOptions} onClick={handleCategorizeClick}>
        <div className={styles.optionIcons}>{isCategorized ? <CategoryIcon sx={{color:'var(--text-primary)'}}/>:<CategoryOutlinedIcon sx={{color:'var(--text-primary)'}}/>}</div>
        <span className={styles.optionTexts}>{isCategorized ? 'Uncategorize subspaces' : 'Categorize subspaces'}</span>
      </div>
      <div className={styles.addOptions} onClick={handlePinClick}>
        <div className={styles.optionIcons}>{isPinned ? <PushPinIcon sx={{color:'var(--text-primary)'}}/>:<PushPinOutlinedIcon sx={{color:'var(--text-primary)'}}/>}</div>
        <span className={styles.optionTexts}>{isPinned ? 'Unpin from sidebar' : 'Pin to sidebar'}</span>
      </div>
      <div className={styles.addOptions} onClick={handleInviteClick} disabled={!canInvite}>
        <div className={styles.optionIcons}><PersonAddAlt1Icon sx={{color:'var(--text-primary)'}}/></div>
        <span className={styles.optionTexts}>Invite</span>
      </div>
      <div className={styles.addOptions} onClick={handleManageRoom}>
        <div className={styles.optionIcons}><ManageSearchOutlinedIcon sx={{color:'var(--text-primary)'}}/></div>
        <span className={styles.optionTexts}>Manage rooms</span>
      </div>
      <div className={styles.addOptions} onClick={handleSettingsClick}>
        <div className={styles.optionIcons}><SettingsOutlinedIcon sx={{color:'var(--text-primary)'}}/></div>
        <span className={styles.optionTexts}>Settings</span>
      </div>
      <div className={styles.addOptions}  onClick={handleLeaveClick}>
        <div className={styles.optionIcons}><LogoutOutlinedIcon sx={{color:'red'}} /></div>
        <span className={styles.optionTexts}>Leave</span>
      </div>
      {/* <MenuHeader>{twemojify(`Options for ${initMatrix.matrixClient.getRoom(roomId)?.name}`)}</MenuHeader> */}
      {/* <MenuItem
        onClick={handleCategorizeClick}
        iconSrc={isCategorized ? CategoryFilledIC : CategoryIC}
      >
        {isCategorized ? 'Uncategorize subspaces' : 'Categorize subspaces'}
      </MenuItem>
      <MenuItem
        onClick={handlePinClick}
        iconSrc={isPinned ? PinFilledIC : PinIC}
      >
        {isPinned ? 'Unpin from sidebar' : 'Pin to sidebar'}
      </MenuItem>
      <MenuItem
        iconSrc={AddUserIC}
        onClick={handleInviteClick}
        disabled={!canInvite}
      >
        Invite
      </MenuItem>
      <MenuItem onClick={handleManageRoom} iconSrc={HashSearchIC}>Manage rooms</MenuItem>
      <MenuItem onClick={handleSettingsClick} iconSrc={SettingsIC}>Settings</MenuItem>
      <MenuItem
        variant="danger"
        onClick={handleLeaveClick}
        iconSrc={LeaveArrowIC}
      >
        Leave
      </MenuItem> */}
    </div>
  );
}

SpaceOptions.defaultProps = {
  afterOptionSelect: null,
};

SpaceOptions.propTypes = {
  roomId: PropTypes.string.isRequired,
  afterOptionSelect: PropTypes.func,
};

export default SpaceOptions;
