package com.lbe.sistemaponto.domain.solicitacao;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;


@Table(name = "solicitacao_ajuste")
@Entity(name = "Solicitação")
@Getter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Solicitacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "ID_Registro_Ponto")
    private Long idPonto;
    @Column(name = "ID_Funcionario")
    private Long idFuncionario;
    @Column(name = "Aprovado_Por")
    private Long idAdmin;
    @Column(name = "Atualizado_Em_Hora")
    private LocalTime horaCompleta;
    @Column(name = "Atualizado_Em_Dia")
    private LocalDate dataCompleta;
    @Column(name = "Descricao")
    private String descricaoSolicitacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "Aprovado")
    private RespostaSolicitacao resposta;

    @Column(name = "descricao_Resposta")
    private String descricaoResposta;
    @Column(name = "Ativo")
    private Boolean ativo;

    public Solicitacao(DadosSolicitacaoAjuste dados){
        this.idPonto = dados.idPonto();
        this.idFuncionario = dados.idFuncionario();
        this.idAdmin = dados.idAdmin();
        this.horaCompleta = dados.horaCompleta();
        this.dataCompleta = dados.dataCompleta();
        this.descricaoSolicitacao = dados.descricaoSolicitacao();
        this.resposta = RespostaSolicitacao.valueOf("EM_ANALISE");
        this.ativo = true;
    }

}
