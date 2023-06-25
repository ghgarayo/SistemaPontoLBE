package com.lbe.sistemaponto.domain.ponto.validacoes.registro;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.lbe.sistemaponto.domain.ValidacaoException;
import com.lbe.sistemaponto.domain.funcionario.FuncionarioRepository;
import com.lbe.sistemaponto.domain.ponto.DadosBatidaPonto;

@Component
public class ValidadorFuncionarioAtivo implements ValidadorRegistroPonto {

  @Autowired
  private FuncionarioRepository repository;

  @Override
  public void validar(DadosBatidaPonto dados) {
    if(dados.idFuncionario() == null) {
      throw new ValidacaoException("Funcionário não informado!");
    }

    var funcionarioEstaAtivo = repository.findAtivoById(dados.idFuncionario());

    if(!funcionarioEstaAtivo) {
      throw new ValidacaoException("Funcionário sem permissão!");
    }

  }
  
}
