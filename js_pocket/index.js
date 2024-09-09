// lista de metas
let meta = {
    value: 'ler um livro por mês',
    checked: false,
    isChecked: (info) => {
        console.log(info)
    }
}

meta.value = 'não é mais ler um livro'
meta.isChecked(meta.value)

// function
const criarMeta = () => {}