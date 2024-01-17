import type { Object3D, Object3DEventMap } from 'three';

export const show = (
    dictioanry: Map<string, Object3D<Object3DEventMap>>,
    key: string,
) => {
    const result = dictioanry.get(key);

    if (result === undefined) {
        // throw new Error(`404: '${key}' not found in model dictionary!`);
        console.warn(`404: '${key}' not found in model dictionary!`);
    } else {
        result.visible = true;
    }
};

export const hide = (
    dictioanry: Map<string, Object3D<Object3DEventMap>>,
    key: string,
) => {
    const result = dictioanry.get(key);

    if (result === undefined) {
        // throw new Error(`404: '${key}' not found in model dictionary!`);
        console.warn(`404: '${key}' not found in model dictionary!`);
    } else {
        result.visible = false;
    }
};

export const elementExists = (
    dictioanry: Map<string, Object3D<Object3DEventMap>>,
    key: string,
) => {
    return dictioanry.get(key) !== undefined;
};
