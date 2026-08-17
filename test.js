function remove() {
	for (let i = Outliner.root.length - 1; i >= 0; i--) {
		Outliner.root[i].remove();
	}
}

function newCube(name, size) {
	const cube = new Cube({
		name: name,
		from: [-size / 2, -size / 2, -size / 2],
		to: [size / 2, size / 2, size / 2],
		origin: [0, 0, 0],
	}).init();
	return cube;
}

remove();

const cubeA = newCube("cubeA", 3);
console.assert(cubeA.name === "cubeA", "cubeA name is not correct");
console.assert(cubeA.from[0] === -1.5, "cubeA from[0] is not correct");
console.assert(cubeA.from[1] === -1.5, "cubeA from[1] is not correct");
console.assert(cubeA.from[2] === -1.5, "cubeA from[2] is not correct");
console.assert(cubeA.to[0] === 1.5, "cubeA to[0] is not correct");
console.assert(cubeA.to[1] === 1.5, "cubeA to[1] is not correct");
console.assert(cubeA.to[2] === 1.5, "cubeA to[2] is not correct");
console.assert(cubeA.origin[0] === 0, "cubeA origin[0] is not correct");
console.assert(cubeA.origin[1] === 0, "cubeA origin[1] is not correct");
console.assert(cubeA.origin[2] === 0, "cubeA origin[2] is not correct");

const cubeB = newCube("cubeB", 8);
console.assert(cubeB.name === "cubeB", "cubeB name is not correct");
console.assert(cubeB.from[0] === -4, "cubeB from[0] is not correct");
console.assert(cubeB.from[1] === -4, "cubeB from[1] is not correct");
console.assert(cubeB.from[2] === -4, "cubeB from[2] is not correct");
console.assert(cubeB.to[0] === 4, "cubeB to[0] is not correct");
console.assert(cubeB.to[1] === 4, "cubeB to[1] is not correct");
console.assert(cubeB.to[2] === 4, "cubeB to[2] is not correct");
console.assert(cubeB.origin[0] === 0, "cubeB origin[0] is not correct");
console.assert(cubeB.origin[1] === 0, "cubeB origin[1] is not correct");
console.assert(cubeB.origin[2] === 0, "cubeB origin[2] is not correct");

console.log("All tests passed!");

remove();
