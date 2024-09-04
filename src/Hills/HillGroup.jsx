import React, { useEffect } from 'react';
import { Instances, Instance, useTexture } from '@react-three/drei';

const HillGroup = ({ hills, type }) => {
	const [dirt, dirt2, grass, sand, water, stone] = useTexture([
		'./3d assets/dirt.png',
		'./3d assets/dirt2.jpg',
		'./3d assets/grass.jpg',
		'./3d assets/sand.jpg',
		'./3d assets/water.jpg',
		'./3d assets/stone.png',
	]);
	const mapTypes = { dirt, dirt2, grass, sand, water, stone };

	return (
		<Instances castShadow receiveShadow>
			<cylinderGeometry args={[1, 1, 1, 6, 1, false]} />
			<meshStandardMaterial envMapIntensity={0.135} flatShading map={mapTypes[type]} />
			{hills.map((item, index) => (
				<group key={index}>
					<Instance position={[item.x, item.z / 2, item.y]} scale-y={item.z} />
				</group>
			))}
		</Instances>
	);
};

export default HillGroup;
