import { create } from 'zustand';

const appStore = create((set)=>(
    {
        loading: false,
        showResult:false,
        recentPrompt: [],
        resultData: [],

        setLoading : (value)=> set({loading : value}),
        setShowResult : (value)=> set({showResult:value}),
        setRecentPrompt: (value)=> set((state)=>{
            const limited = [value,...state.recentPrompt];
            return {
                 recentPrompt : limited.slice(0,8)
            }
        }),
        setResultData: (value)=> set((state)=> ({resultData : [...state.resultData, value]})),

        deleteRecentPrompt :(value)=> set((state)=>{
            const updated = [...state.recentPrompt];
            updated.splice(value,1)

            return {
                recentPrompt : updated
            }
        })
    }
))

export default appStore;