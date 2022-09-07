package com.ccsw.codequest.quest.service;

import com.ccsw.codequest.quest.model.executor.ExecutionResultDto;

public interface QuestExecutionService {

    ExecutionResultDto executeCode(Integer questId, String code);

}
