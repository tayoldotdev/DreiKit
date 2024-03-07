import { type ReadonlyURLSearchParams } from 'next/navigation';
import { type z } from 'zod';
import toast from 'react-hot-toast';

import {  type AssemblyModel } from '../assembly';
import { type RouterPackage, type LexiconDevil } from '../core';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export function mutateSearchParameters(router: AppRouterInstance, pathname: string, searchParams: URLSearchParams, configuration: string, value: string) {
    if (value !== 'none') {
        searchParams.set(configuration as string, value);
    } else {
        searchParams.delete(configuration as string);
    }

    const search = searchParams.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
}

export function deleteOne(router: AppRouterInstance, pathname: string, searchParams: URLSearchParams, configuration: string) {
    searchParams.delete(configuration);

    const search = searchParams.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
}

export function deleteMany(router: AppRouterInstance, pathname: string, searchParams: URLSearchParams, configuration: string[]) {

    for (let i = 0; i < configuration.length; ++i) {
        searchParams.delete(configuration[i] as string);
    }

    const search = searchParams.toString();
    const query = search ? `?${search}` : '';

    router.push(`${pathname}${query}`);
}

//----------------------------------------------------------------------------------------------

/** @deprecated */
export type AssemblyRecord<T extends AssemblyModel> = Record<
    keyof T,
    z.ZodSchema
>;
/** @deprecated */
export type Parser<T extends string | symbol, P extends AssemblyModel> = Record<
    T,
    AssemblyRecord<P>
>;

/** @deprecated */ 
export function mutate<T extends AssemblyModel>(
    RP: RouterPackage,
    configuration: keyof T,
    value: string,
) {
    if (value !== 'none') {
        RP.searchParams.set(configuration as string, value);
    } else {
        RP.searchParams.delete(configuration as string);
    }

    const search = RP.searchParams.toString();
    const query = search ? `?${search}` : '';

    RP.router.push(`${RP.pathname}${query}`);
}

/** @deprecated */
export function consume<
    P extends AssemblyModel,
    T extends Parser<string | symbol, P>,
>(
    PARSERS: T,
    configuration: P,
    searchParams: ReadonlyURLSearchParams,
    LD: LexiconDevil<keyof P>,
) {
    let cfgs = Object.keys(configuration).reduce((acc, c) => acc + ' ' + c);
    if (searchParams.size > 0) {
        searchParams.forEach((param, key) => {
            cfgs = cfgs.replace(key, '');
            const p = PARSERS[configuration.model];
            if (p === undefined) {
                throw new Error(`Missing 'model' configuration PARSER!`);
            }
            const paramParser = p[key as keyof AssemblyRecord<P>].safeParse(
                param,
                {
                    errorMap: (_, ctx) => {
                        return {
                            message: `'${ctx.data}' is not a valid '${key}'`,
                        };
                    },
                },
            );
            if (paramParser.success) {
                LD.set(key as keyof AssemblyRecord<P>, {
                    value: paramParser.data as string,
                    isDefault: false,
                });
            } else {
                // report invalid parameter and set value to default
                paramParser.error.errors.forEach((e) => {
                    toast.error(e.message);
                });
                const defaultConfiguration =
                    configuration[key as keyof AssemblyRecord<P>];
                if (defaultConfiguration === undefined) {
                    toast.error(`Missing default configuration for '${key}'`);
                } else {
                    LD.set(key as keyof AssemblyRecord<P>, {
                        value: defaultConfiguration,
                        isDefault: true,
                    });
                }
            }
        });
    }

    // Set all missing configurations
    cfgs.split(' ').forEach((key) => {
        if (key !== '') {
            const defaultConfiguration =
                configuration[key as keyof AssemblyRecord<P>];
            if (defaultConfiguration === undefined) {
                toast.error(`Missing default configuration for '${key}'`);
            } else {
                LD.set(key as keyof AssemblyRecord<P>, {
                    value: defaultConfiguration,
                    isDefault: true,
                });
            }
        }
    });
}

/** @deprecated */
export const URL_QUERY_PARSER = {
    consume,
    mutate,
} as const;

export const DDK_URL = {
    searchParams: {
        mutate: mutateSearchParameters,
        deleteOne: deleteOne,
        deleteMany: deleteMany,
    },
};
