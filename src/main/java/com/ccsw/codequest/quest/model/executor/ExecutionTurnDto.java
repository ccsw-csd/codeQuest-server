package com.ccsw.codequest.quest.model.executor;

import java.util.List;

public class ExecutionTurnDto {

    private List<List<Integer>> map;
    private List<EventTurnDto> events;
    private Integer health;

    /**
     * @return the map
     */
    public List<List<Integer>> getMap() {
        return map;
    }

    /**
     * @param map the map to set
     */
    public void setMap(List<List<Integer>> map) {
        this.map = map;
    }

    /**
     * @return the events
     */
    public List<EventTurnDto> getEvents() {
        return events;
    }

    /**
     * @param events the events to set
     */
    public void setEvents(List<EventTurnDto> events) {
        this.events = events;
    }

    /**
     * @return the health
     */
    public Integer getHealth() {
        return health;
    }

    /**
     * @param health the health to set
     */
    public void setHealth(Integer health) {
        this.health = health;
    }

}
