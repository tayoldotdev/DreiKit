import { NotUndefined } from '../Assert';
import { elementExists, hide, show } from './Renderer';

import type { Object3DEventMap, Object3D } from 'three';

let dictioanry = new Map<string, Object3D<Object3DEventMap>>();

function Indexer(
    graph: Object3D<Object3DEventMap>[],
    preprocessor?: (
        updateKey: (okey: string, nkey: string) => boolean,
        elm: Object3D<Object3DEventMap>,
    ) => void,
) {
    const dictioanry = new Map<string, Object3D<Object3DEventMap>>();

    graph.forEach((e) => {
        const { name } = e.userData as { name: string };

        if (name === '' || name === null || name === undefined) {
            return;
        }
        let ekey = name.split('_')[0];

        if (ekey === undefined) {
            throw new Error(`${name} has no valid '_' separator`);
        }

        ekey = ekey
            .trim()
            .split('.-.')
            .at(-1)
            ?.toLowerCase()
            .trimStart()
            .replaceAll(' ', '.');

        const updateKey = (okey: string, nkey: string) => {
            if (ekey?.includes(okey)) {
                ekey = ekey?.replace(okey, nkey);
                return true;
            }
            return false;
        };

        NotUndefined(ekey, `'${name}'`);

        if (preprocessor) {
            preprocessor(updateKey, e);
        }

        dictioanry.set(ekey, e);
        e.visible = false;
    });

    return dictioanry;
}

function buildDictionary(
    graph: Object3D<Object3DEventMap>[],
    preprocessor?: (
        updateKey: (okey: string, nkey: string) => boolean,
        elm: Object3D<Object3DEventMap>,
    ) => void,
) {
    const dict = Indexer(graph, preprocessor);
    dictioanry = dict;
    return dict;
}

export type DDKDictionary = ReturnType<typeof buildDictionary>;

function setDictionary(dict: typeof dictioanry) {
    dictioanry = dict;
}

function getDictioanry() {
    return dictioanry;
}

const Renderer = {
    showOne(element: string) {
        return show(dictioanry, element);
    },
    showMany(elements: string[] | readonly string[]) {
        for (const element of elements) {
            show(dictioanry, element.toLowerCase());
        }
    },
    show(elements: string[] | readonly string[]) {
        for (const element of elements) {
            show(dictioanry, element.toLowerCase());
        }
    },
    showAll() {
        dictioanry.forEach((entry) => {
            entry.visible = true;
            // show(dictioanry, entry.name);
        });
    },
    hide(elements: string[] | readonly string[]) {
        for (const element of elements) {
            hide(dictioanry, element);
        }
    },
    hideAll() {
        dictioanry.forEach((entry) => {
            entry.visible = false;
        });
    },
    exists(element: string) {
        return elementExists(dictioanry, element);
    },
};

export const DDK = {
    getDictioanry,
    setDictionary,
    buildDictionary,
    Renderer,
} as const;
