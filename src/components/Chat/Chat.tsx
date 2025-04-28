import styles from './Chat.module.scss';
import { InputBlock } from '../InputBlock';
import { MessagesBlock } from '../MessagesBlock';

export const Chat = () => {
  return (
    <div className={styles.chat}>
      <div className={styles.chat__header}>
        <h1 className={styles.chat__title}>AI-Platform</h1>
        <InputBlock />
      </div>
      <MessagesBlock />
    </div>
  );
}