const CHAVE_STORAGE = "ongs";

function gerarId() {
  return Date.now().toString();
}

export function listarONGs() {
  const dados = localStorage.getItem(CHAVE_STORAGE);
  return dados ? JSON.parse(dados) : [];
}

function salvarONGs(ongs) {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(ongs));
}

export function validarONG(dadosONG) {
  const erros = [];
  const { nome, endereco, contato, responsavelLegal } = dadosONG;

  if (!nome || nome.trim().length < 3) {
    erros.push("O nome da ONG deve ter pelo menos 3 caracteres.");
  }
  if (!endereco || endereco.trim().length < 5) {
    erros.push("O endereço deve ter pelo menos 5 caracteres.");
  }

  const regexTelefone = /^\(?\d{2}\)?\s?\d{4,5}-?\d{4}$/;
  if (!contato || !regexTelefone.test(contato.trim())) {
    erros.push("O contato deve ser um telefone válido, ex: (16) 99999-0000.");
  }
  if (!responsavelLegal || responsavelLegal.trim().length < 3) {
    erros.push("O nome do responsável legal deve ter pelo menos 3 caracteres.");
  }

  return erros;
}

export function cadastrarONG(dadosONG) {
  const erros = validarONG(dadosONG);
  if (erros.length > 0) return { sucesso: false, ong: null, erros };

  const novaONG = {
    id: gerarId(),
    nome: dadosONG.nome.trim(),
    endereco: dadosONG.endereco.trim(),
    contato: dadosONG.contato.trim(),
    responsavelLegal: dadosONG.responsavelLegal.trim(),
    dataCadastro: new Date().toISOString(),
  };

  const ongs = listarONGs();
  ongs.push(novaONG);
  salvarONGs(ongs);

  return { sucesso: true, ong: novaONG, erros: [] };
}

export function removerONG(id) {
  const ongs = listarONGs();
  const filtradas = ongs.filter((ong) => ong.id !== id);
  if (filtradas.length === ongs.length) return false;
  salvarONGs(filtradas);
  return true;
}