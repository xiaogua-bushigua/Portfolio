import { Suspense, useState, useEffect } from 'react';
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

function App() {
	const [refreshKey, setRefreshKey] = useState(0);
	const [ratio, setRatio] = useState(1);

	const { progress } = useProgress();

	const handleDoubleTap = (() => {
		let lastTap = 0;
		return () => {
			const currentTime = new Date().getTime();
			const tapLength = currentTime - lastTap;
			if (tapLength < 500 && tapLength > 0) setRefreshKey((prevKey) => prevKey + 1);
			lastTap = currentTime;
		};
	})();

	useEffect(() => {
		if (window.innerWidth < 1028) setRatio(1.25);
	}, []);

	return (
		<Suspense>
			{progress === 100 && <Layouts />}
			<Canvas
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
				<AllHills refreshKey={refreshKey} />
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
		</Suspense>
	);
}

export default App;
