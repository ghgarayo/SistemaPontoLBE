package com.lbe.sistemaponto.domain.ponto;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.lbe.sistemaponto.domain.ValidacaoException;
import com.lbe.sistemaponto.domain.funcionario.FuncionarioRepository;
import com.lbe.sistemaponto.domain.ponto.validacoes.registro.ValidadorRegistroPonto;
import com.lbe.sistemaponto.domain.solicitacao.DadosListagemSolicitacoes;

@Service
public class RegistroPontoService {

  @Autowired
  private PontoRepository pontoRepository;

  @Autowired
  private FuncionarioRepository funcionarioRepository;

  // Injeta todos os validadores que implementam a interface
  // ValidadorRegistroPonto.
  @Autowired
  private List<ValidadorRegistroPonto> validadores;

  public DadosDetalhamentoBatidaPonto registrar(DadosBatidaPonto dados) {

    if (!funcionarioRepository.findAtivoById(dados.idFuncionario())) {
      throw new ValidacaoException("Funcionário sem permissão!");
    }

    // Executa as validações em todos os validadores que implementam a interface
    // ValidadorRegistroPonto.
    validadores.forEach(item -> item.validar(dados));

    var funcionario = funcionarioRepository.getReferenceById(dados.idFuncionario());
    var registroPonto = pontoRepository.findByIdFuncionarioAndDataCompleta(dados.idFuncionario(), dados.dataCompleta());
    Ponto pontoSalvo;
    if (registroPonto == null || !funcionario.getId().equals(dados.idFuncionario())) {
      pontoSalvo = new Ponto(dados);
      pontoRepository.save(pontoSalvo);
    } else {
      // Atualiza o registro de ponto existente com base na data
      atualizaPonto(registroPonto.getId(),dados);
      pontoSalvo = pontoRepository.save(registroPonto);
    }

    return new DadosDetalhamentoBatidaPonto(dados);
  }

  private void atualizaPonto(Long id, DadosBatidaPonto dados) {
  Ponto registroPontoAtual = pontoRepository.getReferenceById(id);

    if (dados.idFuncionario() == registroPontoAtual.getIdFuncionario() && registroPontoAtual.getHorarioSaida1() == null) {
      registroPontoAtual.setHorarioSaida1(dados.horarioCompleto());
      registroPontoAtual.setLongitudeSaida1(dados.longitude());
      registroPontoAtual.setLatitudeSaida1(dados.latitude());

      return;
    }

    if (dados.idFuncionario() == registroPontoAtual.getIdFuncionario() && registroPontoAtual.getHorarioEntrada2() == null) {
      registroPontoAtual.setHorarioEntrada2(dados.horarioCompleto());
      registroPontoAtual.setLongitudeEntrada2(dados.longitude());
      registroPontoAtual.setLatitudeEntrada2(dados.latitude());

      return;
    }

    if (dados.idFuncionario() == registroPontoAtual.getIdFuncionario() && registroPontoAtual.getHorarioSaida2() == null) {
      registroPontoAtual.setHorarioSaida2(dados.horarioCompleto());
      registroPontoAtual.setLongitudeSaida2(dados.longitude());
      registroPontoAtual.setLatitudeSaida2(dados.latitude());

      return;
    }

    throw new Error("Já foram efetuados os registros para o dia " + dados.dataCompleta().getDayOfMonth());
  }

  public DadosResumoRegistroPonto ajustar(DadosAjustePonto dados) {
    Ponto registroPontoAtual = pontoRepository.getReferenceById(dados.idPonto());
    if (registroPontoAtual.getHorarioEntrada1() == null
        || registroPontoAtual.getHorarioEntrada1() != dados.horarioEntrada1()) {
      registroPontoAtual.setHorarioEntrada1(dados.horarioEntrada1());
    }

    if (registroPontoAtual.getHorarioSaida1() == null
        || dados.horarioSaida1() != registroPontoAtual.getHorarioSaida1()) {
      registroPontoAtual.setHorarioSaida1(dados.horarioSaida1());
    }

    if (registroPontoAtual.getHorarioEntrada2() == null
        || dados.horarioEntrada2() != registroPontoAtual.getHorarioEntrada2()) {
      registroPontoAtual.setHorarioEntrada2(dados.horarioEntrada2());
    }

    if (registroPontoAtual.getHorarioSaida2() == null
        || dados.horarioSaida2() != registroPontoAtual.getHorarioSaida2()) {
      System.out.println("Entrou aqui");
      registroPontoAtual.setHorarioSaida2(dados.horarioSaida2());
    }
    pontoRepository.save(registroPontoAtual);

    return new DadosResumoRegistroPonto(registroPontoAtual);
  }

}
