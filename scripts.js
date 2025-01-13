const uploadBtn = document.getElementById("upload_btn");
const inputLoad = document.getElementById("image_upload");

uploadBtn.addEventListener("click", () => {
    inputLoad.click();
})

function lerConteudoArquivo(arquivo) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();
        leitor.onload = () => {
            resolve({ url: leitor.result, nome: arquivo.name })
        }

        leitor.onerror = () => {
            reject(`Erro na leitura do arquivo $arquivo.name.`)
        }

        leitor.readAsDataURL(arquivo)
    })
}

const imagemPrincipal = document.querySelector(".main_imagem");
const nomeImagem = document.querySelector(".container_imagem_nome p")

inputLoad.addEventListener('change', async (evento) => {
    const arquivo = evento.target.files[0];

    if (arquivo)
        try {
            const conteudoArquivo = await lerConteudoArquivo(arquivo);
            imagemPrincipal.src = conteudoArquivo.url;
            nomeImagem.textContent = conteudoArquivo.nome;
        } catch (erro) {
            console.error("Erro na leitura do arquivo")
        }
})

const inputTags = document.getElementById("categorias");
const listaTags = document.getElementById("lista_tags");

listaTags.addEventListener("click", (evento) => {
    if (evento.target.classList.contains("remove_tag")) {
        const targetRemovivel = evento.target.parentElement;
        listaTags.removeChild(targetRemovivel);
    }
})

const tagsDisponiveis = ["Front-end", "Programação", "Data Science", "Full-Stack", "HTML", "Python", "React"]

async function verificaTags(tagTexto) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(tagsDisponiveis.includes(tagTexto))
        }, 1000)
    })
}

inputTags.addEventListener("keypress", async (evento) => {
    if (evento.key === "Enter") {
        evento.preventDefault();
        const tagTexto = inputTags.value.trim();
        if (tagTexto !== "") {
            try {
                const tagExiste = await verificaTags(tagTexto);
                if (tagExiste) {
                    const novaTag = document.createElement("li");
                    novaTag.innerHTML = `<p>${tagTexto}</p> <img src="./img/close-black.svg" class="remove_tag">`
                    listaTags.appendChild(novaTag);
                    inputTags.value = ""
                } else {
                    alert("Tag não encontrada!")
                }
            } catch (error) {
                console.error("Erro ao verificar existência da tag.");
                alert("Erro ao verificar existência da tag.");
            }   
        }
    }
})