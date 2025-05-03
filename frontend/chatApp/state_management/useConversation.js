import { create } from 'zustand'

const useConversation = create((set) => ({
  selectedConversation: null,
  messages: [],
  setSelectedConversation: (selectedConversation) => {
    console.log('Selected Conversation:', selectedConversation);
    set({ selectedConversation });
  },
  setMessages: (messages) => {
    console.log('Messages:', messages);
    set({ messages });
  }
}));

export default useConversation;
