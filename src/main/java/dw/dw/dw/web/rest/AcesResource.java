package dw.dw.dw.web.rest;

import dw.dw.dw.domain.Aces;
import dw.dw.dw.repository.AcesRepository;
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
 * REST controller for managing {@link dw.dw.dw.domain.Aces}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class AcesResource {

    private final Logger log = LoggerFactory.getLogger(AcesResource.class);

    private static final String ENTITY_NAME = "aces";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final AcesRepository acesRepository;

    public AcesResource(AcesRepository acesRepository) {
        this.acesRepository = acesRepository;
    }

    /**
     * {@code POST  /aces} : Create a new aces.
     *
     * @param aces the aces to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new aces, or with status {@code 400 (Bad Request)} if the aces has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/aces")
    public ResponseEntity<Aces> createAces(@RequestBody Aces aces) throws URISyntaxException {
        log.debug("REST request to save Aces : {}", aces);
        if (aces.getId() != null) {
            throw new BadRequestAlertException("A new aces cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Aces result = acesRepository.save(aces);
        return ResponseEntity.created(new URI("/api/aces/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /aces} : Updates an existing aces.
     *
     * @param aces the aces to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated aces,
     * or with status {@code 400 (Bad Request)} if the aces is not valid,
     * or with status {@code 500 (Internal Server Error)} if the aces couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/aces")
    public ResponseEntity<Aces> updateAces(@RequestBody Aces aces) throws URISyntaxException {
        log.debug("REST request to update Aces : {}", aces);
        if (aces.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Aces result = acesRepository.save(aces);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, aces.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /aces} : get all the aces.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of aces in body.
     */
    @GetMapping("/aces")
    public List<Aces> getAllAces() {
        log.debug("REST request to get all Aces");
        return acesRepository.findAll();
    }

    /**
     * {@code GET  /aces/:id} : get the "id" aces.
     *
     * @param id the id of the aces to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the aces, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/aces/{id}")
    public ResponseEntity<Aces> getAces(@PathVariable Long id) {
        log.debug("REST request to get Aces : {}", id);
        Optional<Aces> aces = acesRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(aces);
    }

    /**
     * {@code DELETE  /aces/:id} : delete the "id" aces.
     *
     * @param id the id of the aces to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/aces/{id}")
    public ResponseEntity<Void> deleteAces(@PathVariable Long id) {
        log.debug("REST request to delete Aces : {}", id);
        acesRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
