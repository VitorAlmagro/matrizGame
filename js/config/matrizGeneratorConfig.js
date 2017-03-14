angular.module("app").config(function(matrizGeneratorProvider) {

	let matriz = [];

	let linha1 = [0, 2, 4, 3, 1];

	let linha2 = [5, 3, 4, 2, 2];	

	let linha3 = [4, 1, 5, 5, 1];	

	let linha4 = [1, 1, 3, 4, 1];	

	let linha5 = [1, 5, 7, 5, 1];	

	let linha6 = [5, 1, 2, 3, -1];	

	matriz.push(linha1);
	matriz.push(linha2);
	matriz.push(linha3);
	matriz.push(linha4);
	matriz.push(linha5);
	matriz.push(linha6);

	matrizGeneratorProvider.setMatriz(matriz);
})