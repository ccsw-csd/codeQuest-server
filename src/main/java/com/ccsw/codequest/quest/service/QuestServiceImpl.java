package com.ccsw.codequest.quest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ccsw.codequest.quest.dataaccess.QuestRepository;
import com.ccsw.codequest.quest.model.QuestLevelMapDto;

@Service
public class QuestServiceImpl implements QuestService {

    @Autowired
    QuestRepository questRepository;

    @Override
    public QuestLevelMapDto getLevel(Integer id) {
        return questRepository.getLevel(id);
    }
}
