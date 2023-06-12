package com.lbe.sistemaponto.domain.funcionario;

public record DadosListagemFuncionario(Long id, String nome, String cpf, String telefone, String email) {

    /*
     * recebe um objeto do tipo funcionario e chama o construtor do record passando os
     * apenas atributos necessários para o retorno de dados para listagem
     */
    public DadosListagemFuncionario(Funcionario funcionario){
        this(funcionario.getId(),funcionario.getNome(), funcionario.getCpf(), funcionario.getTelefone(),funcionario.getEmail());
    }
}
