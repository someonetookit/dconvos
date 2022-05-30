import React, { useState, useEffect } from "react";
import styles from "./Client.module.css";

import { initHotkeys } from "../../../client/event/hotkeys";
import { initRoomListListener } from "../../../client/event/roomList";

import Text from "../../atoms/text/Text";
import Navigation from "../../organisms/navigation/Navigation";
import ReusableContextMenu from "../../atoms/context-menu/ReusableContextMenu";
import Room from "../../organisms/room/Room";
import Windows from "../../organisms/pw/Windows";
import Dialogs from "../../organisms/pw/Dialogs";
import EmojiBoardOpener from "../../organisms/emoji-board/EmojiBoardOpener";
import logout from "../../../client/action/logout";

import initMatrix from "../../../client/initMatrix";
import navigation from "../../../client/state/navigation";
import cons from "../../../client/state/cons";
import DragDrop from "../../organisms/drag-drop/DragDrop";

function Client() {
  const [isLoading, changeLoading] = useState(true);
  const [loadingMsg, setLoadingMsg] = useState("loading your chats");
  const [dragCounter, setDragCounter] = useState(0);

  useEffect(() => {

    document.title = "dConvos";
    let counter = 0;
    const iId = setInterval(() => {
      const msgList = [
        "Almost there...",
        "Looks like you have a lot of stuff to heat up!",
      ];
      if (counter === msgList.length - 1) {
        setLoadingMsg(msgList[msgList.length - 1]);
        clearInterval(iId);
        return;
      }
      setLoadingMsg(msgList[counter]);
      counter += 1;
    }, 15000);
    initMatrix.once("init_loading_finished", () => {
      clearInterval(iId);
      initHotkeys();
      initRoomListListener(initMatrix.roomList);
      changeLoading(false);
    });
    initMatrix.init();
  }, []);

  if (isLoading) {
    return (
      <div className={styles.container}>
        <svg
          className={styles.tea}
          width="37"
          height="48"
          viewbox="0 0 37 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M27.0819 17H3.02508C1.91076 17 1.01376 17.9059 1.0485 19.0197C1.15761 22.5177 1.49703 29.7374 2.5 34C4.07125 40.6778 7.18553 44.8868 8.44856 46.3845C8.79051 46.79 9.29799 47 9.82843 47H20.0218C20.639 47 21.2193 46.7159 21.5659 46.2052C22.6765 44.5687 25.2312 40.4282 27.5 34C28.9757 29.8188 29.084 22.4043 29.0441 18.9156C29.0319 17.8436 28.1539 17 27.0819 17Z"
            stroke="var(--secondary)"
            stroke-width="2"
          ></path>
          <path
            d="M29 23.5C29 23.5 34.5 20.5 35.5 25.4999C36.0986 28.4926 34.2033 31.5383 32 32.8713C29.4555 34.4108 28 34 28 34"
            stroke="var(--secondary)"
            stroke-width="2"
          ></path>
          <path
            className={styles.teabag}
            fill="var(--secondary)"
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16 25V17H14V25H12C10.3431 25 9 26.3431 9 28V34C9 35.6569 10.3431 37 12 37H18C19.6569 37 21 35.6569 21 34V28C21 26.3431 19.6569 25 18 25H16ZM11 28C11 27.4477 11.4477 27 12 27H18C18.5523 27 19 27.4477 19 28V34C19 34.5523 18.5523 35 18 35H12C11.4477 35 11 34.5523 11 34V28Z"
          ></path>
          <path
            className={styles.steamL}
            d="M17 1C17 1 17 4.5 14 6.5C11 8.5 11 12 11 12"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke="var(--secondary)"
          ></path>
          <path
            className={styles.steamR}
            d="M21 6C21 6 21 8.22727 19 9.5C17 10.7727 17 13 17 13"
            stroke="var(--secondary)"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <Text className={styles.loadingMessage} variant="b2">
          {loadingMsg}
        </Text>

        <div className={styles.version}>
          {/* import version from github once repo goes public */}
          <p>dConvos 1.0.0 <span className={styles.logout} onClick={logout}>logout</span></p>
        </div>
      </div>
    );
  }

  function dragContainsFiles(e) {
    if (!e.dataTransfer.types) return false;

    for (let i = 0; i < e.dataTransfer.types.length; i += 1) {
      if (e.dataTransfer.types[i] === "Files") return true;
    }
    return false;
  }

  function modalOpen() {
    return navigation.isRawModalVisible && dragCounter <= 0;
  }

  function handleDragOver(e) {
    if (!dragContainsFiles(e)) return;

    e.preventDefault();

    if (!navigation.selectedRoomId || modalOpen()) {
      e.dataTransfer.dropEffect = "none";
    }
  }

  function handleDragEnter(e) {
    e.preventDefault();

    if (navigation.selectedRoomId && !modalOpen() && dragContainsFiles(e)) {
      setDragCounter(dragCounter + 1);
    }
  }

  function handleDragLeave(e) {
    e.preventDefault();

    if (navigation.selectedRoomId && !modalOpen() && dragContainsFiles(e)) {
      setDragCounter(dragCounter - 1);
    }
  }

  function handleDrop(e) {
    e.preventDefault();

    setDragCounter(0);

    if (modalOpen()) return;

    const roomId = navigation.selectedRoomId;
    if (!roomId) return;

    const { files } = e.dataTransfer;
    if (!files?.length) return;
    const file = files[0];
    initMatrix.roomsInput.setAttachment(roomId, file);
    initMatrix.roomsInput.emit(cons.events.roomsInput.ATTACHMENT_SET, file);
  }

  return (
    <div
      className={styles.mainContainer}
      onDragOver={handleDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={styles.navigationWrapper}>
        <Navigation />
      </div>
      <div className={styles.roomWrapper}>
        <Room />
      </div>
      <Windows />
      <Dialogs />
      <EmojiBoardOpener />
      <ReusableContextMenu />
      <DragDrop isOpen={dragCounter !== 0} />
    </div>
  );
}

export default Client;
