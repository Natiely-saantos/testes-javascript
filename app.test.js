const { criarCliente,clientes, cadastrarPet,
    pets, criarProduto, produtos,
    adicionarCarrinho, removerCarrinho, renderCarrinho, calcularTotal,
    carrinho } = require("./app")

describe("Testes de Cliente", () => {

    
    beforeEach(() => {

        global.clienteNome = { value: "" }
        global.clienteEmail = { value: "" }
        global.clienteVip = { checked: false }

        global.listaClientes = {
            innerHTML: "",
            appendChild: jest.fn()
        }

        global.document = {
            createElement: jest.fn(() => ({
                innerText: ""
            }))
        }

        global.alert = jest.fn()

        clientes.length = 0

    })


    
    test("Deve permitir criar cliente com nome válido", () => {

        clienteNome.value = "Ana"
        clienteEmail.value = "ana@gmail.com"

        criarCliente()

        expect(clientes).toHaveLength(1)
        expect(clientes[0].nome).toBe("Ana")

    })


    
    test("Não deve permitir cliente com nome vazio", () => {

        clienteNome.value = ""
        clienteEmail.value = "ana@gmail.com"

        criarCliente()

        expect(clientes).toHaveLength(0)
        expect(alert).toHaveBeenCalledWith("Nome inválido")

    })


   
    test("Deve permitir cadastrar cliente com email válido", () => {

        clienteNome.value = "João"
        clienteEmail.value = "joao@gmail.com"

        criarCliente()

        expect(clientes).toHaveLength(1)
        expect(clientes[0].email).toBe("joao@gmail.com")

    })


    
    test("Não deve permitir email inválido", () => {

        clienteNome.value = "Maria"
        clienteEmail.value = "maria.com"

        criarCliente()

        expect(clientes).toHaveLength(0)
        expect(alert).toHaveBeenCalledWith("Email inválido")

    })


    
    test("Deve permitir marcar cliente como VIP", () => {

        clienteNome.value = "Pedro"
        clienteEmail.value = "pedro@gmail.com"
        clienteVip.checked = true

        criarCliente()

        expect(clientes[0].vip).toBe(true)

    })

})

describe("Testes de Pet", () => {

    beforeEach(() => {

        pets.length = 0

        global.petNome = { value: "" }
        global.petTipo = { value: "" }
        global.petIdade = { value: "" }

        global.listaPets = {
            innerHTML: "",
            appendChild: jest.fn()
        }

        global.alert = jest.fn()

        global.document = {
            createElement: jest.fn(() => ({
                innerText: ""
            }))
        }

    })


   
    test("Deve permitir cadastrar um pet", () => {

        petNome.value = "Rex"
        petTipo.value = "Cachorro"
        petIdade.value = "5"

        cadastrarPet()

        expect(pets).toHaveLength(1)
        expect(pets[0].nome).toBe("Rex")

    })


    
    test("Pet deve possuir nome obrigatório", () => {

        petNome.value = ""
        petTipo.value = "Gato"
        petIdade.value = "3"

        cadastrarPet()

        expect(pets).toHaveLength(0)
        expect(alert).toHaveBeenCalledWith("Pet precisa de nome")

    })


    test("Pet deve possuir tipo", () => {

        petNome.value = "Mimi"
        petTipo.value = ""
        petIdade.value = "2"

        cadastrarPet()

        expect(pets).toHaveLength(0)
        expect(alert).toHaveBeenCalledWith("Pet precisa de um tipo")

    })



    test("Pet deve possuir idade válida (número)", () => {

        petNome.value = "Rex"
        petTipo.value = "Cachorro"
        petIdade.value = "abc"

        cadastrarPet()

        expect(pets).toHaveLength(0)
        expect(alert).toHaveBeenCalledWith("A idade deve conter apenas números")

    })

})

describe("Testes de Produto", () => {

    beforeEach(() => {

        produtos.length = 0

        global.produtoNome = { value: "" }
        global.produtoPreco = { value: "" }

        global.listaProdutos = {
            innerHTML: "",
            appendChild: jest.fn()
        }

        global.produtoSelect = {
            innerHTML: "",
            appendChild: jest.fn()
        }

        global.alert = jest.fn()

        global.document = {
            createElement: jest.fn(() => ({
                innerText: "",
                value: ""
            }))
        }

    })


    
    test("Deve permitir criar produto com nome", () => {

        produtoNome.value = "Mouse"
        produtoPreco.value = "50"

        criarProduto()

        expect(produtos).toHaveLength(1)
        expect(produtos[0].nome).toBe("Mouse")

    })



    test("Produto deve possuir preço maior que zero", () => {

        produtoNome.value = "Teclado"
        produtoPreco.value = "100"

        criarProduto()

        expect(produtos[0].preco).toBeGreaterThan(0)

    })


   
    test("Produto não pode possuir preço negativo", () => {

        produtoNome.value = "Monitor"
        produtoPreco.value = "-200"

        criarProduto()

        expect(produtos).toHaveLength(0)
        expect(alert).toHaveBeenCalledWith("Preço inválido")

    })


    
    test("Produto deve aparecer na lista de produtos cadastrados", () => {

        produtoNome.value = "Mouse"
        produtoPreco.value = "50"

        criarProduto()

        expect(listaProdutos.appendChild).toHaveBeenCalled()

        expect(produtos).toContainEqual({
            nome: "Mouse",
            preco: 50
        })

    })

})

describe("Testes de Carrinho", () => {

    beforeEach(() => {

        carrinho.length = 0
        produtos.length = 0

        global.produtoSelect = { value: "" }

        global.listaCarrinho = {
            innerHTML: "",
            appendChild: jest.fn()
        }

        global.document = {
            createElement: jest.fn(() => ({
                innerText: ""
            })),

            getElementById: jest.fn(() => ({
                innerText: ""
            }))
        }

        global.alert = jest.fn()

    })


    
    test("Deve permitir adicionar produto ao carrinho", () => {

        produtos.push({
            nome: "Mouse",
            preco: 50
        })

        produtoSelect.value = "0"

        adicionarCarrinho()

        expect(carrinho).toHaveLength(1)
        expect(carrinho[0].nome).toBe("Mouse")

    })


   
    test("Deve permitir remover produto do carrinho", () => {

        carrinho.push({
            nome: "Mouse",
            preco: 50
        })

        removerCarrinho(0)

        expect(carrinho).toHaveLength(0)

    })


    
    test("Carrinho deve listar todos os produtos adicionados", () => {

        carrinho.push(
            { nome: "Mouse", preco: 50 },
            { nome: "Teclado", preco: 100 }
        )

        renderCarrinho()

        expect(listaCarrinho.appendChild).toHaveBeenCalledTimes(2)

    })


    test("Carrinho deve calcular o valor total da compra", () => {

        carrinho.push(
            { nome: "Mouse", preco: 50 },
            { nome: "Teclado", preco: 100 }
        )

        let total = calcularTotal()

        expect(total).toBe("135.00")

    })

})

describe("Testes de Regras de Negócio", () => {

    beforeEach(() => {

        carrinho.length = 0
        produtos.length = 0

        global.produtoSelect = { value: "" }

        global.listaCarrinho = {
            innerHTML: "",
            appendChild: jest.fn()
        }

        global.alert = jest.fn()

        global.document = {
            createElement: jest.fn(() => ({
                innerText: ""
            })),

            getElementById: jest.fn(() => ({
                innerText: ""
            }))
        }

    })


    
    test("Compra acima de R$100 deve aplicar desconto de 10%", () => {

        carrinho.push(
            { nome: "Mouse", preco: 50 },
            { nome: "Teclado", preco: 100 }
        )

        let total = calcularTotal()

        expect(total).toBe("135.00")

    })


  
    // test("Cliente VIP deve receber desconto de 15%", () => {

    //     carrinho.push(
    //         { nome: "Mouse", preco: 100 }
    //     )

    //     let total = calcularTotal(true)

    //     expect(total).toBe("85.00")

    // })


   
    test("Carrinho não deve aceitar produto com preço igual a zero", () => {

        produtos.push({
            nome: "Mouse",
            preco: 0
        })

        produtoSelect.value = "0"

        adicionarCarrinho()

        expect(carrinho).toHaveLength(0)

        expect(alert).toHaveBeenCalledWith(
            "Preço do produto inválido!"
        )

    })

})

test("Carrinho vazio deve retornar total igual a 0", () => {
    carrinho = [];

    let total = calcularTotal();

    expect(total).toBe("0.00");
})

test("Ao finalizar compra o carrinho deve ser limpo", () => {
    carrinho = [
        { nome: "Mouse", preco: 50 },
        { nome: "Teclado", preco: 100 }
    ];

    finalizarCompra();

    expect(carrinho).toHaveLength(0);
})