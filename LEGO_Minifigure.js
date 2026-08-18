[...Outliner.root].forEach(element => element.remove());

const newCube = (name, from, size) => new Cube({
	name,
	from,
	to: from.map((v, i) => v + size[i]),
	origin: from.map((v, i) => v + size[i] / 2)
}).init();

function newGroup(name, from, size) {
	const cube = newCube(name, from, size);
	const group = new Group({
		name,
		origin: [...cube.origin]
	}).init();
	cube.addTo(group);
	return group;
}

function pivot(group) {
	const cube = group.children[0];
	group.origin[1] = cube.to[1] - (cube.to[0] - cube.from[0]) / 2;
}

const rightLeg = newGroup("RightLeg", [0, 0, -3], [6, 12, 6]);
pivot(rightLeg);
const leftLeg = newGroup("LeftLeg", [-6, 0, -3], [6, 12, 6]);
pivot(leftLeg);

newGroup("Body", [-6, 12, -3], [12, 12, 6]);
newCube("Neck", [-2, 24, -2], [4, 10, 4]).addTo(newGroup("Head", [-4, 25, -4], [8, 8, 8]));

const rightArm = newGroup("RightArm", [6 - 1, 16 - 1, -1.5], [3, 8, 3]);
pivot(rightArm);
newGroup("RightHand", [rightArm.origin[0] - 2, rightArm.children[0].from[1] - 4, -2], [4, 4, 4]).addTo(rightArm);

const leftArm = newGroup("LeftArm", [-9 + 1, 16 - 1, -1.5], [3, 8, 3]);
pivot(leftArm);
newGroup("LeftHand", [leftArm.origin[0] - 2, leftArm.children[0].from[1] - 4, -2], [4, 4, 4]).addTo(leftArm);

rightLeg.rotation[1] = -1.5
leftLeg.rotation[1] = 1.5

rightArm.rotation[2] = 15
leftArm.rotation[2] = -15

Canvas.updateAll();
