import React, { useState, useEffect } from 'react';
// import './Room.scss';
import styles from './Room.module.css'
import initMatrix from '../../../client/initMatrix';
import cons from '../../../client/state/cons';
import navigation from '../../../client/state/navigation';
import settings from '../../../client/state/settings';
import RoomTimeline from '../../../client/state/RoomTimeline';

import Welcome from '../welcome/Welcome';
import RoomView from './RoomView';
import RoomSettings from './RoomSettings';
import PeopleDrawer from './PeopleDrawer';

function Room() {
  const [roomInfo, setRoomInfo] = useState({
    roomTimeline: null,
    eventId: null,
  });
  const [isDrawer, setIsDrawer] = useState(false);

  const mx = initMatrix.matrixClient;

  useEffect(() => {
    const handleRoomSelected = (rId, pRoomId, eId) => {
      roomInfo.roomTimeline?.removeInternalListeners();
      if (mx.getRoom(rId)) {
        setRoomInfo({
          roomTimeline: new RoomTimeline(rId),
          eventId: eId ?? null,
        });
      } else {
        // TODO: add ability to join room if roomId is invalid
        setRoomInfo({
          roomTimeline: null,
          eventId: null,
        });
      }
    };

    navigation.on(cons.events.navigation.ROOM_SELECTED, handleRoomSelected);
    return () => {
      navigation.removeListener(cons.events.navigation.ROOM_SELECTED, handleRoomSelected);
    };
  }, [roomInfo]);

  useEffect(() => {
    const handleDrawerToggling = (visiblity) => setIsDrawer(visiblity);
    settings.on(cons.events.settings.PEOPLE_DRAWER_TOGGLED, handleDrawerToggling);
    return () => {
      settings.removeListener(cons.events.settings.PEOPLE_DRAWER_TOGGLED, handleDrawerToggling);
    };
  }, []);

  const { roomTimeline, eventId } = roomInfo;
  if (roomTimeline === null) return <Welcome />;

  return (
    // <div className="room">
    //   <div className="room__content">
    //     <RoomSettings roomId={roomTimeline.roomId} />
    //     <RoomView roomTimeline={roomTimeline} eventId={eventId} />
    //   </div>
    //   { isDrawer && <PeopleDrawer roomId={roomTimeline.roomId} />}
    // </div>
    <div className={styles.room}>
      <div className={styles.roomContent}>
        <RoomSettings roomId={roomTimeline.roomId} />
        <RoomView roomTimeline={roomTimeline} eventId={eventId} />
      </div>
      { isDrawer && <PeopleDrawer roomId={roomTimeline.roomId} />}
    </div>
  );
}

export default Room;
