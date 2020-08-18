package dw.dw.dw.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Country.
 */
@Entity
@Table(name = "country")
public class Country implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "sigla")
    private String sigla;

    @OneToMany(mappedBy = "country")
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

    public Country nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getSigla() {
        return sigla;
    }

    public Country sigla(String sigla) {
        this.sigla = sigla;
        return this;
    }

    public void setSigla(String sigla) {
        this.sigla = sigla;
    }

    public Set<DoenteIdentidade> getDoenteIdentidades() {
        return doenteIdentidades;
    }

    public Country doenteIdentidades(Set<DoenteIdentidade> doenteIdentidades) {
        this.doenteIdentidades = doenteIdentidades;
        return this;
    }

    public Country addDoenteIdentidade(DoenteIdentidade doenteIdentidade) {
        this.doenteIdentidades.add(doenteIdentidade);
        doenteIdentidade.setCountry(this);
        return this;
    }

    public Country removeDoenteIdentidade(DoenteIdentidade doenteIdentidade) {
        this.doenteIdentidades.remove(doenteIdentidade);
        doenteIdentidade.setCountry(null);
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
        if (!(o instanceof Country)) {
            return false;
        }
        return id != null && id.equals(((Country) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Country{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", sigla='" + getSigla() + "'" +
            "}";
    }
}
