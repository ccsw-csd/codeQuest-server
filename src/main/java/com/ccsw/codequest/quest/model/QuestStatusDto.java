package com.ccsw.codequest.quest.model;

public class QuestStatusDto {

    private Long questId;

    private Integer totalLevel;

    private Integer actualLevel;

    private Integer points;

    /**
     * @return the questId
     */
    public Long getQuestId() {
        return questId;
    }

    /**
     * @param questId the questId to set
     */
    public void setQuestId(Long questId) {
        this.questId = questId;
    }

    /**
     * @return the totalLevel
     */
    public Integer getTotalLevel() {
        return totalLevel;
    }

    /**
     * @param totalLevel the totalLevel to set
     */
    public void setTotalLevel(Integer totalLevel) {
        this.totalLevel = totalLevel;
    }

    /**
     * @return the actualLevel
     */
    public Integer getActualLevel() {
        return actualLevel;
    }

    /**
     * @param actualLevel the actualLevel to set
     */
    public void setActualLevel(Integer actualLevel) {
        this.actualLevel = actualLevel;
    }

    /**
     * @return the points
     */
    public Integer getPoints() {
        return points;
    }

    /**
     * @param points the points to set
     */
    public void setPoints(Integer points) {
        this.points = points;
    }

}
