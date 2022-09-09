package com.ccsw.codequest.quest.dataaccess;

import com.ccsw.codequest.quest.model.QuestLevelMapDto;

public interface QuestRepository {

    QuestLevelMapDto getLevel(Integer id);
}
