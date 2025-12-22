import { create } from "zustand";


const initialChatId = crypto.randomUUID();

const appStore = create((set,get)=>{
    return {

        // show chat component
        showChatComponent : true,
        setShowChatComponent : (value)=> set({
            showChatComponent : value
        }),

        // loading
        loading : false,
        setLoading: (value)=> set({
            loading : value
        }),

        // chats
        chats : [
            {
                id: initialChatId,
                messages:[]
            }
        ],

        // active chat
        activeChat : initialChatId,
        setActiveChat : (value)=> set({activeChat : value}),

        // add messages
        addMessage : (chatId, value)=> set((state)=>{
            const updatedChats = state.chats.map((chat)=>
                chat.id === chatId ? {...chat, messages: [...chat.messages, value]} : chat
            )
            return {
                chats : updatedChats,
            }
        }),

        //append the chat
        appendMessageToChat : (chatId, chunk)=> set(
            (state)=>{
                const updatedChats = state.chats.map((chat)=> {
                    if(chat.id !== chatId) return chat;

                    const messages = [...chat.messages];
                    const lastIndex = messages.length - 1;

                    if(lastIndex < 0) return chat;

                    messages[lastIndex] = {
                        ...messages[lastIndex],
                        content: (messages[lastIndex].content || "") + chunk,
                    }

                    return {...chat, messages};
                });
                return {chats : updatedChats};
            }
        ),

        // new chat
        setNewChat : ()=> {
            const newChatId = crypto.randomUUID();
            set((state)=> ({
                chats: [...state.chats, {id: newChatId, messages: []}],
            }));
            get().setActiveChat(newChatId);
            get().setShowChatComponent(true)
        },

        // recent chats
        recentChats:[
            {
                id: initialChatId,
                recentChatText: "new chat"
            }
        ],

        // recent chats
        setRecentChats : (value)=> set(state=> {
            const unique = state.recentChats.some((chat)=> chat.id === value.id);

            const updated = unique ? state.recentChats.map((chat)=> chat.id === value.id ? {...chat,...value} : chat) : [value,...state.recentChats];
            return {
                recentChats : updated.slice(0,7)
            }
        }),

        // delete recent chats
        deleteRecentChats : (chatId)=> set((state)=>{
            const checkRecentChats = state.recentChats.filter((chat)=> chat.id !== chatId);
            const checkChats = state.chats.filter((chat)=> chat.id !== chatId);
            
            return {
                recentChats : checkRecentChats,
                chats : checkChats,
                activeChat: checkRecentChats.length > 0 ? checkRecentChats[checkRecentChats.length-1].id : null
            }
        })
    }
})

export default appStore;