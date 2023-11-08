import { createContext, useContext, useEffect, useState } from "react";
export const DarkmodeContext = createContext()

export const useDarkMode = () => {
    const darm = useContext(DarkmodeContext);
    return darm;
}
export const DarkmodeProvider = ({children}) => {
    const [darkmode, setDarkMode] = useState(undefined);
    const darkmodeinfo = { darkmode, setDarkMode }
    useEffect(()=>{
        if(darkmode){
            document.body.style.background = "#252525"
        }else{
            document.body.style.background = "#d9d9d9"
        }
    },[darkmode])
    return (
        <DarkmodeContext.Provider value={darkmodeinfo}>{children}</DarkmodeContext.Provider>
    );
}

export default useDarkMode;