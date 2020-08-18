package dw.dw.dw.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import javax.persistence.*;

import java.io.Serializable;
import java.time.LocalDate;

import dw.dw.dw.domain.enumeration.Sexo;

/**
 * A DoenteIdentidade.
 */
@Entity
@Table(name = "doente_identidade")
public class DoenteIdentidade implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nome")
    private String nome;

    @Column(name = "data_nasc")
    private LocalDate dataNasc;

    @Column(name = "altura")
    private Integer altura;

    @Column(name = "morada")
    private String morada;

    @Column(name = "cod_post")
    private String codPost;

    @Column(name = "freguesia")
    private String freguesia;

    @Column(name = "nif")
    private Integer nif;

    @Column(name = "med_fam")
    private String medFam;

    @Enumerated(EnumType.STRING)
    @Column(name = "sexo")
    private Sexo sexo;

    @Column(name = "telef")
    private Integer telef;

    @Column(name = "telef_2")
    private Integer telef2;

    @Column(name = "doc_id")
    private Integer docId;

    @Column(name = "n_benef")
    private Integer nBenef;

    @Column(name = "n_utente")
    private Integer nUtente;

    @Column(name = "num_proc_hosp")
    private Integer numProcHosp;

    @OneToOne
    @JoinColumn(unique = true)
    private Doente doente;

    @ManyToOne
    @JsonIgnoreProperties(value = "doenteIdentidades", allowSetters = true)
    private SubSistemas subsistemas;

    @ManyToOne
    @JsonIgnoreProperties(value = "doenteIdentidades", allowSetters = true)
    private Aces aces;

    @ManyToOne
    @JsonIgnoreProperties(value = "doenteIdentidades", allowSetters = true)
    private Country country;

    @ManyToOne
    @JsonIgnoreProperties(value = "doenteIdentidades", allowSetters = true)
    private CentroSaude centroSaude;

    @ManyToOne
    @JsonIgnoreProperties(value = "doenteIdentidades", allowSetters = true)
    private HospRef hospRef;

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

    public DoenteIdentidade nome(String nome) {
        this.nome = nome;
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public LocalDate getDataNasc() {
        return dataNasc;
    }

    public DoenteIdentidade dataNasc(LocalDate dataNasc) {
        this.dataNasc = dataNasc;
        return this;
    }

    public void setDataNasc(LocalDate dataNasc) {
        this.dataNasc = dataNasc;
    }

    public Integer getAltura() {
        return altura;
    }

    public DoenteIdentidade altura(Integer altura) {
        this.altura = altura;
        return this;
    }

    public void setAltura(Integer altura) {
        this.altura = altura;
    }

    public String getMorada() {
        return morada;
    }

    public DoenteIdentidade morada(String morada) {
        this.morada = morada;
        return this;
    }

    public void setMorada(String morada) {
        this.morada = morada;
    }

    public String getCodPost() {
        return codPost;
    }

    public DoenteIdentidade codPost(String codPost) {
        this.codPost = codPost;
        return this;
    }

    public void setCodPost(String codPost) {
        this.codPost = codPost;
    }

    public String getFreguesia() {
        return freguesia;
    }

    public DoenteIdentidade freguesia(String freguesia) {
        this.freguesia = freguesia;
        return this;
    }

    public void setFreguesia(String freguesia) {
        this.freguesia = freguesia;
    }

    public Integer getNif() {
        return nif;
    }

    public DoenteIdentidade nif(Integer nif) {
        this.nif = nif;
        return this;
    }

    public void setNif(Integer nif) {
        this.nif = nif;
    }

    public String getMedFam() {
        return medFam;
    }

    public DoenteIdentidade medFam(String medFam) {
        this.medFam = medFam;
        return this;
    }

    public void setMedFam(String medFam) {
        this.medFam = medFam;
    }

    public Sexo getSexo() {
        return sexo;
    }

    public DoenteIdentidade sexo(Sexo sexo) {
        this.sexo = sexo;
        return this;
    }

    public void setSexo(Sexo sexo) {
        this.sexo = sexo;
    }

    public Integer getTelef() {
        return telef;
    }

    public DoenteIdentidade telef(Integer telef) {
        this.telef = telef;
        return this;
    }

    public void setTelef(Integer telef) {
        this.telef = telef;
    }

    public Integer getTelef2() {
        return telef2;
    }

    public DoenteIdentidade telef2(Integer telef2) {
        this.telef2 = telef2;
        return this;
    }

    public void setTelef2(Integer telef2) {
        this.telef2 = telef2;
    }

    public Integer getDocId() {
        return docId;
    }

    public DoenteIdentidade docId(Integer docId) {
        this.docId = docId;
        return this;
    }

    public void setDocId(Integer docId) {
        this.docId = docId;
    }

    public Integer getnBenef() {
        return nBenef;
    }

    public DoenteIdentidade nBenef(Integer nBenef) {
        this.nBenef = nBenef;
        return this;
    }

    public void setnBenef(Integer nBenef) {
        this.nBenef = nBenef;
    }

    public Integer getnUtente() {
        return nUtente;
    }

    public DoenteIdentidade nUtente(Integer nUtente) {
        this.nUtente = nUtente;
        return this;
    }

    public void setnUtente(Integer nUtente) {
        this.nUtente = nUtente;
    }

    public Integer getNumProcHosp() {
        return numProcHosp;
    }

    public DoenteIdentidade numProcHosp(Integer numProcHosp) {
        this.numProcHosp = numProcHosp;
        return this;
    }

    public void setNumProcHosp(Integer numProcHosp) {
        this.numProcHosp = numProcHosp;
    }

    public Doente getDoente() {
        return doente;
    }

    public DoenteIdentidade doente(Doente doente) {
        this.doente = doente;
        return this;
    }

    public void setDoente(Doente doente) {
        this.doente = doente;
    }

    public SubSistemas getSubsistemas() {
        return subsistemas;
    }

    public DoenteIdentidade subsistemas(SubSistemas subSistemas) {
        this.subsistemas = subSistemas;
        return this;
    }

    public void setSubsistemas(SubSistemas subSistemas) {
        this.subsistemas = subSistemas;
    }

    public Aces getAces() {
        return aces;
    }

    public DoenteIdentidade aces(Aces aces) {
        this.aces = aces;
        return this;
    }

    public void setAces(Aces aces) {
        this.aces = aces;
    }

    public Country getCountry() {
        return country;
    }

    public DoenteIdentidade country(Country country) {
        this.country = country;
        return this;
    }

    public void setCountry(Country country) {
        this.country = country;
    }

    public CentroSaude getCentroSaude() {
        return centroSaude;
    }

    public DoenteIdentidade centroSaude(CentroSaude centroSaude) {
        this.centroSaude = centroSaude;
        return this;
    }

    public void setCentroSaude(CentroSaude centroSaude) {
        this.centroSaude = centroSaude;
    }

    public HospRef getHospRef() {
        return hospRef;
    }

    public DoenteIdentidade hospRef(HospRef hospRef) {
        this.hospRef = hospRef;
        return this;
    }

    public void setHospRef(HospRef hospRef) {
        this.hospRef = hospRef;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DoenteIdentidade)) {
            return false;
        }
        return id != null && id.equals(((DoenteIdentidade) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DoenteIdentidade{" +
            "id=" + getId() +
            ", nome='" + getNome() + "'" +
            ", dataNasc='" + getDataNasc() + "'" +
            ", altura=" + getAltura() +
            ", morada='" + getMorada() + "'" +
            ", codPost='" + getCodPost() + "'" +
            ", freguesia='" + getFreguesia() + "'" +
            ", nif=" + getNif() +
            ", medFam='" + getMedFam() + "'" +
            ", sexo='" + getSexo() + "'" +
            ", telef=" + getTelef() +
            ", telef2=" + getTelef2() +
            ", docId=" + getDocId() +
            ", nBenef=" + getnBenef() +
            ", nUtente=" + getnUtente() +
            ", numProcHosp=" + getNumProcHosp() +
            "}";
    }
}
