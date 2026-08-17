function remove() {
	[...Outliner.root].forEach(element => element.remove());
}

const newCube = (name, from, size) => new Cube({
	name,
	from,
	to: from.map((v, i) => v + size[i]),
	origin: from.map((v, i) => v + size[i] / 2)
}).init();


function newGroup(cube) {
	const group = new Group({ name: cube.name }).init();
	cube.addTo(group);
	group.origin[0] = cube.origin[0];
	group.origin[1] = cube.origin[1];
	group.origin[2] = cube.origin[2];
	return group;
}

remove()


const rightLeg = newCube("RightLeg", [0, 0, -3], [6, 12, 6])
const rightLegGroup = newGroup(rightLeg)
rightLegGroup.origin[1] = rightLeg.to[1] - (rightLeg.to[0] - rightLeg.from[0]) / 2

const leftLeg = newCube("LeftLeg", [-6, 0, -3], [6, 12, 6])
const leftLegGroup = newGroup(leftLeg);
leftLegGroup.origin[1] = leftLeg.to[1] - (leftLeg.to[0] - leftLeg.from[0]) / 2

newGroup(newCube("Body", [-6, 12, -3], [12, 12, 6]))

newCube("Neck", [-2, 24, -2], [4, 10, 4]).addTo(newGroup(newCube("Head", [-4, 25, -4], [8, 8, 8])))

const rightHand = newCube("RightHand", [6 - 1.5, 12 - 1, -2], [4, 4, 4])
const rightArm = newCube("RightArm", [6.5 - 1.5, 16 - 1, -1.5], [3, 8, 3])

const leftHand = newCube("LeftHand", [-10 + 1.5, 12 - 1, -2], [4, 4, 4])
const leftArm = newCube("LeftArm", [-9.5 + 1.5, 16 - 1, -1.5], [3, 8, 3])

const rightArmGroup = newGroup(rightArm);
rightHand.addTo(rightArmGroup);
rightArmGroup.origin[1] = rightArm.to[1] - (rightArm.to[0] - rightArm.from[0]) / 2

const leftArmGroup = newGroup(leftArm);
leftHand.addTo(leftArmGroup);
leftArmGroup.origin[1] = leftArm.to[1] - (leftArm.to[0] - leftArm.from[0]) / 2

rightArmGroup.rotation[2] = 15
leftArmGroup.rotation[2] = -15

rightLegGroup.rotation[1] = -1
leftLegGroup.rotation[1] = 1

Canvas.updateAll();
