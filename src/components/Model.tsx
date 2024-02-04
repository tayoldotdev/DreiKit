import { useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

import type { Object3D, Object3DEventMap } from 'three';


/**
 *  Indexed 3D model elements state managmnet {simmilar to useState} 
 *  @returns [graph, setGraph]
 */
export type Grapher = [
    Object3D<Object3DEventMap>[], // graph
    (obj: Object3D<Object3DEventMap>[]) => void, // setGraph
];

/**
 * Function that executes before the 3D model is indexed
 * @param {Function} function that can be used to rename 3D model elements  
 * @param {Object}   3D element object reference 
 */
export type Preprocessor = (upadteKey: (oldKey: string, newKey: string) => boolean, element: Object3D<Object3DEventMap>) => void; 

/**
 * @type {Object} ModelProps
 */
interface ModelProps {
    url: string;
    grapher: Grapher,
    preprocessor?: Preprocessor,
};

/**
 * JSX component that can be used to put a 3D model on a  webpage
 */
function Model({ url, grapher: [, setGraph], preprocessor }: ModelProps) {
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

