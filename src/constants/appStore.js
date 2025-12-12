import { create } from "zustand";

const appStore = create((set) => ({

  loading: false,
  showResult: false,

  setLoading: (value) => set({ loading: value }),
  setShowResult: (value) => set({ showResult: value }),
  
  // All chats
  chats:[
    {
        id: crypto.randomUUID(),
        messages:[]
    }
  ],
  // Recent chats
  recentChats:[],

  // Active chat
  activeChat: "",
   setActiveChat : (id)=> set({activeChat: id}),

  
  // Add messages
  addMessage: (value)=> set((state)=> {
    const updatedChats = [...state.chats];
    const lastIndex = updatedChats.length-1;

    updatedChats[lastIndex] = {
        ...updatedChats[lastIndex],
        messages:[
            ...updatedChats[lastIndex].messages, {...value}
        ]
    }
    return {
        chats : updatedChats,
    }
  }),

  // New Chat
  setNewChat: ()=> set((state)=> ({
    chats: [...state.chats , {
        id: crypto.randomUUID(),
        messages:[]
    }]
  })),

  // Recent Chats
  setRecentChats:()=> set((state)=>{
     const lastChat = state.chats[state.chats.length - 1];
    const updated = lastChat.messages.find(m => m.sender === "user");

    const chatId = lastChat.id;
    const text = updated.text;

    const alreadyAdded = state.recentChats.some((c)=> c.id === chatId);
    if(alreadyAdded){
        return {
            recentChats: state.recentChats
        }
    }
    return {
        recentChats : [{id: chatId,text}, ...state.recentChats]
    }
  }),


// Deleting the chat
  deleteRecentChat: (id) =>
    set((state) => {
      const updated = [...state.recentChats];
      const updatedRecent=  updated.filter((i)=> i.id !== id)

      const updatedChats = state.chats.filter((chat)=> chat.id !== id);

      return {
        recentChats: updatedRecent,
        chats: updatedChats,
      };
    }),
}));

export default appStore;
