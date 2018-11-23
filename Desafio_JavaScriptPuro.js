export const factsInput = [
  ['gabriel', 'endereço', 'av rio branco, 109', true],
  ['joão', 'endereço', 'rua alice, 10', true],
  ['joão', 'endereço', 'rua bob, 88', true],
  ['joão', 'telefone', '234-5678', true],
  ['joão', 'telefone', '91234-5555', true],
  ['joão', 'telefone', '234-5678', false],
  ['gabriel', 'telefone', '98888-1111', true],
  ['gabriel', 'telefone', '56789-1010', true],
]

export const schemaInput = [['endereço', 'cardinality', 'one'], ['telefone', 'cardinality', 'many']]

export const resultExpected = [
  ['gabriel', 'endereço', 'av rio branco, 109', true],
  ['joão', 'endereço', 'rua bob, 88', true],
  ['joão', 'telefone', '91234-5555', true],
  ['gabriel', 'telefone', '98888-1111', true],
  ['gabriel', 'telefone', '56789-1010', true],
]

// Função que recebe 2 argumentos, sendo o primeiro o array de facts e o segundo o array de schema
export function fatosVigentes(facts, schema) {
  // Inicializada uma variavel do tipo array que vai compor o resultado devolvido
  let result = []

  // Foi usada a função 'forEach' para percorrer o array de facts
  facts.forEach(fact => {
    // É inicializada uma variavel para guardar, posteriormente, a cardinalidade do atributo analisado sobre o fato
    let itemCardinality

    // Verificou-se a variavel 'added?', e caso for true, temos uma tratativa, caso for false, temos outra.
    if (fact[3]) {
      // É realizado uma iteração sobre o array de schema a fim de descobrir a cardinalidade do fato percorrido na
      // iteração, verificando através de um 'if' se o atributo possui a cardinalidade 'one' ou 'many'.
      schema.forEach(schemaItem => {
        if (schemaItem[0] === fact[1]) {
          itemCardinality = schemaItem[2]
        }
      })

      // Caso a cardinalidade do atributo for 'one', temos uma tratativa, quando for 'many', temos outra
      if (itemCardinality === 'one') {
        // Caso a cardinalidade for 'one', realizou-se um filter no array, para remover o item setado previamente
        // fazendo uma comparação dos atributos para descobrir qual item deve ser removido do array.
        result = result.filter(resultItem => !(resultItem[0] === fact[0] && resultItem[1] === fact[1]))

      } else {
        // Caso a cardinalidade for 'many', podemos adicionar o fato no array de resultados.
        result.push(fact)
      }
    } else {
      // Caso o fato atual tenha o atributo 'added?' false, precisaremos remover o item do array de resultados,
      // portando, é feito um filtro no array de resultados atual que compara os atributos,
      // e é removido o item quando os atributos são iguals
      result = result.filter(
        resultItem => !(resultItem[0] === fact[0] && resultItem[1] === fact[1] && resultItem[2] === fact[2]),
      )
    }
  })

  // Retorna o array dos fatos vigentes
  return result
}
