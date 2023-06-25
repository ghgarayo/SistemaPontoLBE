package com.lbe.sistemaponto.domain.funcionario;

public record DadosPontoFuncionario(Long id_funcionario, String login_funcionario) {

    public DadosPontoFuncionario(Funcionario funcionario){
        this(funcionario.getId(),funcionario.getLogin());
    }
}
