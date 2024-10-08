import React, { useEffect, useState, useContext } from 'react';
import { MyContext } from './App';

const Layouts = () => {
	const [stars, setStars] = useState(0);
	const { global, setGlobal } = useContext(MyContext);

	const getStars = async (url) => {
		try {
			const res = await fetch(url);
			if (!res.ok) {
				throw new Error('Network response was not ok');
			}
			const stars = (await res.json()).stargazers_count;
			setStars(stars);
		} catch (error) {
			setStars(0);
		}
	};

	useEffect(() => {
		getStars(global.gift.information.stars);
	}, [global.gift.information]);

	return (
		<>
			<header
				style={{
					zIndex: 999,
					position: 'fixed',
					top: 0,
					left: 0,
					width: '100%',
					display: 'flex',
					justifyContent: 'space-between',
					alignItems: 'center',
					padding: '12px 16px',
					boxSizing: 'border-box',
					fontFamily: 'zaozigongfangtianliti',
					fontSize: '40px',
					color: '#4631b0',
					letterSpacing: '0.08em',
					userSelect: 'none',
				}}
			>
				<span>Portfolio</span>
				<a href="https://github.com/xiaogua-bushigua/Portfolio" target="_blank">
					<img
						src="./icons/github.png"
						style={{
							width: '48px',
							height: '48px',
						}}
					/>
				</a>
			</header>
			<section className="instruction">
				<ul style={{ fontSize: '18px', letterSpacing: '0.04em' }}>
					<li>
						<span>Hold</span> the left mouse button/screen to rotate the view.
					</li>
					<li>
						<span>Double-click</span> on the page to update the map.
					</li>
					<li>
						<span>Click</span> on the gift box to show the project overview.
					</li>
				</ul>
			</section>
			<section>
				<div
					className="project"
					style={{
						transform: global.gift.open ? 'translateX(0%)' : 'translateX(150%)',
					}}
				>
					<p
						style={{
							fontSize: '18px',
							color: '#000000',
							fontWeight: 'bold',
						}}
					>
						{global.gift.information.title}
					</p>
					<img
						src={global.gift.information.cover}
						style={{ width: '100%', objectFit: 'contain', border: '1px solid #666', borderRadius: '8px' }}
					/>
					<p>{global.gift.information.description}</p>
					<p>
						<span style={{ color: '#000000', fontWeight: 'bold' }}>Technologies: </span>
						<span>{global.gift.information.technologies}</span>
					</p>
					{stars !== 0 && (
						<p>
							<span style={{ color: '#000000', fontWeight: 'bold' }}>Github Stars: </span>
							{stars}
						</p>
					)}
					<img
						src="./icons/close.png"
						style={{
							width: '30px',
							height: '30px',
							position: 'absolute',
							right: '6px',
							top: '6px',
							zIndex: 999,
							cursor: 'pointer',
						}}
						onClick={() => {
							setGlobal({ ...global, gift: { ...global.gift, information: {}, open: false } });
						}}
					/>
					<a href={global.gift.information.demo} target="_blank">
						<img
							src="./icons/demo.png"
							title="demo"
							style={{ width: '24px', height: '24px', userSelect: 'none' }}
						/>
					</a>
					{global.gift.information.github && (
						<a href={global.gift.information.github} target="_blank">
							<img
								src="./icons/github1.png"
								title="github repo"
								style={{ width: '24px', height: '24px', marginLeft: '12px', userSelect: 'none' }}
							/>
						</a>
					)}
				</div>
			</section>
		</>
	);
};

export default Layouts;
