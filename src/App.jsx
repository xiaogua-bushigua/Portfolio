import React, { useState } from 'react';
import Loading from './Loading';
import MainScene from './MainScene';

export const SceneContext = React.createContext();

function App() {
	const [global, setGlobal] = useState({
		mainSceneLoaded: false,
		sunTime: 0,
		timeThreshold: 5,
		transitionTime: 1.5,
		waitTime: 2,
		transitionStatus: false,
	});
	return (
		<SceneContext.Provider value={{ global, setGlobal }}>
			<MainScene />
			{!global.mainSceneLoaded && <Loading />}
		</SceneContext.Provider>
	);
}

export default App;