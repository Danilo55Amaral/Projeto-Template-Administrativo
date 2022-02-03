import { createContext, useEffect, useState } from "react";

interface AppContextProps {
    theme?: string
    alterTheme?: () => void
};

const AppContext = createContext<AppContextProps>({});

export function AppProvider(props) {
    const [theme, setTheme] = useState('dark');

    function alterTheme() {
        const newTheme = theme === '' ? 'dark' : ''
        setTheme(newTheme)
        localStorage.setItem('theme', newTheme)
    };

    useEffect(() => {
        const saveTheme = localStorage.getItem('theme')
        setTheme(saveTheme)
    }, []);

    return (
        <AppContext.Provider value={{
            theme,
            alterTheme
        }}>
            {props.children}
        </AppContext.Provider>
    )
};

export default AppContext
