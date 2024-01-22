import { type AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

import { type LexiconDevil } from './URLQueryParser';

import type URL_QUERY_PARSER from './URLQueryParser';

export type AssemblyModel = Record<'model', string> & Record<string, string>;

export type RouterPackage<L extends string> = {
    router: AppRouterInstance;
    pathname: string;
    mutSearchParams: URLSearchParams;
    lang: L,
};

export type ModelAssemblyConsole<T extends AssemblyModel, L extends string> = {
    urlQueryParser: typeof URL_QUERY_PARSER;
    render: (RP: RouterPackage<L>, LD: LexiconDevil<keyof T>) => void;
};
