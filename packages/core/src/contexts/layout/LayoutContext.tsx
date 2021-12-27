import React, { ComponentType, createContext, FC } from "react";
import { DefaultComponent } from "../../components/layoutWrapper/components";
import { ComponentsContextProps } from "../components";

export interface LayoutContextProps {
    Layout: ComponentType<ComponentsContextProps>;
}

export const LayoutContext = createContext<LayoutContextProps>( {
    Layout: DefaultComponent
} );

export const LayoutContextProvider: FC<LayoutContextProps> = ( {
    Layout,
    children
} ) => (
    <LayoutContext.Provider value={{ Layout }}>
        {children}
    </LayoutContext.Provider>
);
