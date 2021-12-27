import React, { ComponentType, createContext, FC, useContext } from "react";

export interface ComponentsContextProps {
    components: {
        [name: string]: ComponentType;
    };
}

export const ComponentsContext = createContext<ComponentsContextProps>( {
    components: {}
} );

export const ComponentsContextProvider: FC<ComponentsContextProps> = ( {
    children,
    ...components
} ) => (
    <ComponentsContext.Provider value={components}>
        {children}
    </ComponentsContext.Provider>
);
