import React, { useEffect, useState } from 'react';
import PubSub from 'pubsub-js';

const Layouts = () => {
	const [open, setOpen] = useState(false);
	const [information, setInformation] = useState('');
	useEffect(() => {
		PubSub.subscribe('gift', (msg, data) => {
			setOpen(data.open);
			if (data.information) setInformation(data.information);
		});
	}, []);
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
						<span>Hover</span> over the gift box to view the project overview.
					</li>
				</ul>
			</section>
			<section>
				<div
					className="project"
					style={{
						transform: open ? 'translateX(0%)' : 'translateX(150%)',
					}}
				>
					<p
						style={{
							fontSize: '18px',
							color: '#000000',
							fontWeight: 'bold',
						}}
					>
						{information.title}
					</p>
					<img
						src={information.cover}
						style={{ width: '100%', objectFit: 'contain', border: '1px solid #666', borderRadius: '8px' }}
					/>
					<p>{information.description}</p>
					<p>
						<span style={{ color: '#000000', fontWeight: 'bold' }}>Technologies: </span>
						<span>{information.technologies}</span>
					</p>
					{information.stars > 0 && (
						<p>
							<span style={{ color: '#000000', fontWeight: 'bold' }}>Github Stars: </span>
							{information.stars}
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
						onClick={() => setOpen(false)}
					/>
					<a href={information.demo} target="_blank">
						<img src="./icons/demo.png" title="demo" style={{ width: '24px', height: '24px' }} />
					</a>
					{information.github && (
						<a href={information.github} target="_blank">
							<img
								src="./icons/github1.png"
								title="github repo"
								style={{ width: '24px', height: '24px', marginLeft: '12px' }}
							/>
						</a>
					)}
				</div>
			</section>
		</>
	);
};

export default Layouts;
