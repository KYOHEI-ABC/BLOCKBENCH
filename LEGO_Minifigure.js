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

function verifyGroup(index, name, origin, length) {
	const g = Group.all[index];
	if (!g) return console.assert(), false;
	if (g.name !== name) return console.assert(), false;
	if (JSON.stringify(g.origin) !== JSON.stringify(origin)) return console.assert(), false;
	if (g.children.length !== length) return console.assert(), false;
	if (g.children[0].name !== g.name) return console.assert(), false;

	return true;
};

verifyGroup(0, "RightLeg", [3, 9, 0], 1);
verifyGroup(1, "LeftLeg", [-3, 9, 0], 1);
verifyGroup(2, "Body", [0, 18, 0], 1);
verifyGroup(3, "Head", [0, 29, 0], 2);
console.assert(Group.all[3].children[1].name == "Neck");

verifyGroup(4, "RightArm", [6 + 1.5 - 1, 24 - 1.5 - 1, 0], 2);
console.assert(Group.all[4].children[1].name == "RightHand");

verifyGroup(5, "RightHand", [6 + 1.5 - 1, 12 + 2 - 1, 0], 1);

verifyGroup(6, "LeftArm", [-6 - 1.5 + 1, 24 - 1.5 - 1, 0], 2);
console.assert(Group.all[6].children[1].name == "LeftHand");

verifyGroup(7, "LeftHand", [-6 - 1.5 + 1, 12 + 2 - 1, 0], 1);

Group.all.forEach(group => {
	console.assert(group.origin[2] == 0)
});

function size(cube) {
	return [cube.to[0] - cube.from[0], cube.to[1] - cube.from[1], cube.to[2] - cube.from[2]];
}

function verifyCube(index, name, expectedSize, origin) {
	const c = Cube.all[index];
	if (!c) return false;
	if (c.name !== name) return false;
	if (JSON.stringify(size(c)) !== JSON.stringify(expectedSize)) return false;
	if (JSON.stringify(c.origin) !== JSON.stringify(origin)) return false;
	if (c.parent.name !== name) console.log(c.parent.name, name);

	return true;
}

verifyCube(0, "RightLeg", [6, 12, 6], [3, 6, 0]);
verifyCube(1, "LeftLeg", [6, 12, 6], [-3, 6, 0]);
verifyCube(2, "Body", [12, 12, 6], [0, 18, 0]);
verifyCube(3, "Neck", [4, 10, 4], [0, 29, 0]);
verifyCube(4, "Head", [8, 8, 8], [0, 29, 0]);
verifyCube(5, "RightArm", [3, 8, 3], [6 + 1.5 - 1, 20 - 1, 0]);
verifyCube(6, "RightHand", [4, 4, 4], [6 + 1.5 - 1, 14 - 1, 0]);
verifyCube(7, "LeftArm", [3, 8, 3], [-6 - 1.5 + 1, 20 - 1, 0]);
verifyCube(8, "LeftHand", [4, 4, 4], [-6 - 1.5 + 1, 14 - 1, 0]);


const RightLeg = Cube.all[0];
const LeftLeg = Cube.all[1];
const Body = Cube.all[2];
const Neck = Cube.all[3];
const Head = Cube.all[4];
const RightArm = Cube.all[5];
const RightHand = Cube.all[6];
const LeftArm = Cube.all[7];
const LeftHand = Cube.all[8];

const RightLegGroup = Group.all[0];
const LeftLegGroup = Group.all[1];
const BodyGroup = Group.all[2];
const HeadGroup = Group.all[3];
const RightArmGroup = Group.all[4];
const RightHandGroup = Group.all[5];
const LeftArmGroup = Group.all[6];
const LeftHandGroup = Group.all[7];


console.assert(LeftLeg.to[0] == RightLeg.from[0]);
console.assert(RightLeg.to[1] == Body.from[1]);
console.assert(LeftLeg.to[1] == Body.from[1]);
console.assert(Body.to[1] == Neck.from[1]);
console.assert(Body.to[1] + 1 == Head.from[1]);

console.assert(Body.to[0] - 1 == RightArm.from[0]);
console.assert(Body.to[1] - 1 == RightArm.to[1]);

console.assert(RightArm.from[1] == RightHand.to[1]);
console.assert(RightArm.from[0] - 0.5 == RightHand.from[0]);
console.assert(RightArm.to[0] + 0.5 == RightHand.to[0]);
console.assert(RightArm.origin[0] == RightHand.origin[0]);

console.assert(Body.from[0] + 1 == LeftArm.to[0]);
console.assert(Body.to[1] - 1 == LeftArm.to[1]);

console.assert(LeftArm.from[1] == LeftHand.to[1]);
console.assert(LeftArm.from[0] - 0.5 == LeftHand.from[0]);
console.assert(LeftArm.to[0] + 0.5 == LeftHand.to[0]);
console.assert(LeftArm.origin[0] == LeftHand.origin[0]);

console.assert(RightLeg.origin[1] == LeftLeg.origin[1]);
console.assert(RightArm.origin[1] == LeftArm.origin[1]);
console.assert(RightHand.origin[1] == LeftHand.origin[1]);

console.assert(RightArmGroup.origin[0] + 1.5 == RightArm.to[0]);
console.assert(LeftArmGroup.origin[0] + 1.5 == LeftArm.to[0]);
console.assert(RightArmGroup.origin[0] - 1.5 == RightArm.from[0]);
console.assert(LeftArmGroup.origin[0] - 1.5 == LeftArm.from[0]);

console.assert(RightArmGroup.origin[1] + 1.5 == RightArm.to[1]);
console.assert(LeftArmGroup.origin[1] + 1.5 == LeftArm.to[1]);
console.assert(RightArmGroup.origin[1] == LeftArmGroup.origin[1]);

console.assert(RightArmGroup.origin[0] == RightHandGroup.origin[0]);
console.assert(LeftArmGroup.origin[0] == LeftHandGroup.origin[0]);

console.assert(RightLegGroup.origin[0] + 3 == RightLeg.to[0]);
console.assert(RightLegGroup.origin[0] - 3 == RightLeg.from[0]);
console.assert(RightLegGroup.origin[1] + 3 == RightLeg.to[1]);

console.assert(LeftLegGroup.origin[0] + 3 == LeftLeg.to[0]);
console.assert(LeftLegGroup.origin[0] - 3 == LeftLeg.from[0]);
console.assert(LeftLegGroup.origin[1] + 3 == LeftLeg.to[1]);

console.assert(RightLegGroup.origin[1] == LeftLegGroup.origin[1]);


Cube.all.forEach(cube => {
	console.assert(cube.origin[2] == 0);
});
