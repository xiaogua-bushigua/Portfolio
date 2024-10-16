import React, { useState, useEffect, useContext } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment, useProgress } from '@react-three/drei';
import AllHills from './Hills/AllHills';
import { Selection, EffectComposer, Outline } from '@react-three/postprocessing';
import Sea from './Environment/Sea';
import Wall from './Environment/Wall';
import Floor from './Environment/Floor';
import Cloud from './Environment/Cloud';
import Boxes from './Decorations/Boxes';
import Layouts from './Layouts';
import { MyContext } from './App';

const MainScene = () => {
	const { progress } = useProgress();
	const { global, setGlobal } = useContext(MyContext);
	const [ratio, setRatio] = useState(1);
	const [size, setSize] = useState(0.1);

	const handleDoubleTap = (() => {
		let lastTap = 0;
		return () => {
			const currentTime = new Date().getTime();
			const tapLength = currentTime - lastTap;
			if (tapLength < 500 && tapLength > 0)
				setGlobal({ ...global, scene: { ...global.scene, refreshKey: global.scene.refreshKey + 1 } });
			lastTap = currentTime;
		};
	})();

	useEffect(() => {
		if (progress === 100) {
			// if (global.gift.positions.length === 0) {
			// 	setGlobal({ ...global, scene: { ...global.scene, refreshKey: global.scene.refreshKey + 1 } });
			// }
			if (global.scene.sunTime >= global.scene.timeThreshold + global.scene.waitTime) {
				if (
					global.scene.sunTime <
					global.scene.timeThreshold + global.scene.waitTime + global.scene.transitionTime
				) {
					setGlobal({ ...global, scene: { ...global.scene, transitionStatus: true } });
					if (window.innerWidth < 1028) setRatio(1.25);
					else setRatio(1);
					setSize(100);
				} else setGlobal({ ...global, scene: { ...global.scene, mainSceneLoaded: true } });
			}
		}
	}, [global.scene.sunTime]);

	useEffect(() => {
		setRatio(0);
	}, []);

	return (
		<>
			{global.scene.mainSceneLoaded && <Layouts />}
			<Canvas
				style={{ width: size + '%', height: size + '%' }}
				shadows
				onCreated={(gl) => {
					gl.physicallyCorrectLights = true;
				}}
				onClick={handleDoubleTap}
			>
				<OrbitControls enableZoom={false} enablePan={false} />
				<PerspectiveCamera makeDefault fov={50} position={[-32 * ratio, 35 * ratio, 32 * ratio]} />
				<color args={['#a5c4ed']} attach="background" />
				<Environment files={'./3d assets/envmap.hdr'} resolution={256} />
				<pointLight
					color={'#f16b17'}
					position={[10, 15, 10]}
					intensity={1.75}
					distance={300}
					castShadow
					shadow-mapSize-height={512}
					shadow-mapSize-width={512}
					shadow-camera-near={0.5}
					shadow-camera-far={500}
				/>
				<ambientLight intensity={0.15} />
				{/* models */}
				<AllHills />
				<Selection>
					<EffectComposer multisampling={8} autoClear={false}>
						<Outline visibleEdgeColor="white" edgeStrength={100} width={1500} />
					</EffectComposer>
					<Boxes />
				</Selection>
				<Sea />
				<Wall />
				<Floor />
				<Cloud />
			</Canvas>
		</>
	);
};

export default MainScene;
