import React, { createContext, useState, useContext, ReactNode, FC, useEffect } from 'react';

interface IdPlayerContextProps {
    idPlayer: string | null;
    setIdPlayer: (idPlayer: string | null) => void;
}

const IdPlayerContext = createContext<IdPlayerContextProps | undefined>(undefined);

export const IdPlayerProvider: FC<{ children: ReactNode }> = ({ children }) => {
    const [idPlayer, setIdPlayer] = useState<string | null>(() => {
        const savedIdPlayer = localStorage.getItem('idPlayer');
        return savedIdPlayer ? savedIdPlayer : null;
    });

    useEffect(() => {
        if (idPlayer) {
            localStorage.setItem('idPlayer', idPlayer);
        } else {
            localStorage.removeItem('idPlayer');
        }
    }, [idPlayer]);

    return (
        <IdPlayerContext.Provider value={{ idPlayer, setIdPlayer }}>
            {children}
        </IdPlayerContext.Provider>
    );
};

export const useIdPlayer = () => {
    const context = useContext(IdPlayerContext);
    if (!context) {
        throw new Error('useIdPlayer must be used within an IdPlayerProvider');
    }
    return context;
};
