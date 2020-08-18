package dw.dw.dw.web.rest;

import dw.dw.dw.domain.Profissao;
import dw.dw.dw.repository.ProfissaoRepository;
import dw.dw.dw.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link dw.dw.dw.domain.Profissao}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class ProfissaoResource {

    private final Logger log = LoggerFactory.getLogger(ProfissaoResource.class);

    private static final String ENTITY_NAME = "profissao";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProfissaoRepository profissaoRepository;

    public ProfissaoResource(ProfissaoRepository profissaoRepository) {
        this.profissaoRepository = profissaoRepository;
    }

    /**
     * {@code POST  /profissaos} : Create a new profissao.
     *
     * @param profissao the profissao to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new profissao, or with status {@code 400 (Bad Request)} if the profissao has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/profissaos")
    public ResponseEntity<Profissao> createProfissao(@RequestBody Profissao profissao) throws URISyntaxException {
        log.debug("REST request to save Profissao : {}", profissao);
        if (profissao.getId() != null) {
            throw new BadRequestAlertException("A new profissao cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Profissao result = profissaoRepository.save(profissao);
        return ResponseEntity.created(new URI("/api/profissaos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /profissaos} : Updates an existing profissao.
     *
     * @param profissao the profissao to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated profissao,
     * or with status {@code 400 (Bad Request)} if the profissao is not valid,
     * or with status {@code 500 (Internal Server Error)} if the profissao couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/profissaos")
    public ResponseEntity<Profissao> updateProfissao(@RequestBody Profissao profissao) throws URISyntaxException {
        log.debug("REST request to update Profissao : {}", profissao);
        if (profissao.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Profissao result = profissaoRepository.save(profissao);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, profissao.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /profissaos} : get all the profissaos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of profissaos in body.
     */
    @GetMapping("/profissaos")
    public List<Profissao> getAllProfissaos() {
        log.debug("REST request to get all Profissaos");
        return profissaoRepository.findAll();
    }

    /**
     * {@code GET  /profissaos/:id} : get the "id" profissao.
     *
     * @param id the id of the profissao to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the profissao, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/profissaos/{id}")
    public ResponseEntity<Profissao> getProfissao(@PathVariable Long id) {
        log.debug("REST request to get Profissao : {}", id);
        Optional<Profissao> profissao = profissaoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(profissao);
    }

    /**
     * {@code DELETE  /profissaos/:id} : delete the "id" profissao.
     *
     * @param id the id of the profissao to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/profissaos/{id}")
    public ResponseEntity<Void> deleteProfissao(@PathVariable Long id) {
        log.debug("REST request to delete Profissao : {}", id);
        profissaoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
