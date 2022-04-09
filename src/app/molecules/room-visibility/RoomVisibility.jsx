import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import './RoomVisibility.scss';

import initMatrix from '../../../client/initMatrix';

import Text from '../../atoms/text/Text';
import RadioButton from '../../atoms/button/RadioButton';
import { MenuItem } from '../../atoms/context-menu/ContextMenu';

import HashIC from '../../../../public/res/ic/outlined/hash.svg';
import HashLockIC from '../../../../public/res/ic/outlined/hash-lock.svg';
import HashGlobeIC from '../../../../public/res/ic/outlined/hash-globe.svg';
import SpaceIC from '../../../../public/res/ic/outlined/space.svg';
import SpaceLockIC from '../../../../public/res/ic/outlined/space-lock.svg';
import SpaceGlobeIC from '../../../../public/res/ic/outlined/space-globe.svg';

const visibility = {
  INVITE: 'invite',
  RESTRICTED: 'restricted',
  PUBLIC: 'public',
};

function setJoinRule(roomId, type) {
  const mx = initMatrix.matrixClient;
  let allow;
  if (type === visibility.RESTRICTED) {
    const { currentState } = mx.getRoom(roomId);
    const mEvent = currentState.getStateEvents('m.space.parent')[0];
    if (!mEvent) return Promise.resolve(undefined);

    allow = [{
      room_id: mEvent.getStateKey(),
      type: 'm.room_membership',
    }];
  }

  return mx.sendStateEvent(
    roomId,
    'm.room.join_rules',
    {
      join_rule: type,
      allow,
    },
  );
}

function useVisibility(roomId) {
  const mx = initMatrix.matrixClient;
  const room = mx.getRoom(roomId);

  const [activeType, setActiveType] = useState(room.getJoinRule());
  useEffect(() => setActiveType(room.getJoinRule()), [roomId]);

  const setNotification = useCallback((item) => {
    if (item.type === activeType.type) return;
    setActiveType(item.type);
    setJoinRule(roomId, item.type);
  }, [activeType, roomId]);

  return [activeType, setNotification];
}

function RoomVisibility({ roomId }) {
  const [activeType, setVisibility] = useVisibility(roomId);
  const mx = initMatrix.matrixClient;
  const room = mx.getRoom(roomId);
  const isSpace = room.isSpaceRoom();
  const { currentState } = room;

  const noSpaceParent = currentState.getStateEvents('m.space.parent').length === 0;
  const mCreate = currentState.getStateEvents('m.room.create')[0]?.getContent();
  const roomVersion = Number(mCreate.room_version);

  const myPowerlevel = room.getMember(mx.getUserId())?.powerLevel || 0;
  const canChange = room.currentState.hasSufficientPowerLevelFor('state_default', myPowerlevel);

  const items = [{
    iconSrc: isSpace ? SpaceLockIC : HashLockIC,
    text: 'Private (invite only)',
    type: visibility.INVITE,
    unsupported: false,
  }, {
    iconSrc: isSpace ? SpaceIC : HashIC,
    text: roomVersion < 8 ? 'Restricted (unsupported: required room upgrade)' : 'Restricted (space member can join)',
    type: visibility.RESTRICTED,
    unsupported: roomVersion < 8 || noSpaceParent,
  }, {
    iconSrc: isSpace ? SpaceGlobeIC : HashGlobeIC,
    text: 'Public (anyone can join)',
    type: visibility.PUBLIC,
    unsupported: false,
  }];

  return (
    <div className="room-visibility">
      {
        items.map((item) => (
          <MenuItem
            variant={activeType === item.type ? 'positive' : 'surface'}
            key={item.type}
            iconSrc={item.iconSrc}
            onClick={() => setVisibility(item)}
            disabled={(!canChange || item.unsupported)}
          >
            <Text varient="b1">
              <span style={{color:"var(--text-primary)"}}>{item.text}</span>
              <RadioButton isActive={activeType === item.type} />
            </Text>
          </MenuItem>
        ))
      }
    </div>
  );
}

RoomVisibility.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default RoomVisibility;
