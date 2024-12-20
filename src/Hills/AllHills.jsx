import * as THREE from 'three';
import { createNoise2D } from 'simplex-noise';
import HillGroup from './HillGroup';
import Rocks from '../Decorations/Rocks';
import Trees from '../Decorations/Trees';
import { useEffect, useState, useContext } from 'react';
import { MyContext } from '../App';

const MAX_HEIGHT = 10;
const STONE_HEIGHT = MAX_HEIGHT * 0.8;
const DIRT_HEIGHT = MAX_HEIGHT * 0.7;
const GRASS_HEIGHT = MAX_HEIGHT * 0.5;
const SAND_HEIGHT = MAX_HEIGHT * 0.3;
const DIRT2_HEIGHT = MAX_HEIGHT * 0;

// 如果 j 是奇数行，(j % 2) * 0.5 就会使 x 坐标偏移 0.5 个单位
const tilePos = (i, j) => new THREE.Vector2((i + (j % 2) * 0.5) * 1.77, j * 1.535);

const getMap = (height) => {
	if (height > STONE_HEIGHT) return 'stone';
	else if (height > DIRT_HEIGHT) return 'dirt';
	else if (height > GRASS_HEIGHT) return 'grass';
	else if (height > SAND_HEIGHT) return 'sand';
	else if (height > DIRT2_HEIGHT) return 'dirt2';
	else return 'water';
};

const AllHills = () => {
	const { global, setGlobal } = useContext(MyContext);
	let newRocks = [];
	let newTrees = [];
	let newDiffMaps = {
		dirt: [],
		dirt2: [],
		grass: [],
		sand: [],
		water: [],
		stone: [],
	};

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

	useEffect(() => {
		setRocks([]);
		setTrees([]);
		setDiffMaps({
			dirt: [],
			dirt2: [],
			grass: [],
			sand: [],
			water: [],
			stone: [],
		});

		const noise2D = createNoise2D();
		let updatedBoxes = []; // 临时存储新生成的 boxes

		for (let i = -15; i < 15; i++) {
			for (let j = -15; j < 15; j++) {
				if (tilePos(i, j).length() > 16) continue;

				// 噪声控制了在不同区域的随机性，而某一小块里呈现相近的值
				let noise = (noise2D(i * 0.1, j * 0.1) + 1) * 0.5;
				let height = Math.pow(noise, 1.25) * MAX_HEIGHT;
				let type = getMap(height);
				// 地形控制
				newDiffMaps[type].push(new THREE.Vector3(tilePos(i, j).x, tilePos(i, j).y, height));

				if ((type === 'dirt2' || type === 'sand') && Math.random() > 0.85) {
					newRocks.push(new THREE.Vector3(tilePos(i, j).x, tilePos(i, j).y, height));
				}
				if (type === 'grass' && Math.random() > 0.8) {
					newTrees.push(new THREE.Vector3(tilePos(i, j).x, tilePos(i, j).y, height));
				}
				if (type === 'stone') {
					updatedBoxes.push(new THREE.Vector3(tilePos(i, j).x, tilePos(i, j).y, height));
				}
			}
		}

		// 更新状态
		setDiffMaps(newDiffMaps);
		setRocks(newRocks);
		setTrees(newTrees);

		// 直接在此处更新 global 状态
		setGlobal((prevGlobal) => {
			return {
				...prevGlobal,
				gift: {
					...prevGlobal.gift,
					positions: updatedBoxes,
				},
			};
		});

	}, [global.scene.refreshKey]);

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
