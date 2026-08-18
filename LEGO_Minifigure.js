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

newGroup("RightLeg", [0, 0, -3], [6, 12, 6]);
newGroup("LeftLeg", [-6, 0, -3], [6, 12, 6]);
newGroup("Body", [-6, 12, -3], [12, 12, 6]);
newCube("Neck", [-2, 24, -2], [4, 10, 4]).addTo(newGroup("Head", [-4, 25, -4], [8, 8, 8]));
newGroup("RightHand", [6, 12, -2], [4, 4, 4]);
newGroup("RightArm", [6, 16, -1.5], [3, 8, 3]);
newGroup("LeftHand", [-10, 12, -2], [4, 4, 4]);
newGroup("LeftArm", [-9, 16, -1.5], [3, 8, 3]);


Canvas.updateAll();
