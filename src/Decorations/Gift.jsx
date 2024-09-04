import React, { useMemo, useState, useCallback } from 'react';
import { useGLTF } from '@react-three/drei';
import { Select } from '@react-three/postprocessing';
import PubSub from 'pubsub-js';

const Gift = ({ position, information }) => {
	const { nodes, materials } = useGLTF('/3d assets/a_gift_box.glb');
	const [hovered, hover] = useState(null);

	const rotation = useMemo(() => {
		return [0, Math.random() * 2 - 1, 0];
	}, []);

	const handlePointerOver = () => {
		hover(true);
		document.body.style.cursor = 'pointer';
		PubSub.publish('gift', { open: true, information });
	};

	const handlePointerOut = () => {
		hover(false);
		// PubSub.publish('gift', { open: false, information });
		document.body.style.cursor = 'auto';
	};

	return (
		<Select enabled={hovered}>
			<group
				onPointerOver={handlePointerOver}
				onPointerOut={handlePointerOut}
				position={position}
				scale={0.0045}
				rotation={rotation}
				dispose={null}
			>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube_Body_0.geometry}
					material={materials.Body}
					position={[0, 100, 0]}
					rotation={[-Math.PI / 2, 0, 0]}
					scale={100}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube001_Body_0.geometry}
					material={materials.Body}
					position={[0, 183.124, 0]}
					rotation={[-Math.PI / 2, 0, 0]}
					scale={100}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube002_Material_0.geometry}
					material={materials.Material}
					position={[0, 100, -99.172]}
					rotation={[-Math.PI / 2, 0, 0]}
					scale={[17.5, 3, 100]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube003_Material_0.geometry}
					material={materials.Material}
					position={[0, 100, 99.172]}
					rotation={[-Math.PI / 2, 0, -Math.PI]}
					scale={[17.5, 3, 100]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube004_Material_0.geometry}
					material={materials.Material}
					position={[-99.172, 100, 0]}
					rotation={[-Math.PI / 2, 0, Math.PI / 2]}
					scale={[17.5, 3, 100]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube005_Material_0.geometry}
					material={materials.Material}
					position={[99.172, 100, 0]}
					rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
					scale={[17.5, 3, 100]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Torus_Material_0.geometry}
					material={materials.Material}
					position={[0, 205.805, 0]}
					rotation={[-Math.PI / 2, Math.PI / 2, 0]}
					scale={[10, 20, 100]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube006_Material_0.geometry}
					material={materials.Material}
					position={[0, 244.373, 24.12]}
					rotation={[-Math.PI / 2, 0, 0]}
					scale={[100, 68, 40]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube007_Material_0.geometry}
					material={materials.Material}
					position={[24.273, 248.327, 0.059]}
					rotation={[-Math.PI / 2, 0, Math.PI / 2]}
					scale={[100, 68, 40]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube008_Material_0.geometry}
					material={materials.Material}
					position={[-24.343, 248.327, 0.059]}
					rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
					scale={[100, 68, 40]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube009_Material_0.geometry}
					material={materials.Material}
					position={[0, 244.373, -23.795]}
					rotation={[-Math.PI / 2, 0, -Math.PI]}
					scale={[100, 68, 40]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube010_Material_0.geometry}
					material={materials.Material}
					position={[0, 223.511, 9.81]}
					rotation={[-0.595, 0, Math.PI]}
					scale={[100, 68, 40]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube011_Material_0.geometry}
					material={materials.Material}
					position={[-8.548, 227.465, -0.599]}
					rotation={[-Math.PI / 2, -0.976, Math.PI / 2]}
					scale={[100, 68, 40]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube012_Material_0.geometry}
					material={materials.Material}
					position={[8.7, 227.465, -0.599]}
					rotation={[-Math.PI / 2, 0.976, -Math.PI / 2]}
					scale={[100, 68, 40]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cube013_Material_0.geometry}
					material={materials.Material}
					position={[0, 223.511, -10.154]}
					rotation={[-2.546, 0, 0]}
					scale={[100, 68, 40]}
				/>
				<mesh
					castShadow
					receiveShadow
					geometry={nodes.Cylinder_Material_0.geometry}
					material={materials.Material}
					position={[0, 247.614, 0]}
					rotation={[-Math.PI / 2, Math.PI / 2, 0]}
					scale={[40, 18, 100]}
				/>
			</group>
		</Select>
	);
};

export default Gift;

useGLTF.preload('./3d assets/a_gift_box.glb');
