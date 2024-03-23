import { useContext, useEffect, useRef, useState } from "react";
import { SongContext } from "../../Contexts/SongContext";
import { SongsList } from "../AudioList/list";
import { ThemeContext } from "../../Contexts/ThemeContext";
import { Themes } from "../../Contexts/theme";

const Player = () => {
    let {selectedSong,setSelectedSong} = useContext<any>(SongContext);
    let {theme,setTheme} = useContext<any>(ThemeContext);
    let [playing, setIsPlaying] = useState<boolean>(false);
    let [audioElement, setAudioElement] = useState<any>(null);
    let selectedSongRef = useRef<any>(null);
    let progressBar:any = null;
    let progressBarLine:any = useRef<any>(null);

    const onPrevClick = () => {
        let index = selectedSong.index;
        if(index!==0){
            index = index-1
            setSelectedSong(SongsList[index])
        }
    }
    const onNextClick = () => {
       
        let index = selectedSongRef.current.index;
        if(index !== (SongsList.length -1)){
            
            index = index+1;
            
            setSelectedSong({...SongsList[index]})
        }
    }
    const onPausePlayClick = () => {
        setIsPlaying(!playing);
        playing? audioElement.pause(): audioElement.play();
    }
    const onProgressBarClick = (e:any) => {
        let wantedWidth = e.clientX - progressBarLine.current?.getBoundingClientRect().x;
        let totalWidth = progressBarLine.current?.getBoundingClientRect().width;
        console.log(progressBarLine.current?.getBoundingClientRect())
        console.log(wantedWidth,totalWidth)
        let percent = (wantedWidth/totalWidth)*100;
        if(playing){
            let desiredTime = (percent/100) * audioElement.duration.toFixed(1);
            console.log(desiredTime)
            audioElement.currentTime = desiredTime;
        }
        
        
    }

    const onThemeClick= (newTheme:any) =>{
        setTheme(newTheme)
    }

    useEffect(()=>{
        selectedSongRef.current = selectedSong
        progressBar = document.querySelector('.background-overlay');
        progressBarLine.current = document.querySelector('.wavy-container');
        console.log("hereeee",progressBarLine)
        console.log(document.querySelector('.wavy-container')?.getBoundingClientRect())
        let newAudio = new Audio(selectedSong.src);
        if(progressBar){
            progressBar.style.width = `${0}%`;
        }
        if(playing){
            ("here also")
            audioElement.pause();
            audioElement.src = selectedSong.src;
            audioElement.load();
            audioElement.play();
        }else{
            newAudio.addEventListener("ended",()=>{
                onNextClick();
            })
            newAudio.addEventListener("timeupdate",function(){
                let currentTime:any = newAudio.currentTime.toFixed(1);
                let totalTime:any = newAudio.duration.toFixed(1);
                let durationCompleted:number = (currentTime/totalTime)*100
                progressBar.style.width = `${durationCompleted}%`;
            })
            setAudioElement(newAudio);
        }
    },[selectedSong])

    return(
        <div className="player">
            <div className="background-overlay"></div>
            {Themes.map((theme1:any,index:any)=>{
                return <div onClick={()=>{
                    onThemeClick(theme1)
                }} className={`themeChanger themeChanger${index} ${theme1.backgroundColor === theme.backgroundColor ?" themeSelected":""}`}></div>
            })}

            <div style={{textAlign:"center", fontSize:"4.5vw", marginTop:"20px",zIndex:"5000"}}>{selectedSong.name}</div>
            <div className="wavy-container">
                <div className={!playing ? "wavy-line" : "wavy-line playing"} onClick={(e:any)=>{
                    onProgressBarClick(e)
                }}></div>
                
            </div>
            <div style={{display:"flex", flexDirection:"row", justifyContent:"center",marginTop:"70px",zIndex:"5000"}}>
                <div className="large-prev-icon" onClick={()=>{
                    onPrevClick()
                }}></div>
                <div className={playing ?  "large-pause-icon": "large-play-icon"} onClick={()=>{
                    onPausePlayClick();
                }}></div>
                <div className="large-next-icon" onClick={()=>{
                    onNextClick();
                }}></div>
            </div>
            
        </div>
    )
}
export default Player;