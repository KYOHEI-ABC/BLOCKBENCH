function remove() {
	[...Outliner.root].forEach(element => element.remove());
}

const newCube = (name, from, size) => new Cube({
	name,
	from,
	to: from.map((v, i) => v + size[i]),
	origin: from.map((v, i) => v + size[i] / 2)
}).init();


remove()
const cube = newCube("TestCube", [1, 2, 3], [4, 5, 6]);
const eq = (a, b) => a.every((v, i) => v === b[i]);
console.assert(cube.name === "TestCube", "名前が一致しません");
console.assert(eq(cube.from, [1, 2, 3]), `from が不正: ${cube.from}`);
console.assert(eq(cube.to, [5, 7, 9]), `to が不正: ${cube.to}`);
console.assert(eq(cube.origin, [3, 4.5, 6]), `origin が不正: ${cube.origin}`);
remove()


const rightLeg = newCube("RightLeg", [0, 0, -3], [6, 12, 6])
rightLeg.origin[1] = rightLeg.to[1] - (rightLeg.to[0] - rightLeg.from[0]) / 2
const body = newCube("Body", [-6, 12, -3], [12, 12, 6])
const neck = newCube("Neck", [-2, 24, -2], [4, 10, 4])
const head = newCube("Head", [-4, 25, -4], [8, 8, 8])

const rightHand = newCube("RightHand", [6 - 0.5 - 1, 12 - 1, -2], [4, 4, 4])
const rightArm = newCube("RightArm", [6.5 - 0.5 - 1, 16 - 1, -1.5], [3, 8, 3])

const rightArmGroup = new Group({ name: "RightArm" }).init();
rightArm.addTo(rightArmGroup);
rightHand.addTo(rightArmGroup);
rightArmGroup.origin[0] = rightArm.origin[0]
rightArmGroup.origin[1] = rightArm.to[1] - (rightArm.to[0] - rightArm.from[0]) / 2
rightArmGroup.origin[2] = rightArm.origin[2]

Canvas.updateAll();
