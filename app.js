let clientes=[]
let pets=[]
let produtos=[]
let carrinho=[]

// CLIENTE

function criarCliente(){

    let nome=clienteNome.value
    let email=clienteEmail.value
    let vip=clienteVip.checked

    if(nome==""){
        alert("Nome inválido")
        return
    }

    if(/\d/.test(nome)){
        alert("O nome não pode conter números")
        return
    } 

    if(!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)){
        alert("O nome não pode conter números ou caracteres especiais")
        return
    }

    if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
        alert("Email inválido")
        return
    }

    clientes.push({nome,email,vip})

    renderClientes()

}

function renderClientes(){

    listaClientes.innerHTML=""

    clientes.forEach(c=>{
    let li=document.createElement("li")
    li.innerText=c.nome+" - "+c.email
    listaClientes.appendChild(li)
    })

}

// PET

function cadastrarPet(){

    let nome=petNome.value
    let tipo=petTipo.value
    let idade=parseInt(petIdade.value)

    if(nome==""){
        alert("Pet precisa de nome")
        return
    }

    if(/\d/.test(nome)){
        alert("O nome não pode conter números")
        return
    } 

    if(!/^[A-Za-zÀ-ÿ\s]+$/.test(nome)){
        alert("O nome não pode conter números ou caracteres especiais")
        return
    }

    if(tipo==""){
        alert("Pet precisa de um tipo")
        return
    }

    if(/\d/.test(tipo)){
        alert("O tipo não pode conter números")
        return
    } 

    if(!/^[A-Za-zÀ-ÿ\s]+$/.test(tipo)){
        alert("O nome não pode conter números ou caracteres especiais")
        return
    }

    if(petIdade.value==""){
        alert("A idade do pet é obrigatória")
        return
    }

    if(isNaN(idade)){
        alert("A idade deve conter apenas números")
        return
    }


    pets.push({nome,tipo,idade})

    renderPets()

}

function renderPets(){

    listaPets.innerHTML=""

    pets.forEach(p=>{
    let li=document.createElement("li")
    li.innerText=p.nome+" ("+p.tipo+")"
    listaPets.appendChild(li)
    })

}

// PRODUTOS

function criarProduto(){

    let nome=produtoNome.value
    let preco=parseFloat(produtoPreco.value)

    if(preco<0){
    alert("Preço inválido")
    return
    }

    if(isNaN(preco)){
        alert("Digite um preço válido")
        return
    }


    produtos.push({nome,preco})

    renderProdutos()

}

function renderProdutos(){

    listaProdutos.innerHTML=""
    produtoSelect.innerHTML=""

    produtos.forEach((p,i)=>{

    let li=document.createElement("li")
    li.innerText=p.nome+" - R$ "+p.preco
    listaProdutos.appendChild(li)

    let op=document.createElement("option")
    op.value=i
    op.innerText=p.nome
    produtoSelect.appendChild(op)

    })

}

// CARRINHO

function adicionarCarrinho(){

    if(produtoSelect.value === ""){
        alert("Selecione um produto!")
        return
    }

    let p = produtos[produtoSelect.value]

    if(!p){
        alert("Produto não encontrado!")
        return
    }

        
    if(!p.nome || p.nome.trim() === ""){
        alert("Produto inválido!")
        return
    }

    
    if(p.preco === "" || p.preco === null || p.preco === undefined || isNaN(p.preco) || Number(p.preco) <= 0){
        alert("Preço do produto inválido!")
        return
    }

      
    carrinho.push(p)

    alert("Produto adicionado ao carrinho!")

    renderCarrinho()
}


function removerCarrinho(index){

    if(carrinho.length === 0){
        alert("O carrinho está vazio!")
        return
    }

    if(index < 0 || index >= carrinho.length){
        alert("Produto não encontrado no carrinho!")
        return
    }

    carrinho.splice(index, 1)

    renderCarrinho()

}

function renderCarrinho(){

    listaCarrinho.innerHTML=""

    carrinho.forEach(p=>{

    let li=document.createElement("li")
    li.innerText=p.nome+" - "+p.preco
    listaCarrinho.appendChild(li)

    })

    calcularTotal()

}

// TOTAL

function calcularTotal(){

    let total=0

    carrinho.forEach(p=>{

    total+=p.preco

    })

    if(total>100){
    total*=0.9
    }

    total=total.toFixed(2)

    document.getElementById("total").innerText=total

    return total

}

// FINALIZAR

function finalizarCompra(){

    alert("Compra finalizada: "+calcularTotal())

    carrinho=[]

    renderCarrinho()

}


// CARROSSEL

let slideIndex = 0

function nextSlide(){
    slideIndex++
    updateSlide()
}

function prevSlide(){
    slideIndex--
    updateSlide()
}

function updateSlide(){

    const slides = document.querySelector(".slides")
    const total = document.querySelectorAll(".slide").length

    if(slideIndex >= total) slideIndex = 0
    if(slideIndex < 0) slideIndex = total - 1

    slides.style.transform = "translateX(-" + slideIndex * 100 + "%)"

}
if(typeof window !== "undefined"){
    setInterval(nextSlide, 4000)
}

module.exports = {
    criarCliente,
    clientes,
    cadastrarPet,
    pets,
    criarProduto,
    produtos,
    adicionarCarrinho,
    removerCarrinho,
    renderCarrinho,
    calcularTotal,
    carrinho
}