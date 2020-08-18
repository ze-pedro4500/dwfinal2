package dw.dw.dw.service;

import dw.dw.dw.domain.DoenteRegistosIntervencoes;
import dw.dw.dw.repository.DoenteRegistosIntervencoesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
public class DoenteRegistosIntervencoesService {

    @Autowired
    private DoenteRegistosIntervencoesRepository doenteRegistosIntervencoesRepository;

    public List<DoenteRegistosIntervencoes> findByDoente(Long doente) {
        List<DoenteRegistosIntervencoes> doenteRegistosIntervencoes;
        doenteRegistosIntervencoes = doenteRegistosIntervencoesRepository.findAllByDoenteId(doente);
        return doenteRegistosIntervencoes;
    }

}
