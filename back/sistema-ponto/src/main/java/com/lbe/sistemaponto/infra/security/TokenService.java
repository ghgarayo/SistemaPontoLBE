package com.lbe.sistemaponto.infra.security;
import com.lbe.sistemaponto.domain.funcionario.Funcionario;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

@Service
public class TokenService {

  @Value("${api.security.token.secret}")
  private String secret;

  public String gerarToken(Funcionario funcionario) {
    try {
      var algoritmo = Algorithm.HMAC256(secret);
      return JWT.create()
          .withIssuer("LarBatistaEsperanca")
          .withClaim("admin", funcionario.isAdmin())
          .withClaim("nome", funcionario.getNome())
          .withSubject(funcionario.getLogin())
          .withExpiresAt(dataExpiracao())
          .sign(algoritmo);
    } catch (JWTCreationException e) {
      throw new RuntimeException("erro ao gerrar token jwt", e);
    }
  }

  public String getSubject(String tokenJWT){
    try {
        var algoritmo = Algorithm.HMAC256(secret);
        return JWT.require(algoritmo)
        .withIssuer("LarBatistaEsperanca")
        .build()
        .verify(tokenJWT)
        .getSubject();
    }
    catch (JWTVerificationException e){
        throw new RuntimeException("Token JWT inválido ou expirado!");
    }

}


  private Instant dataExpiracao() {
    /*
     * Método de expiração do token JWT, pega o instante de criação do token e
     * adiciona 2 horas, utilizando o método plusHours(). Por ser um "Instant",
     * é necessário setar a timezone, utilizando o método ZoneOffset(),
     * que recebe uma String com o fuso horário para GMT"
     */
    return LocalDateTime.now().plusHours(1).toInstant(ZoneOffset.of("-03:00"));
  }

}
