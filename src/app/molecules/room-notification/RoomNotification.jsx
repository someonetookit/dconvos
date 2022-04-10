import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './RoomNotification.scss';

import initMatrix from '../../../client/initMatrix';
import cons from '../../../client/state/cons';

import Text from '../../atoms/text/Text';
import RadioButton from '../../atoms/button/RadioButton';
import { MenuItem } from '../../atoms/context-menu/ContextMenu';

import BellIC from '../../../../public/res/ic/outlined/bell.svg';
import BellRingIC from '../../../../public/res/ic/outlined/bell-ring.svg';
import BellPingIC from '../../../../public/res/ic/outlined/bell-ping.svg';
import BellOffIC from '../../../../public/res/ic/outlined/bell-off.svg';
//--------------------- changes-----------------------------------
import styles from './RoomNotification.module.css'
import { styled } from '@mui/material/styles';
import Radio from '@mui/material/Radio';
import NotificationsOffOutlinedIcon from '@mui/icons-material/NotificationsOffOutlined';
import NotificationsOffIcon from '@mui/icons-material/NotificationsOff';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveOutlinedIcon from '@mui/icons-material/NotificationsActiveOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import NotificationImportantIcon from '@mui/icons-material/NotificationImportant';
import NotificationImportantOutlinedIcon from '@mui/icons-material/NotificationImportantOutlined';
import IconButton from '@mui/material/IconButton';
//import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
const items = [{
  iconSrc: BellIC,
  text: 'Global',
  type: cons.notifs.DEFAULT,
}, {
  iconSrc: BellRingIC,
  text: 'All message',
  type: cons.notifs.ALL_MESSAGES,
}, {
  iconSrc: BellPingIC,
  text: 'Mentions & Keywords',
  type: cons.notifs.MENTIONS_AND_KEYWORDS,
}, {
  iconSrc: BellOffIC,
  text: 'Mute',
  type: cons.notifs.MUTE,
}];

function setRoomNotifType(roomId, newType) {
  const mx = initMatrix.matrixClient;
  const { notifications } = initMatrix;
  let roomPushRule;
  try {
    roomPushRule = mx.getRoomPushRule('global', roomId);
  } catch {
    roomPushRule = undefined;
  }
  const promises = [];

  if (newType === cons.notifs.MUTE) {
    if (roomPushRule) {
      promises.push(mx.deletePushRule('global', 'room', roomPushRule.rule_id));
    }
    promises.push(mx.addPushRule('global', 'override', roomId, {
      conditions: [
        {
          kind: 'event_match',
          key: 'room_id',
          pattern: roomId,
        },
      ],
      actions: [
        'dont_notify',
      ],
    }));
    return promises;
  }

  const oldState = notifications.getNotiType(roomId);
  if (oldState === cons.notifs.MUTE) {
    promises.push(mx.deletePushRule('global', 'override', roomId));
  }

  if (newType === cons.notifs.DEFAULT) {
    if (roomPushRule) {
      promises.push(mx.deletePushRule('global', 'room', roomPushRule.rule_id));
    }
    return Promise.all(promises);
  }

  if (newType === cons.notifs.MENTIONS_AND_KEYWORDS) {
    promises.push(mx.addPushRule('global', 'room', roomId, {
      actions: [
        'dont_notify',
      ],
    }));
    promises.push(mx.setPushRuleEnabled('global', 'room', roomId, true));
    return Promise.all(promises);
  }

  // cons.notifs.ALL_MESSAGES
  promises.push(mx.addPushRule('global', 'room', roomId, {
    actions: [
      'notify',
      {
        set_tweak: 'sound',
        value: 'default',
      },
    ],
  }));

  promises.push(mx.setPushRuleEnabled('global', 'room', roomId, true));

  return Promise.all(promises);
}

function useNotifications(roomId) {
  const { notifications } = initMatrix;
  const [activeType, setActiveType] = useState(notifications.getNotiType(roomId));
  useEffect(() => setActiveType(notifications.getNotiType(roomId)), [roomId]);

  const setNotification = useCallback((item) => {
    if (item === activeType.type) return;
    setActiveType(item);
    setRoomNotifType(roomId, item);
  }, [activeType, roomId]);
  return [activeType, setNotification];
}

function RoomNotification({ roomId }) {
  const [activeType, setNotification] = useNotifications(roomId);
  const [selected,setSelected] =useState(true);
  return (
    <div className="room-notification">
      <RadioGroup>
      <div className={styles.option} onClick={() => setNotification(cons.notifs.DEFAULT)}>
        <div className={styles.iconAndLabel}><div className={styles.icons}>{activeType===cons.notifs.DEFAULT?<NotificationsOffIcon sx={{color:'var(--accent)'}} />:<NotificationsOutlinedIcon sx={{color:'var(--text-primary)'}}/>}</div>
        <div className={styles.label}>Global</div></div>
        <div><Radio checked={activeType===cons.notifs.DEFAULT}></Radio></div>
      </div>
      <div className={styles.option} onClick={() => setNotification(cons.notifs.ALL_MESSAGES)}>
        <div className={styles.iconAndLabel}><div className={styles.icons}>{activeType===cons.notifs.ALL_MESSAGES?<NotificationsActiveIcon sx={{color:'var(--accent)'}} />:<NotificationsActiveOutlinedIcon sx={{color:'var(--text-primary)'}}/>}</div>
        <div className={styles.label}>All messages</div></div>
        <div><Radio checked={activeType===cons.notifs.ALL_MESSAGES}></Radio></div>
      </div>
      <div className={styles.option} onClick={() => setNotification(cons.notifs.MENTIONS_AND_KEYWORDS)}>
        <div className={styles.iconAndLabel}><div className={styles.icons}>{activeType===cons.notifs.MENTIONS_AND_KEYWORDS?<NotificationImportantIcon sx={{color:'var(--accent)'}} />:<NotificationImportantOutlinedIcon sx={{color:'var(--text-primary)'}}/>}</div>
        <div className={styles.label}>Mentions &amp; Keywords</div></div>
        <div><Radio checked={activeType===cons.notifs.MENTIONS_AND_KEYWORDS}></Radio></div>
      </div>
      <div className={styles.option} onClick={() => setNotification(cons.notifs.MUTE)}>
        <div className={styles.iconAndLabel}><div className={styles.icons}>{activeType===cons.notifs.MUTE?<NotificationsOffIcon sx={{color:'var(--accent)'}} />:<NotificationsOffOutlinedIcon sx={{color:'var(--text-primary)'}}/>}</div>
        <div className={styles.label}>Mute</div></div>
        <div><Radio checked={activeType===cons.notifs.MUTE}></Radio></div>
      </div>
      </RadioGroup>
      {/* {
        items.map((item) => (
          <MenuItem
            variant={activeType === item.type ? 'positive' : 'surface'}
            key={item.type}
            iconSrc={item.iconSrc}
            onClick={() => setNotification(item)}
          >
            <Text varient="b1">
              <span>{item.text}</span>
              <RadioButton isActive={activeType === item.type} />
            </Text>
          </MenuItem>
        ))
      } */}
    </div>
  );
}

RoomNotification.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default RoomNotification;
