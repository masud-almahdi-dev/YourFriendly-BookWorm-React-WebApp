import { createContext, useContext, useEffect, useState } from "react";
export const DarkmodeContext = createContext()

const useDarkMode = () => {
    const darm = useContext(DarkmodeContext);
    return darm;
}
export const DarkmodeProvider = ({children}) => {
    const [darkmode, setDarkMode] = useState(undefined);
    const darkmodeinfo = { darkmode, setDarkMode }
    useEffect(()=>{
        if(darkmode){
            document.body.style.backgroundColor = "#252525"
        }else{
            document.body.style.backgroundColor = "#d9d9d9"
        }
    },[darkmode])
    return (
        <DarkmodeContext.Provider value={darkmodeinfo}>{children}</DarkmodeContext.Provider>
    );
}

export default useDarkMode;