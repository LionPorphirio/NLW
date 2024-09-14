const { select, input, checkbox } = require('@inquirer/prompts')

let meta = {
    value: 'Beber 3l de água por dia',
    checked: false
}

let metas = [ meta ]

const cadastrarMeta = async () => {
    const meta = await input({message: 'Digite a meta:'})

    if(meta.length == 0) {
        console.log('A meta não pode ser vazia.')
        return
    }

    metas.push({ value: meta, chacked: false})
}

const listarMetas = async () => {
    const respostas = await checkbox({
        message: 'Use as setas para mudar de meta, o espaço para marcar ou desmarcar e o enter para finalizar essa etapa',
        choices: [...metas],
        instructions: false    
    })

    metas.forEach((m) =>{
        m.checked = false
    }) 

    if(respostas.length == 0) {
        console.log('Nenhuma meta selecionada')
        return
    }

    respostas.forEach((resposta) => {
        const meta = metas.find((m) => {
            return m.value == resposta
        })

        meta.checked = true
    })

    console.log('Meta(s) marcada(s) como conluida(s)')
}

const metasRealizadas = async () => {
    const realizadas = metas.filter((meta) => {
        return meta.checked
    })

    if (realizadas.length == 0) {
        console.log('Não existem metas realizadas :(')
        return
    }

    await select({
        message: 'Metas relizadas',
        choices: [...realizadas]
    })
}

const start = async () => {
    while(true) {

        const opcao = await select({
            message: 'menu >',
            choices: [
                {
                    name: 'Cadastrar meta',
                    value: 'cadastrar'
                },

                {
                    name: 'Listar metas',
                    value: 'listar'
                },

                {
                    name: 'metas realizadas',
                    value: 'realizadas'
                },

                {
                    name: 'Sair',
                    value: 'sair'
                }
            ]
        })

        switch(opcao) {
            case 'cadastrar':
                await cadastrarMeta()
                console.log(metas)
                break
            case 'listar':
                await listarMetas()
                break
            case 'realizadas':
                await metasRealizadas()
                break
            case 'sair':
                console.log('Até a próxima!')
                return
        }
    }
}

start()