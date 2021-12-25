import { useContext } from "react";
import { QueryObserverResult, useQuery, UseQueryOptions } from "react-query";

import { DataContext } from "@contexts/data";
import {
    IDataContext,
    BaseRecord,
    GetManyResponse,
    HttpError,
    MetaDataQuery,
    LiveModeProps,
    INotificationArgs
} from "../../interfaces";
import {
    useTranslate,
    useCheckError,
    useResourceSubscription,
    useNotificationApi
} from "@hooks";

export type UseManyProps<TData, TError> = {
    resource: string;
    ids: string[];
    queryOptions?: UseQueryOptions<GetManyResponse<TData>, TError>;
    successNotification?: INotificationArgs | false;
    errorNotification?: INotificationArgs | false;
    metaData?: MetaDataQuery;
} & LiveModeProps;

/**
 * `useMany` is a modified version of `react-query`'s {@link https://react-query.tanstack.com/guides/queries `useQuery`} used for retrieving multiple items from a `resource`.
 *
 * It uses `getMany` method as query function from the `dataProvider` which is passed to `<Refine>`.
 *
 * @see {@link https://refine.dev/docs/api-references/hooks/data/useMany} for more details.
 *
 * @typeParam TData - Result data of the query extends {@link https://refine.dev/docs/api-references/interfaceReferences#baserecord `BaseRecord`}
 * @typeParam TError - Custom error object that extends {@link https://refine.dev/docs/api-references/interfaceReferences#httperror `HttpError`}
 *
 */
export const useMany = <
    TData extends BaseRecord = BaseRecord,
    TError extends HttpError = HttpError
>( {
    resource,
    ids,
    queryOptions,
    successNotification,
    errorNotification,
    metaData,
    liveMode,
    onLiveEvent,
    liveParams
}: UseManyProps<TData, TError> ): QueryObserverResult<GetManyResponse<
    TData
>> => {
    const { getMany } = useContext<IDataContext>( DataContext );
    const translate = useTranslate();
    const { mutate: checkError } = useCheckError();
    const notifier = useNotificationApi();

    const isEnabled =
        queryOptions?.enabled === undefined || queryOptions?.enabled === true;

    useResourceSubscription( {
        resource,
        types: [ "*" ],
        params: { ids: ids ? ids?.map( String ) : [], ...liveParams },
        channel: `resources/${resource}`,
        enabled: isEnabled,
        liveMode,
        onLiveEvent
    } );

    const queryResponse = useQuery<GetManyResponse<TData>, TError>(
        [ `resource/getMany/${resource}`, { ids, ...metaData } ],
        () => getMany<TData>( { resource, ids, metaData } ),
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
                    key: `${ids[0]}-${resource}-getMany-notification`,
                    message: translate(
                        "notifications.error",
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
