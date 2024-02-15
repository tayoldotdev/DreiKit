import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

/** @deprecated */
export type LexiconDevil<K> = Map<K, { value: string; isDefault: boolean }>;

export type RouterPackage = {
    router: AppRouterInstance;
    pathname: string;
    mutSearchParams: URLSearchParams;
};

export * from './DDK';
export type * from './DDK';
