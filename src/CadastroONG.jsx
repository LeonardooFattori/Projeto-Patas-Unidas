import { useState, useEffect } from "react";
import { cadastrarONG, listarONGs, removerONG } from "./ongService";
import "./CadastroONG.css";

function CadastroONG() {
  const [formulario, setFormulario] = useState({
    nome: "",
    endereco: "",
    contato: "",
    responsavelLegal: "",
  });
  const [erros, setErros] = useState([]);
  const [mensagemSucesso, setMensagemSucesso] = useState("");
  const [ongs, setOngs] = useState([]);

  useEffect(() => {
    setOngs(listarONGs());
  }, []);

  function handleChange(evento) {
    const { id, value } = evento.target;
    setFormulario((anterior) => ({ ...anterior, [id]: value }));
  }

  function handleSubmit(evento) {
    evento.preventDefault();

    const resultado = cadastrarONG(formulario);

    if (resultado.sucesso) {
      setMensagemSucesso(`ONG "${resultado.ong.nome}" cadastrada com sucesso!`);
      setErros([]);
      setFormulario({ nome: "", endereco: "", contato: "", responsavelLegal: "" });
      setOngs(listarONGs());
    } else {
      setErros(resultado.erros);
      setMensagemSucesso("");
    }
  }

  function handleExcluir(id, nome) {
    const confirmou = window.confirm(`Tem certeza que deseja excluir "${nome}"?`);
    if (confirmou) {
      removerONG(id);
      setOngs(listarONGs());
    }
  }

  return (
    <div className="cadastro-ong">
      <h1>Cadastro de ONG</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor="nome">Nome da ONG</label>
        <input id="nome" type="text" value={formulario.nome} onChange={handleChange} />

        <label htmlFor="endereco">Endereço</label>
        <input id="endereco" type="text" value={formulario.endereco} onChange={handleChange} />

        <label htmlFor="contato">Contato (telefone)</label>
        <input
          id="contato"
          type="text"
          placeholder="(16) 99999-0000"
          value={formulario.contato}
          onChange={handleChange}
        />

        <label htmlFor="responsavelLegal">Responsável legal</label>
        <input
          id="responsavelLegal"
          type="text"
          value={formulario.responsavelLegal}
          onChange={handleChange}
        />

        <button type="submit">Cadastrar</button>
      </form>

      {mensagemSucesso && <p className="sucesso">{mensagemSucesso}</p>}

      {erros.length > 0 && (
        <ul className="erro">
          {erros.map((erro) => (
            <li key={erro}>{erro}</li>
          ))}
        </ul>
      )}

      <h2>ONGs cadastradas</h2>
      <ul className="lista-ongs">
        {ongs.map((ong) => (
          <li key={ong.id}>
            <span>
              <strong>{ong.nome}</strong> — {ong.endereco} — {ong.contato}
            </span>
            <button className="btn-excluir" onClick={() => handleExcluir(ong.id, ong.nome)}>
              Excluir
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CadastroONG;