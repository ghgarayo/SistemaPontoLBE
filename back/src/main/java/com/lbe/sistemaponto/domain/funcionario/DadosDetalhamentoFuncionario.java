package com.lbe.sistemaponto.domain.funcionario;

import com.lbe.sistemaponto.domain.endereco.Endereco;

public record DadosDetalhamentoFuncionario(Long id, String nome, String cpf, String rg, String telefone, String email,
        Endereco endereco) {

    public DadosDetalhamentoFuncionario(Funcionario funcionario) {
        this(funcionario.getId(), funcionario.getNome(), funcionario.getCpf(), funcionario.getRg(),
                funcionario.getTelefone(), funcionario.getEmail(), funcionario.getEndereco());
    }

}
