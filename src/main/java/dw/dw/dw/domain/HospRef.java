package dw.dw.dw.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A HospRef.
 */
@Entity
@Table(name = "hosp_ref")
public class HospRef implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "hospRef")
    private Set<DoenteIdentidade> doenteIdentidades = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public HospRef nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<DoenteIdentidade> getDoenteIdentidades() {
        return doenteIdentidades;
    }

    public HospRef doenteIdentidades(Set<DoenteIdentidade> doenteIdentidades) {
        this.doenteIdentidades = doenteIdentidades;
        return this;
    }

    public HospRef addDoenteIdentidade(DoenteIdentidade doenteIdentidade) {
        this.doenteIdentidades.add(doenteIdentidade);
        doenteIdentidade.setHospRef(this);
        return this;
    }

    public HospRef removeDoenteIdentidade(DoenteIdentidade doenteIdentidade) {
        this.doenteIdentidades.remove(doenteIdentidade);
        doenteIdentidade.setHospRef(null);
        return this;
    }

    public void setDoenteIdentidades(Set<DoenteIdentidade> doenteIdentidades) {
        this.doenteIdentidades = doenteIdentidades;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HospRef)) {
            return false;
        }
        return id != null && id.equals(((HospRef) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HospRef{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
