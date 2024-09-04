import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import AllHills from './Hills/AllHills';
import { Selection, EffectComposer, Outline } from '@react-three/postprocessing';
import PubSub from 'pubsub-js';
import Sea from './Environment/Sea';
import Wall from './Environment/Wall';
import Floor from './Environment/Floor';
import Cloud from './Environment/Cloud';
import Boxes from './Decorations/Boxes';
import Layouts from './Layouts';

function App() {
	const [refreshKey, setRefreshKey] = useState(0);

	const handleRefresh = () => {
		setRefreshKey((prevKey) => prevKey + 1);
	};

  const handleClick = () => {
    PubSub.publish('gift', { open: false });
  }

	return (
		<Suspense>
			<Layouts />
			<Canvas
				shadows
				onCreated={(gl) => {
					gl.physicallyCorrectLights = true;
				}}
				onDoubleClick={handleRefresh}
        onClickCapture={handleClick}
			>
				<OrbitControls enableZoom={false} enablePan={false} />
				<PerspectiveCamera makeDefault fov={50} position={[-14, 36, 28]} />
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
