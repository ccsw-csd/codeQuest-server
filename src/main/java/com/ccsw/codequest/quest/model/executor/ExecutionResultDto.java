package com.ccsw.codequest.quest.model.executor;

import java.util.List;

public class ExecutionResultDto {

    private Long status;
    private List<ExecutionTurnDto> turns;

    public ExecutionResultDto() {

    }

    public ExecutionResultDto(Long status) {
        this();
        this.status = status;
    }

    /**
     * @return the status
     */
    public Long getStatus() {
        return status;
    }

    /**
     * @param status the status to set
     */
    public void setStatus(Long status) {
        this.status = status;
    }

    /**
     * @return the turns
     */
    public List<ExecutionTurnDto> getTurns() {
        return turns;
    }

    /**
     * @param turns the turns to set
     */
    public void setTurns(List<ExecutionTurnDto> turns) {
        this.turns = turns;
    }

}
