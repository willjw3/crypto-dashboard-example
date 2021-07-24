import { createContext } from 'react';

const allCoinData = async () => {
    const result = await fetch('http://localhost:3570');
    const data = await result.json();
    return data;
} 

const allData = allCoinData();

export const GlobalContext = createContext(allData); 

export default function GlobalState ({children})  {

    return (
        <GlobalContext.Provider value={allData}>
            { children }
        </GlobalContext.Provider>
    )
}

