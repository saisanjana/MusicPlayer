import React from "react";
import { useContext } from "react";
import { SongsList } from "./list";
import { SongContext } from "../../Contexts/SongContext";

const AudioList = () => {
    let {selectedSong,setSelectedSong} = useContext(SongContext);
    
    return(
        <div >
        <h1 style={{textAlign:"center"}}>Songs.</h1>
        <div className="songsList">
        {SongsList.map(((song:any)=>{
            return (
                <div key={song.name} className={selectedSong.name === song.name ? "song" :"song"}>
                    <div style={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        {song.name}
                        <div className="play-icon" onClick={() => {setSelectedSong({...song})}}></div>
                    </div>
                    <div className="separator"></div>
                </div>
                
            )
            }
        ))
        }
        </div>
        

        </div>

    )
}
export default React.memo(AudioList);