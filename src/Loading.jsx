import React, { useContext } from 'react';
import { Instances, Instance, Html } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useState } from 'react';
import { MyContext } from './App';

const Loading = () => {
	return (
		<Canvas
			shadows
			onCreated={(gl) => {
				gl.physicallyCorrectLights = true;
			}}
		>
			<OrbitControls enableZoom={false} enablePan={false} enableRotate={true} />
			<PerspectiveCamera makeDefault fov={50} position={[0, 15, 15]} />
			<ambientLight intensity={0.3} />
			<SunCloud />
		</Canvas>
	);
};

export default Loading;

const SunCloud = () => {
	const sunRadius = 0.8;
	const sunshineDistance = 0.45 + sunRadius;
	const sunshineNum = 8;

	const [progress, setProgress] = useState(0);
	const [position, setPosition] = useState([0, 0, 0]);
	const { global, setGlobal } = useContext(MyContext);

	useFrame((state) => {
		const t = state.clock.getElapsedTime();
		setGlobal({ ...global, scene: { ...global.scene, sunTime: t } });
		if (t < global.scene.timeThreshold) {
			setProgress(t);
		}
		if (global.scene.transitionStatus) {
			const startTime = global.scene.sunTime - global.scene.timeThreshold - global.scene.waitTime;
			setPosition([0, startTime * 10, -startTime * 3]);
		}
	});
	function gradientColor(t) {
		const startColor = { r: 255, g: 112, b: 45 }; // #ff702d
		const endColor = { r: 255, g: 81, b: 0 }; // #ff5100

		const r = Math.round(startColor.r + (endColor.r - startColor.r) * t);
		const g = Math.round(startColor.g + (endColor.g - startColor.g) * t);
		const b = Math.round(startColor.b + (endColor.b - startColor.b) * t);

		return `rgb(${r}, ${g}, ${b})`;
	}

	return (
		<group position={position}>
			<pointLight
				color={'#eba84b'}
				position={[-10, 8, 10]}
				intensity={(progress / global.scene.timeThreshold) * 6 + 0.5}
				distance={300}
				castShadow
				shadow-mapSize-height={512}
				shadow-mapSize-width={512}
				shadow-camera-near={0.5}
				shadow-camera-far={500}
			/>
			{/* cloud */}
			<Instances>
				<sphereGeometry args={[1, 30, 30]} />
				<meshStandardMaterial envMapIntensity={0.5} />
				<group position={[0, 2, 0]}>
					<Instance position={[0, 0, 0]} scale={[1.4, 1.6, 1.4]} />
					<Instance position={[-1.8, -0.4, 0]} scale={[1.2, 1.1, 1.1]} />
					<Instance position={[1.8, -0.2, 0]} scale={[1.1, 1.2, 1.1]} />
					<Instance />
				</group>
			</Instances>
			{/* sun */}
			<group
				position={[
					-(progress / global.scene.timeThreshold) * 0.8 - 1.1,
					(progress / global.scene.timeThreshold) * 2.5 + 0.5,
					-1.5,
				]}
			>
				{/* sun ball */}
				<mesh scale={sunRadius}>
					<sphereGeometry args={[1, 30, 30]} />
					<meshBasicMaterial color={gradientColor(progress / global.scene.timeThreshold)} />
				</mesh>
				{/* sunshine */}
				<Instances>
					<planeGeometry args={[0.15, 0.6, 10]} />
					<meshBasicMaterial color={'#ffae00'} />
					<group rotation={[-Math.PI / 4, 0, global.scene.sunTime * 0.8]}>
						{new Array(sunshineNum).fill(0).map((_, index) => (
							<Instance
								key={index}
								position={[
									sunshineDistance * Math.sin((2 * Math.PI * index) / sunshineNum),
									sunshineDistance * Math.cos((2 * Math.PI * index) / sunshineNum),
									0,
								]}
								scale={[1, 0.25 * Math.sin(global.scene.sunTime * 3 * ((index % 2) * 2 - 1)) + 0.6, 1]}
								rotation={[0, 0, -(index * Math.PI * 2) / sunshineNum]}
							/>
						))}
					</group>
				</Instances>
			</group>
			{global.scene.timeThreshold + global.scene.waitTime > global.scene.sunTime && (
				<Html
					style={{
						margin: '40px -30px',
					}}
				>
					<span>Loading...</span>
				</Html>
			)}
			{/* background */}
			<mesh position={[0, 0, -5]} rotation={[-Math.PI / 4, 0, 0]}>
				<planeGeometry args={[60, 60]} />
				<meshStandardMaterial color={'#6b94f3'} envMapIntensity={0.5} />
			</mesh>
		</group>
	);
};
