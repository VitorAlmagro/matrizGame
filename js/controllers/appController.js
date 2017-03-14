angular.module("app").controller("appCtrl", function($scope, grafoGenerator, matrizGenerator) {

    var matriz = [], valor = 0, valor2 = 0,
        caminho = [], resultado = [], inicio = "1,1",
        linhas = 0, colunas = 0, fim;

    // Gerando o grafo    
    var g = new grafoGenerator.Graph();

    // Gerando a matriz já parametrizada no arquivo config
    matriz = matrizGenerator.geraMatriz();

    // buscando as linhas e colunas para controle da variavel fim
    linhas = matrizGenerator.getValues().linhas;
    colunas =  matrizGenerator.getValues().colunas;

    fim = linhas + ',' + colunas;

    // Passando o Array de Arrays para fazer a geração dinâmica da tabela
    $scope.matriz = matrizGenerator.getValues().matriz;

    // Mapeando a matriz para calcular o menor caminho
    matriz.forEach(function(element) {
        // chave do elemento e pra quem ele aponta
        g.addVertex(element.key, element.next);
    })

    // Função que retorna o menor caminho (start, end)
    resultado = g.shortestPath(inicio, fim).concat([inicio]).reverse();

    // Como o resultado obtido é um array das keys ("1,1", "1,2"..), mapeando essas chaves para
    // demonstrar o valor de cada uma.
    resultado.forEach(function(element1) {

        matriz.forEach(function(element2) {

            if (element1 == element2.key) {

                if (element2.valor > 0) {
                    caminho.push(element2.valor);
                    valor += element2.valor;
                }
            }

        });
    });

    console.log("caminho:", caminho, "valor:", valor);

    /*-------------------------------------------------*/

    var valoresArmazenados = [];

    // Função responsável por armazenar os valores clicados na interface
    $scope.armazenaValor = function(valor) {

        // -1 é o valor do FIM, se ele for adicionado, executar a função que
        // calcula o resultado
        if (valor == -1) return $scope.resultado();

        valoresArmazenados.push(valor);

        //let adiciona = true;
        // valoresArmazenados.map(function(element) {
        //     if (obj == element) {
        //         adiciona = false
        //     }
        // });
        // if (adiciona) {
        //      valoresArmazenados.push(obj);
        // }

        console.log(valoresArmazenados);

    }

    // Função que verifica se a soma dos valores armazenados 
    // é igual ao valor do menor caminhos
    $scope.resultado = function() {

        valoresArmazenados.forEach(function(element) {
            valor2 += element;
        });

        if (valor === valor2)  
            alert("Sucesso!");
        else
            alert("Falha!");
       
    }

    // Função que atribui o valor do menor caminho ao $scope,
    // sendo visivel assim na aplicação
    $scope.mostrarValor = function() {
        $scope.valor = valor;
    }

    // Função responsável por formatar o valor 0 em inicio
    // e -1 em fim
    $scope.formata = function(element) {

        if (element == 0)
            return "Inicio";
        if (element == -1)
            return "Final";

        return element;
    }

});