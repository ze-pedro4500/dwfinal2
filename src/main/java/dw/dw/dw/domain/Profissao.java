package dw.dw.dw.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Profissao.
 */
@Entity
@Table(name = "profissao")
public class Profissao implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @OneToMany(mappedBy = "profissao")
    private Set<DoenteSocioFamiliar> doenteSocioFamiliars = new HashSet<>();

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

    public Profissao nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Set<DoenteSocioFamiliar> getDoenteSocioFamiliars() {
        return doenteSocioFamiliars;
    }

    public Profissao doenteSocioFamiliars(Set<DoenteSocioFamiliar> doenteSocioFamiliars) {
        this.doenteSocioFamiliars = doenteSocioFamiliars;
        return this;
    }

    public Profissao addDoenteSocioFamiliar(DoenteSocioFamiliar doenteSocioFamiliar) {
        this.doenteSocioFamiliars.add(doenteSocioFamiliar);
        doenteSocioFamiliar.setProfissao(this);
        return this;
    }

    public Profissao removeDoenteSocioFamiliar(DoenteSocioFamiliar doenteSocioFamiliar) {
        this.doenteSocioFamiliars.remove(doenteSocioFamiliar);
        doenteSocioFamiliar.setProfissao(null);
        return this;
    }

    public void setDoenteSocioFamiliars(Set<DoenteSocioFamiliar> doenteSocioFamiliars) {
        this.doenteSocioFamiliars = doenteSocioFamiliars;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Profissao)) {
            return false;
        }
        return id != null && id.equals(((Profissao) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Profissao{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
