import { useEffect } from "react";
import styles from "../../styles/Home/Chat.module.css";

export default function Chat() {
  // useEffect(() => {
  //   if (screen.width < 800) window.location.href = "https://mobile.dconvos.tk";
  // }, []);
  return (
    <>
      <div className={styles.head}>
        <div className={styles.heading}>
          <div className={styles.chatsHead}>
            Chats <span className={styles.unreadMessages}>(2)</span>{" "}
          </div>
          <div className={styles.createNew}>+ Create new chat</div>
        </div>
        <input
          type="text"
          placeholder="Search for a message"
          className={styles.searchMessages}
        ></input>
      </div>
      <div className={styles.inbox}>
        <ChatElement 
        name = "Adhil Adhikari"
        content = "Adhil : Looks good!"
        time = "7:58pm"
        />
        <ChatElement 
        name = "Arjun R G"
        content = "Arjun : Zup"
        time = "7:50pm"/>
        <ChatElement 
        name = "Prathyush P V"
        content = "You : haha"
        time = "7:20pm"/>
      </div>
    </>
  );
}

function ChatElement(props) {
  const {name,content,time} = props;
  return (
    <div className={styles.chatElementBox}>
      <div className={styles.avatar}></div>
      <div className={styles.messageContent}>
        <div className={styles.inboxName}>{name}</div>
        <div className={styles.inboxContent}>{content}</div>
        <div className={styles.inboxTime}>{time}</div>
      </div>
    </div>
  );
}
