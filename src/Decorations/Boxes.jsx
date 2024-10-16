import React, { useMemo, useContext } from 'react';
import Gift from './Gift';
import { MyContext } from '../App';

const information = [
	{
		title: 'Database Visualization',
		cover: './portfolio/yelod.png',
		description:
			'This project is designed to display database data either dynamically or statically, using various charts to effectively visualize the information.',
		technologies:
			'React.js, Redux.js, TypeScript, Next.js, NextAuth.js, MongoDB, MySQL, Prisma, ECharts, Tailwind CSS, Radix-UI',
		stars: 'https://api.github.com/repos/xiaogua-bushigua/YeloD',
		demo: 'https://yelo-d.vercel.app',
		github: 'https://github.com/xiaogua-bushigua/YeloD',
	},
	{
		title: '3D Map',
		cover: './portfolio/geomap.png',
		description:
			'This project demonstrates the capability to render beautiful and interactive 3D maps in browsers. 3D maps are often used in web applications to visualize data across various geographical locations.',
		technologies: 'React.js, Three.js',
		stars: 'https://api.github.com/repos/xiaogua-bushigua/3d-geoMap',
		demo: 'https://3d-geo-map.vercel.app',
		github: 'https://github.com/xiaogua-bushigua/3d-geoMap',
	},
	{
		title: 'The Lord of Rings',
		cover: './portfolio/ring.png',
		description: `If you have watched the The Lord of the Rings, you must know what I have done. Yes, it's The Eye of Sauron! In this project, I intend to show browsers can do more than you can imagine. This project is a very casual and interesting attempt on shaders running in browsers.`,
		technologies: 'React.js, Three.js, GLSL',
		stars: 'https://api.github.com/repos/xiaogua-bushigua/the-lord-of-rings',
		demo: 'https://the-lord-of-rings.vercel.app',
		github: 'https://github.com/xiaogua-bushigua/the-lord-of-rings',
	},
	{
		title: 'Digital Health Dashboard',
		cover: './portfolio/body.png',
		description: `It's a completely personal project. I love graphics effects, and I want to create something different and original. That's the reason this project exists.`,
		technologies: 'React.js, Three.js, GLSL, ECharts.js',
		stars: 'https://api.github.com/repos/xiaogua-bushigua/3d-human-body',
		demo: 'https://3d-human-body.vercel.app',
		github: 'https://github.com/xiaogua-bushigua/3d-human-body',
	},
];

const Boxes = React.memo(() => {
	const { global } = useContext(MyContext);
	// 挑选出宝箱的位置
	const getWorks = useMemo(() => {
		const arr = global.gift.positions;
		const count = 4; // 需要选择 4 个
		if (arr.length < count) return arr;

		// 创建一个副本，避免修改原始数组
		let shuffled = arr.slice();
		let selected = [];

		for (let i = 0; i < count; i++) {
			// 生成一个随机索引
			let randomIndex = Math.floor(Math.random() * shuffled.length);
			// 从数组中取出该元素并添加到新数组
			selected.push(shuffled[randomIndex]);
			// 从数组中删除已选元素
			shuffled.splice(randomIndex, 1);
		}
		return selected;
	}, [global.gift.positions, global.scene.refreshKey]);
	return (
		<>
			{getWorks.map((item, index) => (
				<Gift
					key={'work_' + index}
					position={[item.x, item.z + 0.1, item.y]}
					information={information[index]}
				/>
			))}
		</>
	);
});

export default Boxes;
