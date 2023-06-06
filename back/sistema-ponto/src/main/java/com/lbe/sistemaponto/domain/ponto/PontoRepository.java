package com.lbe.sistemaponto.domain.ponto;

import java.time.LocalDate;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;



public interface PontoRepository extends JpaRepository<Ponto, Long> {

  Page<Ponto> findByIdFuncionario(Long Id, Pageable paginacao);
  Ponto findByIdFuncionarioAndDataCompleta(Long idFuncionario, LocalDate dataCompleta);

}
