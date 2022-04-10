import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import './SideBar.scss';
import styles from './Sidebar.module.css'

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import initMatrix from '../../../client/initMatrix';
import cons from '../../../client/state/cons';
import colorMXID from '../../../util/colorMXID';
import {
  selectTab, openShortcutSpaces, openInviteList,
  openSearch, openSettings, openReusableContextMenu,
} from '../../../client/action/navigation';
import { moveSpaceShortcut } from '../../../client/action/accountData';
import { abbreviateNumber, getEventCords } from '../../../util/common';

import Avatar from '../../atoms/avatar/Avatar';
import NotificationBadge from '../../atoms/badge/NotificationBadge';
import ScrollView from '../../atoms/scroll/ScrollView';
import SidebarAvatar from '../../molecules/sidebar-avatar/SidebarAvatar';
import SpaceOptions from '../../molecules/space-options/SpaceOptions';
import logout from "../../../client/action/logout";
import HomeIC from '../../../../public/res/ic/outlined/home.svg';
import UserIC from '../../../../public/res/ic/outlined/user.svg';
import AddPinIC from '../../../../public/res/ic/outlined/add-pin.svg';
import SearchIC from '../../../../public/res/ic/outlined/search.svg';
import InviteIC from '../../../../public/res/ic/outlined/invite.svg';

import { useSelectedTab } from '../../hooks/useSelectedTab';

//---------------------changes------------------------
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import FavoriteIcon from '@mui/icons-material/Favorite';
import AddBoxIcon from '@mui/icons-material/AddBox';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import SearchIcon from '@mui/icons-material/Search';
import PushPinOutlinedIcon from '@mui/icons-material/PushPinOutlined';


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';


import { styled } from '@mui/system';
import BadgeUnstyled from '@mui/base/BadgeUnstyled';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
const StyledBadge = styled(BadgeUnstyled)`
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  color: rgba(0, 0, 0, 0.85);
  font-size: 12px;
  list-style: none;
  font-family: IBM Plex Sans, sans-serif;
  position: relative;
  display: inline-block;
  line-height: 1;

  & .MuiBadge-badge {
    z-index: auto;
    min-width: 18px;
    height: 18px;
    padding: 0 4px;
    color: var(--accent);
    font-weight: 400;
    font-size: 12px;
    line-height: 20px;
    white-space: nowrap;
    text-align: center;
    background: var(--text-primary);
    border-radius: 9px;
    box-shadow: 0 0 0 1px #fff;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(50%, -50%);
    transform-origin: 100% 0;
  }

  & .MuiBadge-invisible {
    display: none;
  }
`;


function useNotificationUpdate() {
  const { notifications } = initMatrix;
  const [, forceUpdate] = useState({});
  useEffect(() => {
    function onNotificationChanged(roomId, total, prevTotal) {
      if (total === prevTotal) return;
      forceUpdate({});
    }
    notifications.on(cons.events.notifications.NOTI_CHANGED, onNotificationChanged);
    return () => {
      notifications.removeListener(cons.events.notifications.NOTI_CHANGED, onNotificationChanged);
    };
  }, []);
}

function ProfileAvatarMenu() {
  const mx = initMatrix.matrixClient;
  const [profile, setProfile] = useState({
    avatarUrl: null,
    displayName: mx.getUser(mx.getUserId()).displayName,
  });

  useEffect(() => {
    const user = mx.getUser(mx.getUserId());
    const setNewProfile = (avatarUrl, displayName) => setProfile({
      avatarUrl: avatarUrl || null,
      displayName: displayName || profile.displayName,
    });
    const onAvatarChange = (event, myUser) => {
      setNewProfile(myUser.avatarUrl, myUser.displayName);
    };
    mx.getProfileInfo(mx.getUserId()).then((info) => {
      setNewProfile(info.avatar_url, info.displayname);
    });
    user.on('User.avatarUrl', onAvatarChange);
    return () => {
      user.removeListener('User.avatarUrl', onAvatarChange);
    };
  }, []);


  const [open, setOpen] = useState(false)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout();
  };

  return (<>
    <SidebarAvatar
      onClick={handleClickOpen}
      tooltip="Settings"
      avatar={(
        <Avatar
          text={profile.displayName}
          bgColor={"var(--accent)"}
          size="normal"
          imageSrc={profile.avatarUrl !== null ? mx.mxcUrlToHttp(profile.avatarUrl, 42, 42, 'crop') : null}
        />
      )}
    />
    <Dialog
    fullScreen={fullScreen}
    open={open}
    onClose={handleClose}
    aria-labelledby="responsive-dialog-title"
  >
    <DialogTitle  sx={{background:'var(--bg-sub)'}} color='var(--accent)' id="responsive-dialog-title">
      {"Logout session !"}
    </DialogTitle>
    <DialogContent  sx={{background:'var(--bg-sub)'}}>
      <DialogContentText>
        Make sure you save the session key before logout ,to avoid future data lose :)
      </DialogContentText>
    </DialogContent>
    <DialogActions  sx={{background:'var(--bg-sub)'}}>
      <Button sx={{color:'var(--accent)'}} autoFocus onClick={handleClose}>
        Cancel
      </Button>
      <Button sx={{color:'red'}} onClick={handleLogout} autoFocus>
        Logout
      </Button>
    </DialogActions>
  </Dialog>
  </>

  );
}

function FeaturedTab() {
  const { roomList, accountData, notifications } = initMatrix;
  const [selectedTab] = useSelectedTab();
  useNotificationUpdate();

  function getHomeNoti() {
    const orphans = roomList.getOrphans();
    let noti = null;

    orphans.forEach((roomId) => {
      if (accountData.spaceShortcut.has(roomId)) return;
      if (!notifications.hasNoti(roomId)) return;
      if (noti === null) noti = { total: 0, highlight: 0 };
      const childNoti = notifications.getNoti(roomId);
      noti.total += childNoti.total;
      noti.highlight += childNoti.highlight;
    });

    return noti;
  }
  function getDMsNoti() {
    if (roomList.directs.size === 0) return null;
    let noti = null;

    [...roomList.directs].forEach((roomId) => {
      if (!notifications.hasNoti(roomId)) return;
      if (noti === null) noti = { total: 0, highlight: 0 };
      const childNoti = notifications.getNoti(roomId);
      noti.total += childNoti.total;
      noti.highlight += childNoti.highlight;
    });

    return noti;
  }

  const dmsNoti = getDMsNoti();
  const homeNoti = getHomeNoti();
  let dmNumber=dmsNoti?abbreviateNumber(dmsNoti.total):0
  let homeNumber = homeNoti?abbreviateNumber(homeNoti.total):0

  return (
    <>
         {/* <div className={styles.peopleButton}>
      <Tooltip title='Direct messages' placement='right'>
        <IconButton size='large' onClick={() => selectTab(cons.tabs.DIRECTS)}>
        <StyledBadge badgeContent={dmNumber}>
          {((selectedTab === cons.tabs.DIRECTS) ? (<EmailIcon sx={{color:'var(--accent)'}}/>):(<EmailOutlinedIcon sx={{color:"var(--text-primary)"}}/>))}  
          </StyledBadge>
        </IconButton>
      </Tooltip>
    </div> */}

    <div className={styles.homeButton}>
      <Tooltip title='Room' placement='right'>
        <IconButton size='large' onClick={() => selectTab(cons.tabs.HOME)}>
         <StyledBadge badgeContent={homeNumber}>
          {(selectedTab === cons.tabs.HOME) ? (<EmailIcon sx={{color:'var(--accent)'}}/>):(<EmailOutlinedIcon sx={{color:"var(--text-primary)"}}/>)}  
          </StyledBadge>
        </IconButton>
      </Tooltip>
    </div>
    <div className={styles.callButton}>
      <Tooltip title='Calls' placement='right'>
        <IconButton size='large' onClick={() => selectTab(cons.tabs.CALLS)}>
          {selectedTab===cons.tabs.CALLS ? (<LocalPhoneIcon sx={{color:'var(--accent)'}}/>):(<LocalPhoneOutlinedIcon sx={{color:"var(--text-primary)"}}/>)}  
        </IconButton>
      </Tooltip>
    </div>
    <div className={styles.favButton}>
      <Tooltip title='Favorities' placement='right'>
        <IconButton size='large' onClick={() => selectTab(cons.tabs.FAVORITES)}>
          {selectedTab===cons.tabs.FAVORITES ? (<FavoriteIcon sx={{color:'var(--accent)'}}/>):(<FavoriteBorderOutlinedIcon sx={{color:"var(--text-primary)"}} />)}  
        </IconButton>
      </Tooltip>
    </div>

    </>
  );
}

function DraggableSpaceShortcut({
  isActive, spaceId, index, moveShortcut, onDrop,
}) {
  const mx = initMatrix.matrixClient;
  const { notifications } = initMatrix;
  const room = mx.getRoom(spaceId);
  const shortcutRef = useRef(null);
  const avatarRef = useRef(null);

  const openSpaceOptions = (e, sId) => {
    e.preventDefault();
    openReusableContextMenu(
      'right',
      getEventCords(e, '.sidebar-avatar'),
      (closeMenu) => <SpaceOptions roomId={sId} afterOptionSelect={closeMenu} />,
    );
  };

  const [, drop] = useDrop({
    accept: 'SPACE_SHORTCUT',
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    drop(item) {
      onDrop(item.index, item.spaceId);
    },
    hover(item, monitor) {
      if (!shortcutRef.current) return;

      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;

      const hoverBoundingRect = shortcutRef.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveShortcut(dragIndex, hoverIndex);
      // eslint-disable-next-line no-param-reassign
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    type: 'SPACE_SHORTCUT',
    item: () => ({ spaceId, index }),
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(avatarRef);
  drop(shortcutRef);

  if (shortcutRef.current) {
    if (isDragging) shortcutRef.current.style.opacity = 0;
    else shortcutRef.current.style.opacity = 1;
  }

  return (
    <SidebarAvatar
      ref={shortcutRef}
      active={isActive}
      tooltip={room.name}
      onClick={() => selectTab(spaceId)}
      onContextMenu={(e) => openSpaceOptions(e, spaceId)}
      avatar={(
        <Avatar
          ref={avatarRef}
          text={room.name}
          bgColor={colorMXID(room.roomId)}
          size="normal"
          imageSrc={room.getAvatarUrl(initMatrix.matrixClient.baseUrl, 42, 42, 'crop') || null}
        />
      )}
      notificationBadge={notifications.hasNoti(spaceId) ? (
        <NotificationBadge
          alert={notifications.getHighlightNoti(spaceId) > 0}
          content={abbreviateNumber(notifications.getTotalNoti(spaceId)) || null}
        />
      ) : null}
    />
  );
}

DraggableSpaceShortcut.propTypes = {
  spaceId: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  moveShortcut: PropTypes.func.isRequired,
  onDrop: PropTypes.func.isRequired,
};

function SpaceShortcut() {
  const { accountData } = initMatrix;
  const [selectedTab] = useSelectedTab();
  useNotificationUpdate();
  const [spaceShortcut, setSpaceShortcut] = useState([...accountData.spaceShortcut]);

  useEffect(() => {
    const handleShortcut = () => setSpaceShortcut([...accountData.spaceShortcut]);
    accountData.on(cons.events.accountData.SPACE_SHORTCUT_UPDATED, handleShortcut);
    return () => {
      accountData.removeListener(cons.events.accountData.SPACE_SHORTCUT_UPDATED, handleShortcut);
    };
  }, []);

  const moveShortcut = (dragIndex, hoverIndex) => {
    const dragSpaceId = spaceShortcut[dragIndex];
    const newShortcuts = [...spaceShortcut];
    newShortcuts.splice(dragIndex, 1);
    newShortcuts.splice(hoverIndex, 0, dragSpaceId);
    setSpaceShortcut(newShortcuts);
  };

  const handleDrop = (dragIndex, dragSpaceId) => {
    if ([...accountData.spaceShortcut][dragIndex] === dragSpaceId) return;
    moveSpaceShortcut(dragSpaceId, dragIndex);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      {
        spaceShortcut.map((shortcut, index) => (
          <DraggableSpaceShortcut
            key={shortcut}
            index={index}
            spaceId={shortcut}
            isActive={selectedTab === shortcut}
            moveShortcut={moveShortcut}
            onDrop={handleDrop}
          />
        ))
      }
    </DndProvider>
  );
}

function useTotalInvites() {
  const { roomList } = initMatrix;
  const totalInviteCount = () => roomList.inviteRooms.size
    + roomList.inviteSpaces.size
    + roomList.inviteDirects.size;
  const [totalInvites, updateTotalInvites] = useState(totalInviteCount());

  useEffect(() => {
    const onInviteListChange = () => {
      updateTotalInvites(totalInviteCount());
    };
    roomList.on(cons.events.roomList.INVITELIST_UPDATED, onInviteListChange);
    return () => {
      roomList.removeListener(cons.events.roomList.INVITELIST_UPDATED, onInviteListChange);
    };
  }, []);

  return [totalInvites];
}

function SideBar() {
  const [totalInvites] = useTotalInvites();
  const [selectedTab] = useSelectedTab();

  return (
    <div className="sidebar">
      <div className="sidebar__scrollable">
        <ScrollView invisible>
          <div className="scrollable-content">
            <div className="featured-container">
              <FeaturedTab />
            </div>
            <div className="sidebar-divider" />
            <div className="space-container">
              <SpaceShortcut />
              <Tooltip title="Pin spaces" placement='right'>
                <IconButton onClick={()=>openShortcutSpaces()}>
                  <PushPinOutlinedIcon sx={{color:'var(--text-primary)'}}/>
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </ScrollView>
      </div>
      <div className="sidebar__sticky">
        <div className="sidebar-divider" />
        <div className="sticky-container">
          <Tooltip title='Search' placement='right'>
            <IconButton onClick={()=>openSearch()}>
                <SearchIcon sx={{color:'var(--text-primary)'}}/>
            </IconButton>
          </Tooltip>
          { totalInvites !== 0 && (
            <SidebarAvatar
              tooltip="Invites"
              onClick={() => openInviteList()}
              avatar={<Avatar iconSrc={InviteIC} size="normal" />}
              notificationBadge={<NotificationBadge alert content={totalInvites} />}
            />
          )}
  <div className={styles.settingsButton}>
      <Tooltip title='Settings' placement='right'>
        <IconButton size='large' onClick={openSettings}>
          {(selectedTab === cons.tabs.SETTINGS) ? (<SettingsIcon sx={{color:'var(--accent)'}}/>):(<SettingsOutlinedIcon sx={{color:"var(--text-primary)"}}/>)}  
        </IconButton>
      </Tooltip>
    </div>
          <ProfileAvatarMenu />
        </div>
      </div>
    </div>
  );
}

export default SideBar;


//---------------FeaturedTab----------------


/*

<SidebarAvatar
        tooltip="Home"
        active={selectedTab === cons.tabs.HOME}
        onClick={() => selectTab(cons.tabs.HOME)}
        avatar={<Avatar iconSrc={HomeIC} size="normal" />}
        notificationBadge={homeNoti ? (
          <NotificationBadge
            alert={homeNoti?.highlight > 0}
            content={abbreviateNumber(homeNoti.total) || null}
          />
        ) : null}
      />
      <SidebarAvatar
        tooltip="People"
        active={selectedTab === cons.tabs.DIRECTS}
        onClick={() => selectTab(cons.tabs.DIRECTS)}
        avatar={<Avatar iconSrc={UserIC} size="normal" />}
        notificationBadge={dmsNoti ? (
          <NotificationBadge
            alert={dmsNoti?.highlight > 0}
            content={abbreviateNumber(dmsNoti.total) || null}
          />
        ) : null}
      />

*/
/* 
          sidebar search

          <SidebarAvatar
            tooltip="Search"
            onClick={() => openSearch()}
            avatar={<Avatar iconSrc={SearchIC} size="normal" />}
          />


          //----------------pin spaces-----------
           <SidebarAvatar
                tooltip="Pin spaces"
                onClick={() => openShortcutSpaces()}
                avatar={<Avatar iconSrc={AddPinIC} size="normal" />}
              />

*/