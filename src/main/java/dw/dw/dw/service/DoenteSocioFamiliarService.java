package dw.dw.dw.service;

import dw.dw.dw.domain.DoenteSocioFamiliar;
import dw.dw.dw.repository.DoenteSocioFamiliarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class DoenteSocioFamiliarService {

    @Autowired
    private DoenteSocioFamiliarRepository doenteSocioFamiliarRepository;

    public DoenteSocioFamiliar getbyDoente(Long doente){
        DoenteSocioFamiliar doenteSocioFamiliars = doenteSocioFamiliarRepository.findAllByDoenteId(doente);
        return doenteSocioFamiliars;
    }

}
