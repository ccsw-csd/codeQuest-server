package com.ccsw.codequest.quest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ccsw.codequest.quest.model.QuestLevelMapDto;
import com.ccsw.codequest.quest.model.QuestStatusDto;
import com.ccsw.codequest.quest.service.QuestService;

@RequestMapping(value = "/quest")
@RestController
public class QuestController {

    @Autowired
    QuestService questService;

    /**
     * Método para recuperar la versión de la aplicación
     *
     * @return
     */
    @RequestMapping(path = "/status", method = RequestMethod.GET)
    public QuestStatusDto status() {

        Long questId = 1L;

        QuestStatusDto dto = new QuestStatusDto();

        dto.setQuestId(questId);
        dto.setTotalLevel(10);
        dto.setActualLevel(3);
        dto.setPoints(30);

        return dto;
    }

    /**
     * Método para recuperar la versión de la aplicación
     *
     * @return
     */
    @RequestMapping(path = "/level/{id}", method = RequestMethod.GET)
    public QuestLevelMapDto level(@PathVariable Integer id) {
        return questService.getLevel(id);
    }

}
