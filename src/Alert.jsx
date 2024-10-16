import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from './App';

const Alert = () => {
	const { global } = useContext(MyContext);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		if (global.gift.positions.length < 4) {
			setVisible(true);
			setTimeout(() => {
				setVisible(false);
			}, 5000);
		}
	}, [global.gift.positions]);
	return (
		<div
			style={{
				position: 'fixed',
				zIndex: 999,
				top: '15%',
				left: '30px',
				backgroundColor: 'white',
				padding: '12px',
				borderRadius: '8px',
				fontFamily: 'zaozigongfangtianliti',
				letterSpacing: '1px',
				fontSize: '18px',
				transform: visible ? 'translateX(0)' : 'translateX(-150%)',
				transition: 'transform 0.5s ease-out',
        userSelect: 'none',
			}}
		>
			You need a double-click!
		</div>
	);
};

export default Alert;
