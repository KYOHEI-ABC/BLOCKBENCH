[...Outliner.root].forEach(element => element.remove());

function addVec(a, b) {
	const result = [];
	for (let i = 0; i < a.length; i++) {
		result.push(a[i] + b[i]);
	}
	return result;
}

function createCube(name, from, size) {
	const halfSize = [size[0] / 2, size[1] / 2, size[2] / 2];
	return new Cube({
		name,
		from,
		to: addVec(from, size),
		origin: addVec(from, halfSize)
	}).init();
}

function createGroup(cube, extraCubes = [], rot = {}, isPivotTop = false) {
	const origin = [...cube.origin];
	if (isPivotTop) origin[1] = cube.to[1] - (cube.to[0] - cube.from[0]) / 2;

	const group = new Group({
		name: cube.name,
		origin,
		rotation: [rot.x || 0, rot.y || 0, rot.z || 0]
	}).init();

	cube.addTo(group);
	for (const extra of extraCubes) {
		extra.addTo(group);
	}
}

createGroup(createCube("RightLeg", [0, 0, -3], [6, 12, 6]), [], { y: -1 }, true);
createGroup(createCube("LeftLeg", [-6, 0, -3], [6, 12, 6]), [], { y: 1 }, true);
createGroup(createCube("Body", [-6, 12, -3], [12, 12, 6]));
createGroup(createCube("Head", [-4, 25, -4], [8, 8, 8]), [createCube("Neck", [-2, 24, -2], [4, 10, 4])]);
createGroup(createCube("RightArm", [5, 15, -1.5], [3, 8, 3]), [createCube("RightHand", [4.5, 11, -2], [4, 4, 4])], { z: 15 }, true);
createGroup(createCube("LeftArm", [-8, 15, -1.5], [3, 8, 3]), [createCube("LeftHand", [-8.5, 11, -2], [4, 4, 4])], { z: -15 }, true);

Canvas.updateAll();
