package dw.dw.dw.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Aces.
 */
@Entity
@Table(name = "aces")
public class Aces implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "aces")
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

    public Aces nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<DoenteIdentidade> getDoenteIdentidades() {
        return doenteIdentidades;
    }

    public Aces doenteIdentidades(Set<DoenteIdentidade> doenteIdentidades) {
        this.doenteIdentidades = doenteIdentidades;
        return this;
    }

    public Aces addDoenteIdentidade(DoenteIdentidade doenteIdentidade) {
        this.doenteIdentidades.add(doenteIdentidade);
        doenteIdentidade.setAces(this);
        return this;
    }

    public Aces removeDoenteIdentidade(DoenteIdentidade doenteIdentidade) {
        this.doenteIdentidades.remove(doenteIdentidade);
        doenteIdentidade.setAces(null);
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
        if (!(o instanceof Aces)) {
            return false;
        }
        return id != null && id.equals(((Aces) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Aces{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
