function clearAll() {
	[...Outliner.root].forEach(element => element.remove());
}

function newCube(name, [x, y, z]) {
	const halfX = x / 2;
	const halfY = y / 2;
	const halfZ = z / 2;

	return new Cube({
		name,
		from: [-halfX, -halfY, -halfZ],
		to: [halfX, halfY, halfZ],
		origin: [0, 0, 0]
	}).init();
}

const addOffset = (coords, [dx, dy, dz]) => [
	coords[0] + dx,
	coords[1] + dy,
	coords[2] + dz
];
function moveCube(cube, offset) {
	cube.from = addOffset(cube.from, offset);
	cube.to = addOffset(cube.to, offset);
	cube.origin = addOffset(cube.origin, offset);

	Canvas.updateAllPositions();
}


function assertArrayEqual(actual, expected, message) {
	const isPass = actual.length === expected.length &&
		actual.every((val, i) => Math.abs(val - expected[i]) < 1e-6);
	console.assert(isPass, `${message} | 期待値: [${expected}] 実際: [${actual}]`);
}

clearAll();



clearAll();


// const testCube = newCube('TestCube', [1, 2, 3]);

// console.assert(testCube.name === 'TestCube', '名前が正しく設定されていません');
// assertArrayEqual(testCube.from, [-0.5, -1, -1.5], 'from の初期値が不正です');
// assertArrayEqual(testCube.to, [0.5, 1, 1.5], 'to の初期値が不正です');
// assertArrayEqual(testCube.origin, [0, 0, 0], 'origin の初期値が不正です');

// moveCube(testCube, [10, -5, 2]);
// assertArrayEqual(testCube.from, [9.5, -6, 0.5], '移動後の from が不正です');
// assertArrayEqual(testCube.to, [10.5, -4, 3.5], '移動後の to が不正です');
// assertArrayEqual(testCube.origin, [10, -5, 2], '移動後の origin が不正です');

// clearAll();
// console.assert(Outliner.root.length === 0, 'clearAll 後に要素が残っています');

// console.log('すべてのテストを通過しました！');
