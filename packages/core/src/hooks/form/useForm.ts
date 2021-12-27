import { useRedirectionAfterSubmission, useWarnAboutChange } from "@hooks";
import { UseCreateParams } from "@hooks/data/useCreate";
import { useEffect } from "react";
import {
    SubmitHandler,
    useForm as useFormRHF,
    UseFormProps as RHFUseFormProps,
    UseFormReturn
} from "react-hook-form";
import { UseMutateFunction } from "react-query";
import {
    BaseRecord,
    CreateResponse,
    HttpError,
    IResourceItem,
    MetaDataQuery,
    RedirectionTypes,
    SuccessErrorNotification
} from "../../interfaces";

export type UseForm<TVariables = {}> = {
    form: UseFormReturn<TVariables, object>;
    submitButtonDisabled: boolean;
    handleSubmit: ( e?: React.BaseSyntheticEvent ) => Promise<void>;
};

export type UseFormProps<
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables = {}
> = {
    onMutationSuccess?: (
        data: CreateResponse<TData>,
        variables: TVariables,
        context: any
    ) => void;
    onMutationError?: (
        error: TError,
        variables: TVariables,
        context: any
    ) => void;
    warnWhenUnsavedChanges?: boolean;
    redirect?: RedirectionTypes;
    resource: IResourceItem;
    metaData?: MetaDataQuery;
    mutate: UseMutateFunction<
        CreateResponse<TData>,
        TError,
        UseCreateParams<TVariables>,
        unknown
    >;
} & SuccessErrorNotification &
    RHFUseFormProps<TVariables, object>;

export const useForm = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError,
    TVariables extends Record<string, any> = Record<string, any>
>( {
    onMutationSuccess,
    onMutationError,
    warnWhenUnsavedChanges: warnWhenUnsavedChangesProp,
    redirect = "edit",
    resource,
    successNotification,
    errorNotification,
    metaData,
    mutate,
    ...rhfUseFormProps
}: UseFormProps<TData, TError, TVariables> ): UseForm<TVariables> => {
    const {
        formState,
        reset,
        handleSubmit,
        control,
        clearErrors,
        getValues,
        register,
        resetField,
        setError,
        setFocus,
        setValue,
        trigger,
        unregister,
        watch
    } = useFormRHF( rhfUseFormProps );

    const submitButtonDisabled =
        !formState.isValid || formState.isValidating || formState.isSubmitting;

    const {
        warnWhenUnsavedChanges: warnWhenUnsavedChangesContext,
        setWarnWhen
    } = useWarnAboutChange();

    const warnWhenUnsavedChanges =
        warnWhenUnsavedChangesProp ?? warnWhenUnsavedChangesContext;

    const handleSubmitWithRedirect = useRedirectionAfterSubmission();

    const onFinish: SubmitHandler<TVariables> = async values => {
        setWarnWhen( false );
        mutate(
            {
                values: values as TVariables,
                resource: resource.name,
                successNotification,
                errorNotification,
                metaData
            },
            {
                onSuccess: ( data, variables, context ) => {
                    if ( onMutationSuccess ) {
                        return onMutationSuccess(
                            data,
                            values as TVariables,
                            context
                        );
                    }

                    const id = data?.data?.id;

                    handleSubmitWithRedirect( {
                        redirect,
                        resource,
                        id
                    } );
                },
                onError: ( error: TError, variables, context ) => {
                    if ( onMutationError ) {
                        return onMutationError(
                            error,
                            values as TVariables,
                            context
                        );
                    }
                }
            }
        );
    };

    useEffect( () => {
        if ( formState.isSubmitSuccessful ) {
            reset();
        }

        return () => {
            reset();
        };
    }, [ formState.isSubmitted ] );

    useEffect( () => {
        if ( warnWhenUnsavedChanges ) {
            setWarnWhen( true );
        }
        return () => {};
    }, [ formState.isDirty ] );

    return {
        form: {
            formState,
            reset,
            handleSubmit,
            control,
            clearErrors,
            getValues,
            register,
            resetField,
            setError,
            setFocus,
            setValue,
            trigger,
            unregister,
            watch
        },
        handleSubmit: handleSubmit( onFinish ),
        submitButtonDisabled
    };
};
