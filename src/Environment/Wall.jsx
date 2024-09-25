import React from 'react';
import * as THREE from 'three';
import { useTexture } from '@react-three/drei';

const Wall = ({ height = 10 }) => {
	const dirt = useTexture('./3d assets/dirt.png');
	dirt.wrapS = dirt.wrapT = THREE.RepeatWrapping;
	dirt.repeat.set(2, 0.2);
	return (
		<mesh receiveShadow position={[0, height * 0.1, 0]}>
			<cylinderGeometry args={[17.1, 17.1, height * 0.25, 50, 1, true]} />
			<meshStandardMaterial envMapIntensity={0.2} map={dirt} side={THREE.DoubleSide} />
		</mesh>
	);
};

export default Wall;
