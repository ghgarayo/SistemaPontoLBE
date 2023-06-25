package com.lbe.sistemaponto.domain.funcionario;

import jakarta.validation.constraints.NotBlank;

public record DadosRecuperacaoSenha(
        @NotBlank
        String cpf,
        @NotBlank
        String login,
        String senha,
        @NotBlank
        String novaSenha
) {
}
