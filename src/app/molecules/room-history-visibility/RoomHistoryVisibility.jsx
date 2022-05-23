import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './RoomHistoryVisibility.scss';

import initMatrix from '../../../client/initMatrix';

import Text from '../../atoms/text/Text';
import RadioButton from '../../atoms/button/RadioButton';
import { MenuItem } from '../../atoms/context-menu/ContextMenu';
// import Radio from '@mui/material/Radio';
// import RadioGroup from '@mui/material/RadioGroup';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { withStyles } from '@material-ui/core/styles';
const AccentRadio = withStyles({
  root: {
    color: 'var(--accent)',
    '&$checked': {
      color: 'var(--accent)',
    },
  },
  checked: {},
})((props) => <Radio color="primary" {...props} />);

import styles from './RoomHistoryVisibility.module.css'


const visibility = {
  WORLD_READABLE: 'world_readable',
  SHARED: 'shared',
  INVITED: 'invited',
  JOINED: 'joined',
};

const items = [{
  iconSrc: null,
  text: 'World readable (anyone can read)',
  type: visibility.WORLD_READABLE,
}, {
  iconSrc: null,
  text: 'Member shared (since the point in time of selecting this option)',
  type: visibility.SHARED,
}, {
  iconSrc: null,
  text: 'Member invited (since they were invited)',
  type: visibility.INVITED,
}, {
  iconSrc: null,
  text: 'Member joined (since they joined)',
  type: visibility.JOINED,
}];

function setHistoryVisibility(roomId, type) {
  const mx = initMatrix.matrixClient;

  return mx.sendStateEvent(
    roomId, 'm.room.history_visibility',
    {
      history_visibility: type,
    },
  );
}

function useVisibility(roomId) {
  const mx = initMatrix.matrixClient;
  const room = mx.getRoom(roomId);

  const [activeType, setActiveType] = useState(room.getHistoryVisibility());
  useEffect(() => setActiveType(room.getHistoryVisibility()), [roomId]);

  const setVisibility = useCallback((item) => {
    if (item.type === activeType.type) return;
    setActiveType(item.type);
    setHistoryVisibility(roomId, item.type);
  }, [activeType, roomId]);

  return [activeType, setVisibility];
}

function RoomHistoryVisibility({ roomId }) {
  const [activeType, setVisibility] = useVisibility(roomId);
  const mx = initMatrix.matrixClient;
  const userId = mx.getUserId();
  const room = mx.getRoom(roomId);
  const { currentState } = room;

  const canChange = currentState.maySendStateEvent('m.room.history_visibility', userId);

  return (
    <div className="room-history-visibility">
      
<RadioGroup>
  <button onClick={() => setVisibility(items[0])} disabled={(!canChange)}>
      <div className={styles.option} >
        <div className={styles.iconAndLabel}>
        <div className={styles.label}>World readable (anyone can read)</div></div>
        <div><AccentRadio checked={activeType===items[0].type}/></div>
      </div></button>
      <button onClick={() => setVisibility(items[1])} disabled={(!canChange)}>
      <div className={styles.option} >
        <div className={styles.iconAndLabel}>
        <div className={styles.label}>Member shared (since the point in time of selecting this option)</div></div>
        <div><AccentRadio checked={activeType===items[1].type}/></div>
      </div></button>
      <button onClick={() => setVisibility(items[2])} disabled={(!canChange)}>
      <div className={styles.option} >
        <div className={styles.iconAndLabel}>
        <div className={styles.label}>Member (messages after invite)</div></div>
        <div><AccentRadio checked={activeType===items[2].type}/></div>
      </div></button>
      <button onClick={() => setVisibility(items[3])} disabled={(!canChange)}>
      <div className={styles.option} >
        <div className={styles.iconAndLabel}>
        <div className={styles.label}>Member joined (since they joined)</div></div>
        <div><AccentRadio checked={activeType===items[3].type}/></div>
      </div></button>

      </RadioGroup>
      {/* {
        items.map((item) => (
          <MenuItem
            variant={activeType === item.type ? 'positive' : 'surface'}
            key={item.type}
            iconSrc={item.iconSrc}
            onClick={() => setVisibility(item)}
            disabled={(!canChange)}
          >
            <Text varient="b1">
              <span>{item.text}</span>
              <RadioButton isActive={activeType === item.type} />
            </Text>
          </MenuItem>
        ))
      } */}
      <Text variant="b3">Changes to who can read history will only apply to future messages in this room. The visibility of existing history will be unchanged.</Text>
    </div>
  );
}

RoomHistoryVisibility.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default RoomHistoryVisibility;
