package dw.dw.dw.repository;

import dw.dw.dw.domain.Aces;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Aces entity.
 */
@SuppressWarnings("unused")
@Repository
public interface AcesRepository extends JpaRepository<Aces, Long> {
}
