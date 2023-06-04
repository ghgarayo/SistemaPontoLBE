package com.lbe.sistemaponto.domain.funcionario;

import com.lbe.sistemaponto.domain.endereco.DadosEndereco;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizacaoFuncionario(

    @NotNull Long id,
    String nome,
    String telefone,
    String email,
    DadosEndereco endereco) {

}
