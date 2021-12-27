import { ComponentsContext } from "@contexts/components";
import { useContext } from "react";

export const useComponents = () => useContext( ComponentsContext );
