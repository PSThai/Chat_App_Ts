import React from 'react';
import { ConversationsContext } from '../context/conversations-context';

// Use Message
export const useConversations: Function = () =>
  React.useContext<any>(ConversationsContext);
