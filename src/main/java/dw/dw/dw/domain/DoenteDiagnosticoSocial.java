package dw.dw.dw.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

/**
 * A DoenteDiagnosticoSocial.
 */
@Entity
@Table(name = "doente_diagnostico_social")
public class DoenteDiagnosticoSocial implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "descr")
    private String descr;

    @Column(name = "data")
    private LocalDate data;

    @ManyToOne
    @JsonIgnoreProperties(value = "doenteDiagnosticoSocials", allowSetters = true)
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

    public DoenteDiagnosticoSocial descr(String descr) {
        this.descr = descr;
        return this;
    }

    public void setDescr(String descr) {
        this.descr = descr;
    }

    public LocalDate getData() {
        return data;
    }

    public DoenteDiagnosticoSocial data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public Doente getDoente() {
        return doente;
    }

    public DoenteDiagnosticoSocial doente(Doente doente) {
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
        if (!(o instanceof DoenteDiagnosticoSocial)) {
            return false;
        }
        return id != null && id.equals(((DoenteDiagnosticoSocial) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DoenteDiagnosticoSocial{" +
            "id=" + getId() +
            ", descr='" + getDescr() + "'" +
            ", data='" + getData() + "'" +
            "}";
    }
}
