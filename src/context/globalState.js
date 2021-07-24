import { createContext } from 'react';

const allCoinDataBasic = async () => {
    const result = await fetch('http://localhost:3570');
    const data = await result.json();
    return data;
} 

const allDataBasic = allCoinDataBasic();

export const GlobalContext = createContext(allDataBasic); 

export default function GlobalState ({children})  {

    return (
        <GlobalContext.Provider value={allDataBasic}>
            { children }
        </GlobalContext.Provider>
    )
}

