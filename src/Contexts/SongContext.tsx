import { createContext, useState } from "react";
import { SongsList } from "../Components/AudioList/list";

export const SongContext = createContext<any>({});

export const SongProvider = ({children}:any) => {
    const [selectedSong, setSelectedSong] = useState<any>(SongsList[0]);
    
    return(
        <SongContext.Provider value={{selectedSong,setSelectedSong}}>
            {children}
        </SongContext.Provider>
    )
}


