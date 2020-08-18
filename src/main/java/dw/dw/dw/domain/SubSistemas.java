package dw.dw.dw.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;

/**
 * A SubSistemas.
 */
@Entity
@Table(name = "sub_sistemas")
public class SubSistemas implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "gid_nome")
    private String gidNome;

    @Column(name = "gid_code")
    private Integer gidCode;

    @ManyToOne
    @JsonIgnoreProperties(value = "subSistemas", allowSetters = true)
    private SubSisGrupo subSisGrupo;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGidNome() {
        return gidNome;
    }

    public SubSistemas gidNome(String gidNome) {
        this.gidNome = gidNome;
        return this;
    }

    public void setGidNome(String gidNome) {
        this.gidNome = gidNome;
    }

    public Integer getGidCode() {
        return gidCode;
    }

    public SubSistemas gidCode(Integer gidCode) {
        this.gidCode = gidCode;
        return this;
    }

    public void setGidCode(Integer gidCode) {
        this.gidCode = gidCode;
    }

    public SubSisGrupo getSubSisGrupo() {
        return subSisGrupo;
    }

    public SubSistemas subSisGrupo(SubSisGrupo subSisGrupo) {
        this.subSisGrupo = subSisGrupo;
        return this;
    }

    public void setSubSisGrupo(SubSisGrupo subSisGrupo) {
        this.subSisGrupo = subSisGrupo;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SubSistemas)) {
            return false;
        }
        return id != null && id.equals(((SubSistemas) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SubSistemas{" +
            "id=" + getId() +
            ", gidNome='" + getGidNome() + "'" +
            ", gidCode=" + getGidCode() +
            "}";
    }
}
