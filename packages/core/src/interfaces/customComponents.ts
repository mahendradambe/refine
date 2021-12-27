import React, { ComponentType } from "react";
import { ReactNode } from "react-markdown";

export type PageOptions<
    TPageProps extends Record<string, any> = Record<string, any>
> = {
    name?: string;
    label?: ReactNode;
    icon?: ReactNode;
    page: ComponentType<TPageProps>;
};
