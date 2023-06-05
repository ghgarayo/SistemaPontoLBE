package com.lbe.sistemaponto.domain.solicitacao;

import java.time.LocalDate;
import java.time.LocalTime;

public record DadosDetalhamentoAjuste(
        Long id,
        Long idPonto,
        Long idFuncionario,
        Long idAdmin,
        LocalTime horaCompleta,
        LocalDate dataCompleta,
        String descricaoSolicitacao,
        RespostaSolicitacao resposta,
        String descricaoResposta
) {

    public DadosDetalhamentoAjuste(SolicitacaoAjuste solicitacao){
        this(solicitacao.getId(),
                solicitacao.getIdPonto(),
                solicitacao.getIdFuncionario(),
                solicitacao.getIdAdmin(),
                solicitacao.getHoraCompleta(),
                solicitacao.getDataCompleta(),
                solicitacao.getDescricaoSolicitacao(),
                solicitacao.getResposta(),
                solicitacao.getDescricaoResposta());
    }

}
