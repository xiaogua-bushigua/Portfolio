import React, { useState } from 'react';
import Loading from './Loading';
import MainScene from './MainScene';

export const MyContext = React.createContext();

function App() {
	const [global, setGlobal] = useState({
		scene: {
			mainSceneLoaded: false,
			sunTime: 0,
			timeThreshold: 5,
			transitionTime: 1.5,
			waitTime: 2,
			transitionStatus: false,
			refreshKey: 0,
		},
		gift: {
			information: {},
			open: false,
			positions: [],
		},
	});
	return (
		<MyContext.Provider value={{ global, setGlobal }}>
			{!global.scene.mainSceneLoaded && <Loading />}
			<MainScene />
		</MyContext.Provider>
	);
}

export default App;
