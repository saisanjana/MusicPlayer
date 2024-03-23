import { createContext, useEffect, useState } from "react";

export const ThemeContext = createContext({})

export const ThemeProvider = (props:any) =>{
    let [theme,setTheme] = useState<any>({
        backgroundColor : '#d8f3dc',
        secondaryColor : '#95d5b2',
        color: '#081c15'
    })
    let root = document?.documentElement;

    useEffect(()=>{
        if(!root){
            root = document.documentElement
        }
    },[])

    useEffect(()=>{
        root.style.setProperty('--background-color',theme.backgroundColor);
        root.style.setProperty('--secondary-color',theme.secondaryColor);
        root.style.setProperty('--color',theme.color);
    },[theme])
    return(
        <ThemeContext.Provider value={{theme,setTheme}}>
            {props.children}
        </ThemeContext.Provider>
    )
}