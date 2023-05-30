package com.lbe.sistemaponto.infra.security;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.lbe.sistemaponto.domain.funcionario.FuncionarioRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


@Component
public class SecurityFilter extends OncePerRequestFilter {


  @Autowired
  private TokenService tokenService;

  @Autowired
  private FuncionarioRepository repository;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    // verificar se o header authorization existe
    var tokenJWT = recuperarToken(request);

    if (tokenJWT != null) {
      var subject = tokenService.getSubject(tokenJWT);
      var funcionario = repository.findByLogin(subject);
      var authentication = new UsernamePasswordAuthenticationToken(funcionario,null, funcionario.getAuthorities());
      SecurityContextHolder.getContext().setAuthentication(authentication);

    }
    filterChain.doFilter(request, response);
  }

  private String recuperarToken(HttpServletRequest request) {
    var authorizationHeader = request.getHeader("Authorization");
    if (authorizationHeader != null) {
      return authorizationHeader.replace("Bearer", "").trim();
    }
    return null;
  }
}

