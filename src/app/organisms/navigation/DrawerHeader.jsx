import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './DrawerHeader.scss';
import styles from './DrawerHeader.module.css'
import { twemojify } from '../../../util/twemojify';

import initMatrix from '../../../client/initMatrix';
import cons from '../../../client/state/cons';
import {
  openPublicRooms, openCreateRoom, openSpaceManage,
  openSpaceAddExisting, openInviteUser, openReusableContextMenu,
} from '../../../client/action/navigation';
import { getEventCords } from '../../../util/common';

import { blurOnBubbling } from '../../atoms/button/script';

import Text from '../../atoms/text/Text';
import RawIcon from '../../atoms/system-icons/RawIcon';
import Header, { TitleWrapper } from '../../atoms/header/Header';
//import IconButton from '../../atoms/button/IconButton';
import { MenuItem, MenuHeader } from '../../atoms/context-menu/ContextMenu';
import SpaceOptions from '../../molecules/space-options/SpaceOptions';

import PlusIC from '../../../../public/res/ic/outlined/plus.svg';
import HashPlusIC from '../../../../public/res/ic/outlined/hash-plus.svg';
import HashGlobeIC from '../../../../public/res/ic/outlined/hash-globe.svg';
import HashSearchIC from '../../../../public/res/ic/outlined/hash-search.svg';
import SpacePlusIC from '../../../../public/res/ic/outlined/space-plus.svg';
import ChevronBottomIC from '../../../../public/res/ic/outlined/chevron-bottom.svg';
//-------changes------------------------------
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import WorkspacesOutlinedIcon from '@mui/icons-material/WorkspacesOutlined';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PublicIcon from '@mui/icons-material/Public';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import { Toolbar } from '@mui/material';
export function HomeSpaceOptions({ spaceId, afterOptionSelect }) {
  const mx = initMatrix.matrixClient;
  const room = mx.getRoom(spaceId);
  const canManage = room
    ? room.currentState.maySendStateEvent('m.space.child', mx.getUserId())
    : true;

  return (
    <>
      {/* <MenuHeader>Add rooms or spaces</MenuHeader> */}
      <div className={styles.addOptions} onClick={()=> {afterOptionSelect();openInviteUser();}} disabled={!canManage}>
        <div className={styles.optionIcons}><PersonAddAlt1OutlinedIcon sx={{color:'var(--text-primary)',fontSize:18}}/></div><div>Start new chat</div>
      </div>

      <div className={styles.addOptions} onClick={() => { afterOptionSelect(); openCreateRoom(true, spaceId); }}
        disabled={!canManage}>
        <div className={styles.optionIcons}><PeopleAltOutlinedIcon sx={{color:'var(--text-primary)',fontSize:18}}/></div><div>Create new space</div>
      </div>

      <div className={styles.addOptions}  onClick={() => { afterOptionSelect(); openCreateRoom(false, spaceId); }}
        disabled={!canManage}>
        <div className={styles.optionIcons}> <WorkspacesOutlinedIcon sx={{color:'var(--text-primary)',fontSize:18}}/></div><div>Create new Group</div>
      </div>

      {
        !spaceId &&(<div className={styles.addOptions}  onClick={() => { afterOptionSelect(); openPublicRooms(); }}>
        <div className={styles.optionIcons}> <PublicIcon sx={{color:'var(--text-primary)',fontSize:18}}/></div><div> Join public room</div>
      </div>)
      }
      {spaceId && (<div className={styles.addOptions}  onClick={() => { afterOptionSelect(); openSpaceAddExisting(spaceId); }}
        disabled={!canManage}>
        <div className={styles.optionIcons}> <AddCircleOutlineIcon sx={{color:'var(--text-primary)',fontSize:18}}/></div><div>Add existing</div>
      </div>)

      }
      {
        spaceId &&(<div className={styles.addOptions}  onClick={() => { afterOptionSelect(); openSpaceManage(spaceId); }}>
        <div className={styles.optionIcons}> <ManageSearchIcon sx={{color:'var(--text-primary)',fontSize:18}}/></div><div>Manage rooms</div>
      </div>)
      }

      {/* <MenuItem onClick={()=>openInviteUser()}>
        Start new chat
      </MenuItem>
      <MenuItem
        iconSrc={SpacePlusIC}
        onClick={() => { afterOptionSelect(); openCreateRoom(true, spaceId); }}
        disabled={!canManage}
      >
        Create new space
      </MenuItem>
      <MenuItem
        iconSrc={HashPlusIC}
        onClick={() => { afterOptionSelect(); openCreateRoom(false, spaceId); }}
        disabled={!canManage}
      >
        Create new room
      </MenuItem>
      { !spaceId && (
        <MenuItem
          iconSrc={HashGlobeIC}
          onClick={() => { afterOptionSelect(); openPublicRooms(); }}
        >
          Join public room
        </MenuItem>
      )}
      { spaceId && (
        <MenuItem
          iconSrc={PlusIC}
          onClick={() => { afterOptionSelect(); openSpaceAddExisting(spaceId); }}
          disabled={!canManage}
        >
          Add existing
        </MenuItem>
      )}
      { spaceId && (
        <MenuItem
          onClick={() => { afterOptionSelect(); openSpaceManage(spaceId); }}
          iconSrc={HashSearchIC}
        >
          Manage rooms
        </MenuItem>
      )} */}
    </>
  );
}
HomeSpaceOptions.defaultProps = {
  spaceId: null,
};
HomeSpaceOptions.propTypes = {
  spaceId: PropTypes.string,
  afterOptionSelect: PropTypes.func.isRequired,
};

function DrawerHeader({ selectedTab, spaceId }) {
  const mx = initMatrix.matrixClient;
  const tabName = selectedTab === cons.tabs.HOME
                  ? 'Inbox'
                  : selectedTab === cons.tabs.DIRECTS?'Direct messages':selectedTab===cons.tabs.FAVORITES?'Favorite messages':'Call details'

  const isDMTab = selectedTab === cons.tabs.DIRECTS;
  const room = mx.getRoom(spaceId);
  const spaceName = isDMTab ? null : (room?.name || null);

  const openSpaceOptions = (e) => {
    e.preventDefault();
    openReusableContextMenu(
      'bottom',
      getEventCords(e, '.header'),
      (closeMenu) => <SpaceOptions roomId={spaceId} afterOptionSelect={closeMenu} />,
    );
  };

  const openHomeSpaceOptions = (e) => {
    e.preventDefault();
    openReusableContextMenu(
      'right',
      getEventCords(e, '.ic-btn'),
      (closeMenu) => <HomeSpaceOptions spaceId={spaceId} afterOptionSelect={closeMenu} />,
    );
  };

  return (
    <Header>
      {spaceName ? (
        <button
          className="drawer-header__btn"
          onClick={openSpaceOptions}
          type="button"
          onMouseUp={(e) => blurOnBubbling(e, '.drawer-header__btn')}
        >
          <TitleWrapper>
            <Text variant="s1" weight="medium" primary>{twemojify(spaceName)}</Text>
          </TitleWrapper>
          <RawIcon size="small" src={ChevronBottomIC} />
        </button>
      ) : (
        <TitleWrapper>
          <Text variant="s1" weight="medium" primary>{tabName}</Text>
        </TitleWrapper>
      )}
      {selectedTab==='home'&&<Tooltip title='Add rooms/spaces/contact' placement='right'>
          <IconButton onClick={openHomeSpaceOptions} size='large'>
            <AddIcon sx={{color:'var(--text-primary)'}}/>
          </IconButton>
        </Tooltip>}
      {/* { isDMTab && <IconButton onClick={() => openInviteUser()} tooltip="Starthbchbch DM" src={PlusIC} size="small" /> }
      { selectedTab==='home' && <IconButton onClick={openHomeSpaceOptions} tooltip="Add rooms/spaces" src={PlusIC} size="small" /> } */}
    </Header>
  );
}

DrawerHeader.defaultProps = {
  spaceId: null,
};
DrawerHeader.propTypes = {
  selectedTab: PropTypes.string.isRequired,
  spaceId: PropTypes.string,
};

export default DrawerHeader;
