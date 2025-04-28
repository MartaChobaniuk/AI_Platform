import { useCallback, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';
import { AnimatePresence, motion } from 'framer-motion';
import styles from './MessagesBlock.module.scss';
import { RootState } from '../../store/store';


const messageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

export const MessagesBlock = () => {
  const messages = useSelector((state: RootState) => state.chat.messages);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  return (
    <div className={styles.messages__block}>
      <AnimatePresence>
        {messages.map((message) => (
          <motion.div
            key={message.id}
            className={classNames(styles.messages__message, {
              [styles['messages__message--ai']]: message.role === 'ai',
              [styles['messages__message--user']]: message.role === 'user',
            })}
            initial="initial"
            animate="animate"
            exit="exit"
            variants={messageVariants}
            transition={{ duration: 0.3 }}
          >
            <p>{message.text}</p>
          </motion.div>
        ))}
      </AnimatePresence>
      {messages.length === 0 && (
        <div className={styles.messages__text}>
          <p>No messages yet. Start the conversation!</p>
        </div>
      )}
      <div ref={messagesEndRef} />
    </div>
  );
};