package com.lbe.sistemaponto.domain.ponto;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.*;

@Table(name = "registro_ponto")
@Entity(name = "Ponto")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode(of = "id")
public class Ponto {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String login;

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
    this.login = dados.login();
    this.horarioEntrada1 = dados.horarioCompleto();
    this.longitudeEntrada1 = dados.longitude();
    this.latitudeEntrada1 = dados.latitude();

  }

  public void atualizaPonto(@Valid DadosBatidaPonto dados) {

    if (dados.login().equalsIgnoreCase(this.login) && this.getHorarioSaida1() == null) {
      this.horarioSaida1 =dados.horarioCompleto();
      this.longitudeSaida1 = dados.longitude();
      this.latitudeSaida1 = dados.latitude();
      
      return;
    }

    if (dados.login().equalsIgnoreCase(this.login)&& this.getHorarioEntrada2() == null) {
      this.horarioEntrada2 = dados.horarioCompleto();
      this.longitudeEntrada2 = dados.longitude();
      this.latitudeEntrada2 = dados.latitude();
      
      return;
    }

    if (dados.login().equalsIgnoreCase(this.login) && this.getHorarioSaida2() == null) {
      this.horarioSaida2 =dados.horarioCompleto();
      this.longitudeSaida2 = dados.longitude();
      this.latitudeSaida2 = dados.latitude();
      
      return;
    }

    throw new Error("Já foram efetuados os registros para a data " + dataCompleta.getDayOfMonth());

  }

}
