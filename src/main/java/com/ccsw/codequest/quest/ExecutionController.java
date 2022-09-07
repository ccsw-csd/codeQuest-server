package com.ccsw.codequest.quest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ccsw.codequest.quest.model.QuestLevelRunDto;
import com.ccsw.codequest.quest.model.executor.ExecutionResultDto;
import com.ccsw.codequest.quest.service.QuestExecutionService;

@RequestMapping(value = "/quest")
@RestController
public class ExecutionController {

    @Autowired
    @Qualifier("typescriptExecutor")
    QuestExecutionService questExecutionService;

    /**
     * Método para recuperar la versión de la aplicación
     *
     * @return
     */
    @RequestMapping(path = "/level/{id}/run", method = RequestMethod.POST)
    public ExecutionResultDto run(@PathVariable Integer id, @RequestBody QuestLevelRunDto dto) {
        return questExecutionService.executeCode(id, dto.getCode());
    }

}
