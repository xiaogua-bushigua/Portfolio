import React, { useContext, useEffect, useState } from 'react';
import { MyContext } from './App';

const Alert = () => {
	const { global } = useContext(MyContext);
	const [visible, setVisible] = useState(false);
	useEffect(() => {
		if (global.gift.positions.length === 0) {
			setVisible(true);
			setTimeout(() => {
				setVisible(false);
			}, 5000);
		}
	}, []);
	return (
		<div
			style={{
				position: 'fixed',
				zIndex: 999,
				top: '20%',
				left: '30px',
				backgroundColor: 'white',
				padding: '12px',
				borderRadius: '8px',
				fontFamily: 'zaozigongfangtianliti',
				letterSpacing: '1px',
				fontSize: '18px',
				transform: visible ? 'translateX(0)' : 'translateX(-150%)',
				transition: 'transform 0.5s ease-out',
			}}
		>
			You need a double-click!
		</div>
	);
};

export default Alert;
