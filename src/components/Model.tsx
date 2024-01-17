import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

import type { Object3D, Object3DEventMap } from 'three';

type ModelProps = {
    url: string;
    grapher: [
        Object3D<Object3DEventMap>[],
        (o: Object3D<Object3DEventMap>[]) => void,
    ];
    preprocessor?: (
        updateKey: (okey: string, nkey: string) => boolean,
        elm: Object3D<Object3DEventMap>,
    ) => void;
};

const Model = ({ url, grapher: [, setGraph], preprocessor }: ModelProps) => {
    const gltf = useGLTF(url, true, true);

    useEffect(() => {
        const graph =
            gltf.scene.children[0]?.children[0]?.children[0]?.children;

        if (graph === undefined) {
            throw new Error(
                `Something wrong with model GRAPH. Check it's implementation`,
            );
        }

        setGraph(graph);
    }, [gltf, setGraph, preprocessor]);

    return (
        <>
            <primitive object={gltf.scene} />
        </>
    );
};

export default Model;

