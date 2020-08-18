package dw.dw.dw.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

import dw.dw.dw.domain.enumeration.Situacao;

/**
 * A DoenteHistMovimentos.
 */
@Entity
@Table(name = "doente_hist_movimentos")
public class DoenteHistMovimentos implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data")
    private LocalDate data;

    @Enumerated(EnumType.STRING)
    @Column(name = "situacao")
    private Situacao situacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "statusprevio")
    private Situacao statusprevio;

    @Column(name = "causa_morte")
    private String causaMorte;

    @Column(name = "obs")
    private String obs;

    @ManyToOne
    @JsonIgnoreProperties(value = "doenteHistMovimentos", allowSetters = true)
    private Doente doente;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public DoenteHistMovimentos data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Situacao getSituacao() {
        return situacao;
    }

    public DoenteHistMovimentos situacao(Situacao situacao) {
        this.situacao = situacao;
        return this;
    }

    public void setSituacao(Situacao situacao) {
        this.situacao = situacao;
    }

    public Situacao getStatusprevio() {
        return statusprevio;
    }

    public DoenteHistMovimentos statusprevio(Situacao statusprevio) {
        this.statusprevio = statusprevio;
        return this;
    }

    public void setStatusprevio(Situacao statusprevio) {
        this.statusprevio = statusprevio;
    }

    public String getCausaMorte() {
        return causaMorte;
    }

    public DoenteHistMovimentos causaMorte(String causaMorte) {
        this.causaMorte = causaMorte;
        return this;
    }

    public void setCausaMorte(String causaMorte) {
        this.causaMorte = causaMorte;
    }

    public String getObs() {
        return obs;
    }

    public DoenteHistMovimentos obs(String obs) {
        this.obs = obs;
        return this;
    }

    public void setObs(String obs) {
        this.obs = obs;
    }

    public Doente getDoente() {
        return doente;
    }

    public DoenteHistMovimentos doente(Doente doente) {
        this.doente = doente;
        return this;
    }

    public void setDoente(Doente doente) {
        this.doente = doente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DoenteHistMovimentos)) {
            return false;
        }
        return id != null && id.equals(((DoenteHistMovimentos) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DoenteHistMovimentos{" +
            "id=" + getId() +
            ", data='" + getData() + "'" +
            ", situacao='" + getSituacao() + "'" +
            ", statusprevio='" + getStatusprevio() + "'" +
            ", causaMorte='" + getCausaMorte() + "'" +
            ", obs='" + getObs() + "'" +
            "}";
    }
}
