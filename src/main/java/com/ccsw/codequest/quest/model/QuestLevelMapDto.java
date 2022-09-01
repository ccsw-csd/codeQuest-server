package com.ccsw.codequest.quest.model;

public class QuestLevelMapDto {

    private QuestDto quest;

    private Integer levelId;

    private String name;

    private String[][] tiles;

    private String lib;

    private String originalCode;

    private String chapterInfo;

    /**
     * @return the quest
     */
    public QuestDto getQuest() {
        return quest;
    }

    /**
     * @param quest the quest to set
     */
    public void setQuest(QuestDto quest) {
        this.quest = quest;
    }

    /**
     * @return the levelId
     */
    public Integer getLevelId() {
        return levelId;
    }

    /**
     * @param levelId the levelId to set
     */
    public void setLevelId(Integer levelId) {
        this.levelId = levelId;
    }

    /**
     * @return the name
     */
    public String getName() {
        return name;
    }

    /**
     * @param name the name to set
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * @return the tiles
     */
    public String[][] getTiles() {
        return tiles;
    }

    /**
     * @param tiles the tiles to set
     */
    public void setTiles(String[][] tiles) {
        this.tiles = tiles;
    }

    /**
     * @return the lib
     */
    public String getLib() {
        return lib;
    }

    /**
     * @param lib the lib to set
     */
    public void setLib(String lib) {
        this.lib = lib;
    }

    /**
     * @return the originalCode
     */
    public String getOriginalCode() {
        return originalCode;
    }

    /**
     * @param originalCode the originalCode to set
     */
    public void setOriginalCode(String originalCode) {
        this.originalCode = originalCode;
    }

    /**
     * @return the chapterInfo
     */
    public String getChapterInfo() {
        return chapterInfo;
    }

    /**
     * @param chapterInfo the chapterInfo to set
     */
    public void setChapterInfo(String chapterInfo) {
        this.chapterInfo = chapterInfo;
    }

}
