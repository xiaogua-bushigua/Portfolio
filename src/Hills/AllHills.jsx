import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import HillGroup from './HillGroup';
import Rocks from '../Decorations/Rocks';
import Trees from '../Decorations/Trees';
import PubSub from 'pubsub-js';
import { useEffect, useState } from 'react';

const MAX_HEIGHT = 10;
const STONE_HEIGHT = MAX_HEIGHT * 0.8;
const DIRT_HEIGHT = MAX_HEIGHT * 0.7;
const GRASS_HEIGHT = MAX_HEIGHT * 0.5;
const SAND_HEIGHT = MAX_HEIGHT * 0.3;
const DIRT2_HEIGHT = MAX_HEIGHT * 0;

// 如果 j 是奇数行，(j % 2) * 0.5 就会使 x 坐标偏移 0.5 个单位
const tilePos = (i, j) => new THREE.Vector2((i + (j % 2) * 0.5) * 1.77, j * 1.535);

const AllHills = ({ refreshKey }) => {
	const [diffMaps, setDiffMaps] = useState({
		dirt: [],
		dirt2: [],
		grass: [],
		sand: [],
		water: [],
		stone: [],
	});

	const [rocks, setRocks] = useState([]);
	const [trees, setTrees] = useState([]);
	const [boxes, setBoxes] = useState([]);

	const getMap = (height) => {
		if (height > STONE_HEIGHT) return 'stone';
		else if (height > DIRT_HEIGHT) return 'dirt';
		else if (height > GRASS_HEIGHT) return 'grass';
		else if (height > SAND_HEIGHT) return 'sand';
		else if (height > DIRT2_HEIGHT) return 'dirt2';
		else return 'water';
	};

	const noise2D = createNoise2D();

	useEffect(() => {
		setRocks([]);
		setTrees([]);
		setBoxes([]);
		setDiffMaps({
			dirt: [],
			dirt2: [],
			grass: [],
			sand: [],
			water: [],
			stone: [],
		});

		for (let i = -15; i < 15; i++) {
			for (let j = -15; j < 15; j++) {
				if (tilePos(i, j).length() > 16) continue;

				// 噪声控制了在不同区域的随机性，而某一小块里呈现相近的值
				let noise = (noise2D(i * 0.1, j * 0.1) + 1) * 0.5;
				let height = Math.pow(noise, 1.25) * MAX_HEIGHT;
				// 地形控制
				setDiffMaps((prev) => {
					return {
						...prev,
						[getMap(height)]: [
							...prev[getMap(height)],
							new THREE.Vector3(tilePos(i, j).x, tilePos(i, j).y, height),
						],
					};
				});
				// 顶部装饰控制
				if ((getMap(height) === 'dirt2' || getMap(height) === 'sand') && Math.random() > 0.85)
					setRocks((prev) => {
						return [...prev, new THREE.Vector3(tilePos(i, j).x, tilePos(i, j).y, height)];
					});
				if (getMap(height) === 'grass' && Math.random() > 0.8)
					setTrees((prev) => {
						return [...prev, new THREE.Vector3(tilePos(i, j).x, tilePos(i, j).y, height)];
					});
				if (getMap(height) === 'stone')
					setBoxes((prev) => {
						return [...prev, new THREE.Vector3(tilePos(i, j).x, tilePos(i, j).y, height)];
					});
			}
		}
	}, [refreshKey]);

	useEffect(() => {
		PubSub.publish('boxes', boxes);
	}, [boxes]);

	return (
		<>
			{Object.keys(diffMaps).map((item, index) => (
				<HillGroup key={'map' + index} hills={diffMaps[item]} type={item} />
			))}
			<Rocks rocks={rocks} />
			<Trees trees={trees} />
		</>
	);
};

export default AllHills;
