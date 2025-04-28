/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import { v4 as uuidv4 } from 'uuid';
import styles from './InputBlock.module.scss';
import { RootState } from '../../store/store';
import { addMessage } from '../../features/chatSlice';
import { setUserId } from '../../features/authSlice';
import { Message } from '../../types/Message';

export const InputBlock = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state: RootState) => state.auth.userId);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let storedUserId = localStorage.getItem('userId');
    if (!storedUserId) {
      storedUserId = crypto.randomUUID();
      localStorage.setItem('userId', storedUserId);
    }
    dispatch(setUserId(storedUserId));
  }, [dispatch]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const debouncedSendMessage = useCallback(
    debounce(() => {
      if (!query) return;

      const newMessage: Message = {
        userId,
        id: uuidv4(),
        text: query,
        role: 'user',
      };

      dispatch(addMessage(newMessage));
      setQuery('');

      setTimeout(() => {
        const aiResponse: Message = {
          userId,
          id: uuidv4(),
          text: `AI response to: ${query}`,
          role: 'ai',
        };
        dispatch(addMessage(aiResponse));
      }, 1000);
    }, 1000),
    [query, dispatch, userId]
  );

  const handleSendMessage = () => {
    debouncedSendMessage();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    return () => {
      debouncedSendMessage.cancel();
    };
  }, [debouncedSendMessage]);

  return (
    <div className={styles.input__block}>
      <input
        value={query}
        onChange={handleQueryChange}
        type="text"
        placeholder="Type a message..."
        className={styles.input__value}
        onKeyDown={handleKeyDown}
      />
      <button
        type="button"
        title="Send message"
        className={styles.input__button}
        onClick={handleSendMessage}
        onKeyDown={handleKeyDown}
        disabled={!query}
      >
        Send
      </button>
    </div>
  );
};