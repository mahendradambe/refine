import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import {
    CustomResponse,
    IDataContext,
    CrudSorting,
    CrudFilters,
    BaseRecord,
    HttpError,
    MetaDataQuery,
    INotificationArgs
} from "../../interfaces";
import { useTranslate, useCheckError, useNotificationApi } from "@hooks";

interface UseCustomConfig<TQuery, TPayload> {
    sort?: CrudSorting;
    filters?: CrudFilters;
    query?: TQuery;
    payload?: TPayload;
    headers?: {};
}

export type UseCustomProps<TData, TError, TQuery, TPayload> = {
    url: string;
    method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch";
    config?: UseCustomConfig<TQuery, TPayload>;
    queryOptions?: UseQueryOptions<CustomResponse<TData>, TError>;
    successNotification?: INotificationArgs | false;
    errorNotification?: INotificationArgs | false;
    metaData?: MetaDataQuery;
};

/**
 * `useCustom` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for custom requests.
 *
 * It uses the `custom` method from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useCustom} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 * @typeParam TQuery - Values for query params
 * @typeParam TPayload - Values for params
 *
 */
export const useCustom = <
    TData = BaseRecord,
    TError extends HttpError = HttpError,
    TQuery = unknown,
    TPayload = unknown
>( {
    url,
    method,
    config,
    queryOptions,
    successNotification,
    errorNotification,
    metaData
}: UseCustomProps<TData, TError, TQuery, TPayload> ): QueryObserverResult<
    CustomResponse<TData>,
    TError
> => {
    const { custom } = useContext<IDataContext>( DataContext );
    const { mutate: checkError } = useCheckError();
    const translate = useTranslate();
    const notifier = useNotificationApi();

    const queryResponse = useQuery<CustomResponse<TData>, TError>(
        [ `custom/${method}-${url}`, { ...config, ...metaData } ],
        () => custom<TData>( { url, method, ...config, metaData } ),
        {
            ...queryOptions,
            onSuccess: data => {
                queryOptions?.onSuccess?.( data );
                notifier.open( successNotification );
            },
            onError: ( err: TError ) => {
                checkError( err );
                queryOptions?.onError?.( err );

                notifier.open( errorNotification, {
                    key: `${method}-notification`,
                    message: translate(
                        "common:notifications.error",
                        { statusCode: err.statusCode },
                        `Error (status code: ${err.statusCode})`
                    ),
                    description: err.message,
                    type: "error"
                } );
            }
        }
    );

    return queryResponse;
};
