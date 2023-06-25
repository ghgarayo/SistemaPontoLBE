package com.lbe.sistemaponto.domain.ponto;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;
import lombok.*;

@Table(name = "registro_ponto")
@Entity(name = "Ponto")
@Data
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
@Embeddable
public class Ponto {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  @Column(name="Id_Funcionario")
  private Long idFuncionario;
  @Column(name = "data_completa")
  private LocalDate dataCompleta;
  @Column(name = "horario_entrada1")
  private LocalTime horarioEntrada1;
  @Column(name = "latitude_entrada1")
  private String latitudeEntrada1;
  @Column(name = "longitude_entrada1")
  private String longitudeEntrada1;
  @Column(name = "horario_saida1")
  private LocalTime horarioSaida1;
  @Column(name = "latitude_saida1")
  private String latitudeSaida1;
  @Column(name = "longitude_saida1")
  private String longitudeSaida1;
  @Column(name = "horario_entrada2")
  private LocalTime horarioEntrada2;
  @Column(name = "latitude_entrada2")
  private String latitudeEntrada2;
  @Column(name = "longitude_entrada2")
  private String longitudeEntrada2;
  @Column(name = "horario_saida2")
  private LocalTime horarioSaida2;
  @Column(name = "latitude_saida2")
  private String latitudeSaida2;
  @Column(name = "longitude_saida2")
  private String longitudeSaida2;

  public Ponto(DadosBatidaPonto dados) {

    this.dataCompleta = dados.dataCompleta();
    this.idFuncionario = dados.idFuncionario();
    this.horarioEntrada1 = dados.horarioCompleto();
    this.longitudeEntrada1 = dados.longitude();
    this.latitudeEntrada1 = dados.latitude();

  }
}

