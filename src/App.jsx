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
			{!global.mainSceneLoaded && <Loading />}
			<MainScene />
		</SceneContext.Provider>
	);
}

export default App;

// 1. 写个假等待，waitTime到来前不渲染MainScene, waitTime到来后渲染MainScene, progress完成后，loading开始transition