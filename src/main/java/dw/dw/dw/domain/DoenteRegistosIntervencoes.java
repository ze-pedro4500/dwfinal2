package dw.dw.dw.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A DoenteRegistosIntervencoes.
 */
@Entity
@Table(name = "doente_registos_intervencoes")
public class DoenteRegistosIntervencoes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descr")
    private String descr;

    @ManyToOne
    @JsonIgnoreProperties(value = "doenteRegistosIntervencoes", allowSetters = true)
    private Doente doente;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescr() {
        return descr;
    }

    public DoenteRegistosIntervencoes descr(String descr) {
        this.descr = descr;
        return this;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public Doente getDoente() {
        return doente;
    }

    public DoenteRegistosIntervencoes doente(Doente doente) {
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
        if (!(o instanceof DoenteRegistosIntervencoes)) {
            return false;
        }
        return id != null && id.equals(((DoenteRegistosIntervencoes) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DoenteRegistosIntervencoes{" +
            "id=" + getId() +
            ", descr='" + getDescr() + "'" +
            "}";
    }
}
