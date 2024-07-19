import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type LexiconDevil<K> = Map<K, { value: string; isDefault: boolean }>;

export type RouterPackage = {
    router: AppRouterInstance;
    pathname: string;
    searchParams: URLSearchParams;
};

export function createRouterPackage(router: AppRouterInstance, pathname: string, mut_search_params: URLSearchParams): RouterPackage {
    return {
        router,
        pathname,
        searchParams: mut_search_params,
    };
}

export * from './DDK';
export type * from './DDK';
