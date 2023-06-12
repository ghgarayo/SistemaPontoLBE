package com.lbe.sistemaponto.domain.funcionario;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.lbe.sistemaponto.domain.endereco.Endereco;

import jakarta.validation.Valid;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Collection;
import java.util.List;

@Table(name = "funcionarios")
@Entity(name = "Funcionario")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(of = "id")
@Embeddable
public class Funcionario implements UserDetails {

    /*
     * Implementa a interface UserDetails do Spring Security. Por isso é necessário
     * implementar os métodos.
     * Com isso o Spring "aprende" que os atributos da classe Usuário são os login e
     * senha do sistema
     */

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String cpf;
    private String rg;
    private String telefone;
    private String email;
    private String login;
    private String senha;

    @Embedded
    private Endereco endereco;

    private boolean ativo;

    @Column(name = "is_admin")
    private boolean isAdmin;

    public Funcionario(DadosCadastroFuncionario dados) {
        this.ativo = true;
        this.isAdmin = dados.isAdmin();
        this.nome = dados.nome();
        this.cpf = dados.cpf();
        this.rg = dados.rg();
        this.telefone = dados.telefone();
        this.email = dados.email();
        this.login = dados.email(); // login do usuário sera o email.
        this.senha = dados.senha();
        this.endereco = new Endereco(dados.endereco());
    }

    public void atualizarInformacoes(@Valid DadosAtualizacaoFuncionario dados) {

        if (dados.nome() != null) {
            this.nome = dados.nome();
        }

        if (dados.email() != null) {
            this.email = dados.email();
            this.login = dados.email();
        }

        if (dados.telefone() != null) {
            this.telefone = dados.telefone();
        }

        if (dados.endereco() != null) {
            this.endereco.atualizarInformacoes(dados.endereco());
        }
    }

    public void atualizarSenha(@Valid DadosRecuperacaoSenha dados){

    }

    public String inativar() {
        this.ativo = false;
        return "Inativação efetuada com sucesso!";
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority("ROLE_USER"));
    }

    @Override
    public String getPassword() {
        return senha;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
