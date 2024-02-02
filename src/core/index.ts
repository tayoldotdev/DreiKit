import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export type LexiconDevil<K> = Map<K, { value: string; isDefault: boolean }>;

export type RouterPackage<L extends string> = {
    router: AppRouterInstance;
    pathname: string;
    mutSearchParams: URLSearchParams;
    lang: L,
};

export * from './DDK';
export type * from './DDK';
