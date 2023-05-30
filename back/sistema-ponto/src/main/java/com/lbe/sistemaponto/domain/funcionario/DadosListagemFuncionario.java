package com.lbe.sistemaponto.domain.funcionario;

public record DadosListagemFuncionario(Long id, String nome, String cpf, String telefone, String email) {

    public DadosListagemFuncionario(Funcionario funcionario){
        this(funcionario.getId(),funcionario.getNome(), funcionario.getCpf(), funcionario.getTelefone(),funcionario.getEmail());
    }
}
