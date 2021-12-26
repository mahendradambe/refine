import React from "react";
import { Fragment } from "react";

export const DefaultComponent = () => {
    console.warn(
        `Warning: Rendering DefaultComponent for ${window.location.pathname}`
    );
    return <Fragment />;
};
