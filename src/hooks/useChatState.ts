import { useCallback, useReducer } from 'react';

import type { Message } from '@/types';
import { createMessage } from '@/utils/message';

interface UseChatStateReturn {
  messages: Message[];
  isLoading: boolean;
  hasSubmitted: boolean;
  updateChat: (
    action: 'add' | 'update',
    message: Message,
    index?: number,
  ) => void;
  handleStreamingChunk: (chunk: string, mcpTool?: string) => void;
  setLoading: (loading: boolean) => void;
  setHasSubmitted: (submitted: boolean) => void;
}

type ChatAction =
  | { type: 'ADD_MESSAGE'; message: Message }
  | { type: 'UPDATE_MESSAGE'; message: Message; index: number }
  | { type: 'APPEND_CHUNK'; chunk: string; mcpTool?: string }
  | { type: 'SET_LOADING'; loading: boolean }
  | { type: 'SET_HAS_SUBMITTED'; submitted: boolean };

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  hasSubmitted: boolean;
}

function chatReducer(state: ChatState, action: ChatAction): ChatState {
  switch (action.type) {
    case 'ADD_MESSAGE':
      return {
        ...state,
        messages: [...state.messages, action.message],
      };

    case 'UPDATE_MESSAGE': {
      const newMessages = [...state.messages];
      newMessages[action.index] = {
        ...newMessages[action.index],
        content:
          (newMessages[action.index].content || '') +
          (action.message.content || ''),
      };
      return { ...state, messages: newMessages };
    }

    case 'APPEND_CHUNK': {
      if (state.messages.length === 0) {
        return {
          ...state,
          messages: [createMessage('system', action.chunk, action.mcpTool)],
        };
      }

      const lastMessage = state.messages[state.messages.length - 1];
      if (lastMessage.role === 'system') {
        const newMessages = [...state.messages];
        newMessages[newMessages.length - 1] = {
          ...lastMessage,
          content: (lastMessage.content || '') + action.chunk,
        };
        return { ...state, messages: newMessages };
      } else {
        return {
          ...state,
          messages: [
            ...state.messages,
            createMessage('system', action.chunk, action.mcpTool),
          ],
        };
      }
    }

    case 'SET_LOADING':
      return { ...state, isLoading: action.loading };

    case 'SET_HAS_SUBMITTED':
      return { ...state, hasSubmitted: action.submitted };

    default:
      return state;
  }
}

export function useChatState(): UseChatStateReturn {
  const [state, dispatch] = useReducer(chatReducer, {
    messages: [],
    isLoading: false,
    hasSubmitted: false,
  });

  const updateChat = useCallback(
    (action: 'add' | 'update', message: Message, index?: number) => {
      if (action === 'add') {
        dispatch({ type: 'ADD_MESSAGE', message });
      } else if (index !== undefined) {
        dispatch({ type: 'UPDATE_MESSAGE', message, index });
      }
    },
    [],
  );

  const handleStreamingChunk = useCallback(
    (chunk: string, mcpTool?: string) => {
      dispatch({ type: 'APPEND_CHUNK', chunk, mcpTool });
    },
    [],
  );

  const setLoading = useCallback((loading: boolean) => {
    dispatch({ type: 'SET_LOADING', loading });
  }, []);

  const setHasSubmittedCallback = useCallback((submitted: boolean) => {
    dispatch({ type: 'SET_HAS_SUBMITTED', submitted });
  }, []);

  return {
    messages: state.messages,
    isLoading: state.isLoading,
    hasSubmitted: state.hasSubmitted,
    updateChat,
    handleStreamingChunk,
    setLoading,
    setHasSubmitted: setHasSubmittedCallback,
  };
}
