package com.lbe.sistemaponto.domain.solicitacao;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface SolicitacaoAjusteRepository extends JpaRepository<SolicitacaoAjuste, Long> {
    Page<SolicitacaoAjuste> findAllByAtivoTrue(Pageable paginacao);

}
