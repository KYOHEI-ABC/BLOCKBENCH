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

function verifyGroupubeProperties(index, expectedName, expectedOrigin, expectedLength) {
	const group = Group.all[index];

	if (!group) {
		console.error(`[Verify Error] Index ${index} に Group が存在しません。`);
		return false;
	}

	const isNameMatched = group.name === expectedName;
	const isOriginMatched = JSON.stringify(group.origin) === JSON.stringify(expectedOrigin);
	const isLengthMatched = group.children.length === expectedLength;
	const isChildNameMatched = group.name === group.children[0].name;

	const isAllMatched = isNameMatched && isOriginMatched && isLengthMatched && isChildNameMatched;

	if (!isAllMatched) {
		console.warn(`[Verify Failed] Cube[${index}]`, {
			expected: { name: expectedName, origin: expectedOrigin, length: expectedLength, childName: group.name },
			actual: { name: group.name, origin: group.origin, length: group.children.length, childName: group.children[0].name }
		});
	}

	return isAllMatched;
}

verifyGroupubeProperties(0, "RightLeg", [3, 9, 0], 1);
verifyGroupubeProperties(1, "LeftLeg", [-3, 9, 0], 1);
verifyGroupubeProperties(2, "Body", [0, 18, 0], 1);
verifyGroupubeProperties(3, "Head", [0, 29, 0], 2);
console.assert(Group.all[3].children[1].name == "Neck");

verifyGroupubeProperties(4, "RightArm", [6 + 1.5 - 1, 24 - 1.5 - 1, 0], 2);
console.assert(Group.all[4].children[1].name == "RightHand");

verifyGroupubeProperties(5, "RightHand", [6 + 1.5 - 1, 12 + 2 - 1, 0], 1);

verifyGroupubeProperties(6, "LeftArm", [-6 - 1.5 + 1, 24 - 1.5 - 1, 0], 2);
console.assert(Group.all[6].children[1].name == "LeftHand");

verifyGroupubeProperties(7, "LeftHand", [-6 - 1.5 + 1, 12 + 2 - 1, 0], 1);

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

function c(i) {
	return Cube.all[i];
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

console.assert(c(0).from[0] == c(1).to[0]);
console.assert(c(0).to[1] == c(2).from[1]);
console.assert(c(2).to[1] == c(3).from[1]);
console.assert(c(2).to[1] + 1 == c(4).from[1]);

console.assert(c(2).to[0] - 1 == c(5).from[0]);
console.assert(c(2).to[1] - 1 == c(5).to[1]);

console.assert(c(5).from[1] == c(6).to[1]);
console.assert(c(5).from[0] - 0.5 == c(6).from[0]);
console.assert(c(5).to[0] + 0.5 == c(6).to[0]);

console.assert(c(2).from[0] + 1 == c(7).to[0]);
console.assert(c(2).to[1] - 1 == c(7).to[1]);

console.assert(c(7).from[1] == c(8).to[1]);
console.assert(c(7).from[0] - 0.5 == c(8).from[0]);
console.assert(c(7).to[0] + 0.5 == c(8).to[0]);



Cube.all.forEach(cube => {
	console.assert(cube.origin[2] == 0);
});
