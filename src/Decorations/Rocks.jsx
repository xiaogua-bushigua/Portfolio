import React from 'react';
import { Instances, Instance, useTexture } from '@react-three/drei';

const Rocks = React.memo(({ rocks }) => {
	const stone = useTexture('./3d assets/stone.png');

	const px = Math.random() * 0.4;
	const pz = Math.random() * 0.4;
	return (
		<Instances castShadow receiveShadow>
			<sphereGeometry args={[Math.random() * 0.3 + 0.1, 7, 7]} />
			<meshStandardMaterial envMapIntensity={0.135} flatShading map={stone} />
			{rocks.map((item, index) => (
				<group key={index}>
					<Instance position={[item.x + px, item.z + 0.1, item.y + pz]} />
				</group>
			))}
		</Instances>
	);
});

export default Rocks;
