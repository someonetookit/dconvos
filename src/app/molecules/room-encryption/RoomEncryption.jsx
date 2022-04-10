import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './RoomEncryption.scss';

import initMatrix from '../../../client/initMatrix';

import Text from '../../atoms/text/Text';
import Toggle from '../../atoms/button/Toggle';
import SettingTile from '../setting-tile/SettingTile';

//-----------------------changes---------------------
import styles from './RoomEncryption.module.css'
import { styled } from "@mui/system";
import SwitchUnstyled, {
  switchUnstyledClasses,
} from "@mui/base/SwitchUnstyled";
const blue = {
  500: "#007FFF",
};

const grey = {
  400: "#BFC7CF",
  500: "#AAB4BE",
  600: "#6F7E8C",
};

const Root = styled("span")(
  ({ theme }) => `
  font-size: 0;
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 10px;
  cursor: pointer;


  & .${switchUnstyledClasses.track} {
    background: ${theme.palette.mode === "dark" ? grey[600] : grey[400]};
    border-radius: 10px;
    display: block;
    height: 100%;
    width: 100%;
    position: absolute;
  }

  & .${switchUnstyledClasses.thumb} {
    display: block;
    width: 14px;
    height: 14px;
    top: 3px;
    left: 3px;
    border-radius: 16px;
    background-color: #fff;
    position: relative;
    transition: all 200ms ease;
  }

  &.${switchUnstyledClasses.focusVisible} .${switchUnstyledClasses.thumb} {
    background-color: ${grey[500]};
    box-shadow: 0 0 1px 8px rgba(0, 0, 0, 0.25);
  }

  &.${switchUnstyledClasses.checked} {
    .${switchUnstyledClasses.thumb} {
      left: 22px;
      top: 3px;
      background-color: #fff;
    }

    .${switchUnstyledClasses.track} {
      background:var(--accent);
    }
  }

  & .${switchUnstyledClasses.input} {
    cursor: inherit;
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    opacity: 0;
    z-index: 1;
    margin: 0;
  }
  `
);


function RoomEncryption({ roomId }) {
  const mx = initMatrix.matrixClient;
  const room = mx.getRoom(roomId);
  const encryptionEvents = room.currentState.getStateEvents('m.room.encryption');
  const [isEncrypted, setIsEncrypted] = useState(encryptionEvents.length > 0);
  const canEnableEncryption = room.currentState.maySendStateEvent('m.room.encryption', mx.getUserId());

  const handleEncryptionEnable = () => {
    const joinRule = room.getJoinRule();
    const confirmMsg1 = 'It is not recommended to add encryption in public room. Anyone can find and join public rooms, so anyone can read messages in them.';
    const confirmMsg2 = 'Once enabled, encryption for a room cannot be disabled. Messages sent in an encrypted room cannot be seen by the server, only by the participants of the room. Enabling encryption may prevent many bots and bridges from working correctly';
    if (joinRule === 'public' ? confirm(confirmMsg1) : true) {
      if (confirm(confirmMsg2)) {
        setIsEncrypted(true);
        mx.sendStateEvent(roomId, 'm.room.encryption', {
          algorithm: 'm.megolm.v1.aes-sha2',
        });
      }
    }
  };

  return (
    <div className="room-encryption">

<div className={styles.optionContainer}>
          <div className={styles.toggleSettings}>
            <div className={styles.titleAndContent}>
              <div>
                <Text variant="b1">Enable room encryption</Text>
              </div>
              <div>
              {<Text variant="b3">Once enabled, encryption cannot be disabled.</Text>}
              </div>
            </div>
            <div className={styles.toggleButton}>
              <SwitchUnstyled
                component={Root}
                checked={isEncrypted}
                onChange={() => {
                  handleEncryptionEnable();
                }}
              />
            </div>
          </div>
        </div>
      {/* <SettingTile
        title="Enable room encryption"
        content={(
          <Text variant="b3">Once enabled, encryption cannot be disabled.</Text>
        )}
        options={(
          <Toggle
            isActive={isEncrypted}
            onToggle={handleEncryptionEnable}
            disabled={isEncrypted || !canEnableEncryption}
          />
        )}
      /> */}
    </div>
  );
}

RoomEncryption.propTypes = {
  roomId: PropTypes.string.isRequired,
};

export default RoomEncryption;
