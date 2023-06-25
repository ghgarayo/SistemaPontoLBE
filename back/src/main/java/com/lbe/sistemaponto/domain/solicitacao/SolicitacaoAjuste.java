package com.lbe.sistemaponto.domain.solicitacao;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalTime;


@Table(name = "solicitacao_ajuste")
@Entity(name = "Solicitacao")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class SolicitacaoAjuste {

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
    @Column(name = "Horario_Entrada1")
    private LocalTime horarioEntrada1;
    @Column(name = "Horario_Saida1")
    private LocalTime horarioSaida1;
    @Column(name = "horario_entrada2")
    private LocalTime horarioEntrada2;
    @Column(name = "horario_saida2")
    private LocalTime horarioSaida2;
    @Enumerated(EnumType.STRING)
    @Column(name = "Aprovado")
    private RespostaSolicitacao resposta;
    @Column(name = "descricao_Resposta")
    private String descricaoResposta;
    @Column(name = "Ativo")
    private Boolean ativo;

    public SolicitacaoAjuste(DadosSolicitacaoAjuste dados){
        this.idPonto = dados.idPonto();
        this.idFuncionario = dados.idFuncionario();
        this.dataCompleta = dados.dataCompleta();
        this.horarioEntrada1 = dados.horarioEntrada1();
        this.horarioEntrada2 = dados.horarioEntrada2();
        this.horarioSaida1 = dados.horarioSaida1();
        this.horarioSaida2 = dados.horarioSaida2();
        this.descricaoSolicitacao = dados.descricaoSolicitacao();
        this.resposta = RespostaSolicitacao.valueOf("EM_ANALISE");
        this.ativo = true;
    }
}
