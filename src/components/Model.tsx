import { useEffect } from 'react';
import { useGLTF, } from '@react-three/drei';

import { Object3D, WebGLRenderer, type Object3DEventMap } from 'three';
import { REVISION } from 'three'
import { KTX2Loader } from 'three-stdlib';

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
    gl: WebGLRenderer,
};

/**
 * JSX component that can be used to put a 3D model on a  webpage
 */
function Model({ url, gl, grapher: [, setGraph], preprocessor }: ModelProps) {
    const gltf = useGLTF(url, false, true, (loader) => {
        const THREE_PATH = `https://unpkg.com/three@0.${REVISION}.x`
        const ktx2Loader = new KTX2Loader().setTranscoderPath(`${THREE_PATH}/examples/jsm/libs/basis/`)
        loader.setKTX2Loader(ktx2Loader.detectSupport(gl));
    });

    useEffect(() => {
        const graph = gltf.scene.children[0]?.children[0]?.children[0]?.children;

        console.log(gltf.scene);

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

