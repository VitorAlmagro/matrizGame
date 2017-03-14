angular.module("matrizGenerator", []);

angular.module("matrizGenerator").provider("matrizGenerator", function() {

    var _matriz = [],
        _linhas = 0, 
        _colunas = 0;

    this.setMatriz = function(array) {
        _matriz = array;
        _linhas = array.length;
        _colunas = array[0].length;
    };

    this.$get = function() {
        return {
            getValues: function() {
                return {
                    linhas: _linhas,
                    colunas: _colunas,
                    matriz: _matriz
                }
            },
            geraMatriz: function() {
                let matriz = [],
                    matrixAux = [],
                    index = 0,
                    linha = 1,
                    coluna = 1;

                _matriz.map(function(element) {

                    coluna = 1;

                    element.forEach(function(element2) {

                        matriz[index] = {
                            key: linha + ',' + coluna,
                            valor: element2,
                            next: {

                            }
                        }

                        index++;
                        coluna++;

                    });

                    linha++;

                });

                let matrizAux = [];

                let x, y;

                matriz.forEach(function(element) {

                    matrizAux = element.key.split(',');

                    x = matriz.find(x => x.key == ((+matrizAux[0] + 1).toString() + ',' + matrizAux[1])) || 0;
                    y = matriz.find(x => x.key == (matrizAux[0] + ',' + (+matrizAux[1] + 1).toString())) || 0;

                    element.next[x.key] = x.valor;
                    element.next[y.key] = y.valor;

                });

                return matriz;
            }
        }
    }
});