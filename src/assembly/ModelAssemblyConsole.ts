import { URL_QUERY_PARSER } from '../url';
import { LexiconDevil, RouterPackage } from '../core';

export type AssemblyModel = Record<'model', string> & Record<string, string>;

export type ModelAssemblyConsole<T extends AssemblyModel, L extends string> = {
    urlQueryParser: typeof URL_QUERY_PARSER;
    render: (RP: RouterPackage<L>, LD: LexiconDevil<keyof T>) => void;
};
