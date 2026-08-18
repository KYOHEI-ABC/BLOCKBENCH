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


console.assert(Group.all[0].name == "RightLeg");
console.assert(Group.all[0].origin[0] == 3);
console.assert(Group.all[0].origin[1] == 9);
console.assert(Group.all[0].children.length == 1);
console.assert(Group.all[0].children[0].name == Group.all[0].name);

console.assert(Group.all[1].name == "LeftLeg");
console.assert(Group.all[1].origin[0] == -3);
console.assert(Group.all[1].origin[1] == 9);
console.assert(Group.all[1].children.length == 1);
console.assert(Group.all[1].children[0].name == Group.all[1].name);

console.assert(Group.all[2].name == "Body");
console.assert(Group.all[2].origin[0] == 0);
console.assert(Group.all[2].origin[1] == 18);
console.assert(Group.all[2].children.length == 1);
console.assert(Group.all[2].children[0].name == Group.all[2].name);

console.assert(Group.all[3].name == "Head");
console.assert(Group.all[3].origin[0] == 0);
console.assert(Group.all[3].origin[1] == 29);
console.assert(Group.all[3].children.length == 2);
console.assert(Group.all[3].children[0].name == Group.all[3].name);
console.assert(Group.all[3].children[1].name == "Neck");

console.assert(Group.all[4].name == "RightArm");
console.assert(Group.all[4].origin[0] == 6 + 1.5 - 1);
console.assert(Group.all[4].origin[1] == 24 - 1.5 - 1);
console.assert(Group.all[4].children.length == 2);
console.assert(Group.all[4].children[0].name == Group.all[4].name);
console.assert(Group.all[4].children[1].name == "RightHand");

console.assert(Group.all[5].name == "RightHand");
console.assert(Group.all[5].origin[0] == Group.all[4].origin[0]);
console.assert(Group.all[5].origin[1] == 12 + 2 - 1);
console.assert(Group.all[5].children.length == 1);
console.assert(Group.all[5].children[0].name == Group.all[5].name);

console.assert(Group.all[6].name == "LeftArm");
console.assert(Group.all[6].origin[0] == -6 - 1.5 + 1);
console.assert(Group.all[6].origin[1] == 24 - 1.5 - 1);
console.assert(Group.all[6].children.length == 2);
console.assert(Group.all[6].children[0].name == Group.all[6].name);
console.assert(Group.all[6].children[1].name == "LeftHand");

console.assert(Group.all[7].name == "LeftHand");
console.assert(Group.all[7].origin[0] == Group.all[6].origin[0]);
console.assert(Group.all[7].origin[1] == 12 + 2 - 1);
console.assert(Group.all[7].children.length == 1);
console.assert(Group.all[7].children[0].name == Group.all[7].name);

Group.all.forEach(group => {
	console.assert(group.origin[2] == 0)
});

function size(cube) {
	return [cube.to[0] - cube.from[0], cube.to[1] - cube.from[1], cube.to[2] - cube.from[2]];
}

function verifyCubeProperties(index, expectedName, expectedSize, expectedOrigin) {
	const cube = Cube.all[index];

	if (!cube) {
		console.error(`[Verify Error] Index ${index} に Cube が存在しません。`);
		return false;
	}

	const isNameMatched = cube.name === expectedName;
	const isSizeMatched = JSON.stringify(size(cube)) === JSON.stringify(expectedSize);
	const isOriginMatched = JSON.stringify(cube.origin) === JSON.stringify(expectedOrigin);

	const isAllMatched = isNameMatched && isSizeMatched && isOriginMatched;

	if (!isAllMatched) {
		console.warn(`[Verify Failed] Cube[${index}]`, {
			expected: { name: expectedName, size: expectedSize, origin: expectedOrigin },
			actual: { name: cube.name, size: size(cube), origin: cube.origin }
		});
	}

	return isAllMatched;
}

verifyCubeProperties(0, "RightLeg", [6, 12, 6], [3, 6, 0]);
verifyCubeProperties(1, "LeftLeg", [6, 12, 6], [-3, 6, 0]);
verifyCubeProperties(2, "Body", [12, 12, 6], [0, 18, 0]);
verifyCubeProperties(3, "Neck", [4, 10, 4], [0, 29, 0]);
verifyCubeProperties(4, "Head", [8, 8, 8], [0, 29, 0]);
verifyCubeProperties(5, "RightArm", [3, 8, 3], [6 + 1.5 - 1, 20 - 1, 0]);
verifyCubeProperties(6, "RightHand", [4, 4, 4], [6 + 1.5 - 1, 14 - 1, 0]);
verifyCubeProperties(7, "LeftArm", [3, 8, 3], [-6 - 1.5 + 1, 20 - 1, 0]);
verifyCubeProperties(8, "LeftHand", [4, 4, 4], [-6 - 1.5 + 1, 14 - 1, 0]);


Cube.all.forEach(cube => {
	console.assert(cube.origin[2] == 0);
});
