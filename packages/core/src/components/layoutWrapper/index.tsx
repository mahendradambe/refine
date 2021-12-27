import {
    useComponents,
    useRouterContext,
    useTranslate,
    useWarnAboutChange
} from "@hooks";
import { useLayout } from "@hooks/layout";
import React, { FC, useEffect } from "react";

export interface LayoutWrapperProps {}

/**
 * `<LayoutWrapper>` wraps its contents in **refine's** layout with all customizations made in {@link https://refine.dev/docs/api-references/components/refine-config `<Refine>`} component.
 * It is the default layout used in resource pages.
 * It can be used in custom pages to use global layout.
 *
 * @see {@link https://refine.dev/docs/api-references/components/layout-wrapper} for more details.
 */
export const LayoutWrapper: FC<LayoutWrapperProps> = ( { children } ) => {
    const { Layout } = useLayout();
    const { components } = useComponents();

    return (
        <Layout components={components}>
            {children}
            <UnsavedPrompt />
        </Layout>
    );
};

const UnsavedPrompt: React.FC = () => {
    const { Prompt } = useRouterContext();

    const translate = useTranslate();

    const { warnWhen, setWarnWhen } = useWarnAboutChange();

    const warnWhenListener = ( e: {
        preventDefault: () => void;
        returnValue: string;
    } ) => {
        e.preventDefault();

        e.returnValue = translate(
            "warnWhenUnsavedChanges",
            "Are you sure you want to leave? You have unsaved changes."
        );

        return e.returnValue;
    };

    useEffect( () => {
        if ( warnWhen ) {
            window.addEventListener( "beforeunload", warnWhenListener );
        }

        return window.removeEventListener( "beforeunload", warnWhenListener );
    }, [ warnWhen ] );

    return (
        <Prompt
            when={warnWhen}
            message={translate(
                "warnWhenUnsavedChanges",
                "Are you sure you want to leave? You have unsaved changes."
            )}
            setWarnWhen={setWarnWhen}
        />
    );
};
