package com.ccsw.codequest.quest.dataaccess;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Repository;

import com.ccsw.codequest.quest.model.QuestDto;
import com.ccsw.codequest.quest.model.QuestLevelMapDto;

@Repository
public class QuestRepositoryFake implements QuestRepository {

    @Override
    public QuestLevelMapDto getLevel(Integer id) {

        if (id.equals(1))
            return getLevelOne();

        if (id.equals(2))
            return getLevelTwo();

        return null;
    }

    private QuestLevelMapDto getLevelTwo() {
        QuestDto quest = new QuestDto();
        quest.setId(1L);
        quest.setName("El castillo de Typescript");

        QuestLevelMapDto dto = new QuestLevelMapDto();
        dto.setQuest(quest);
        dto.setLevelId(2);
        dto.setName("Level 2 - Pasillo de Murciélagos");

        List<List<Integer>> map = new ArrayList<>();

        String mapRaw = "7,8,8,8,8,8,8,8,8,8,8,8,9;4,11,0,0,0,21,0,21,0,21,0,0,98;1,2,2,2,2,2,2,2,2,2,2,2,3";

        for (String row : mapRaw.split(";")) {
            map.add(Arrays.asList(row.split(",")).stream().map(Integer::parseInt).collect(Collectors.toList()));
        }

        dto.setMap(map);

        dto.setLib("/** Contiene las posibles acciones de un guerrero */\r\n" //
                + "      interface Warrior {\r\n" //
                + "" //
                + "        /** Avanza una posición en el mapa.\r\n" //
                + "         * * *direction (optional)* -> La dirección de avance ('right' o 'left'). *Por defecto será 'right'.*\r\n" //
                + "         */\r\n" //
                + "        public walk(direction?: Direction): void;\r\n" //
                + "" //
                + "        /** Ataca en una posición del mapa adyacente.\r\n" //
                + "         * * *direction (optional)* -> La dirección de ataque ('right' o 'left'). *Por defecto será 'right'.*\r\n" //
                + "         */\r\n" //
                + "        public attack(direction?: Direction): void;        \r\n" //
                + "" //
                + "        /** Piensa en voz alta (similar a un console.log).\r\n" //
                + "         * * *message* -> El texto que piensa el guerrero.\r\n" //
                + "        */\r\n" //
                + "        public think(message: string): void;        \r\n" //
                + "" //
                + "        /** Observa lo que hay en una posición del mapa adyacente.\r\n" //
                + "         * * *direction (optional)* -> La dirección observada ('right' o 'left'). *Por defecto será 'right'.*\r\n" //
                + "         */\r\n" //
                + "        public lookAt(direction?: Direction): TileType;        \r\n" //
                + "      }\r\n" //
                + "" //
                + "      interface Play {\r\n" //
                + "        public play(warrior: Warrior) : void;\r\n" //
                + "      }\r\n"//
                + "" //
                + "      enum TileType {\r\n" //
                + "        Empty, Enemy, Wall, Exit; \r\n" //
                + "      }\r\n"//
                + "" //
                + "      enum Direction {\r\n" //
                + "        Right, Left; \r\n" //
                + "      }\r\n");

        dto.setChapterInfo("<div class='p-2 text-lg font-italic text-justify'>" //
                + "        Atraviesas la entrada del castillo, con cierto nerviosismo, y llegas a un largo pasillo con unas escaleras al fondo. Cerca de esas escaleras, puedes ver una espada vieja y oxidada que podría serte de utilidad, si las cosas se torcieran más adelante.<br/>Decides coger la espada antes de subir las escaleras." //
                + "    </div>" //
                + "    <div class='info-tip'>" //
                + "        <b>TIP</b>: Intenta avanzar hacia delante dentro del método <span class='info-tag'>play()</span> de la clase <span class='info-tag'>Player</span>." //
                + "    </div>" //
                + "    <h2 class='mt-4'>Habilidades</h2>" //
                + "    <div class='mt-2'>" //
                + "        <h3>Acciones (solo una por turno)</h3>" //
                + "        <div>" //
                + "            <div><span class='info-tag'>warrior.walk(direction?)</span></div>" //
                + "            <div class='ml-3 mt-2'>" //
                + "                Avanza una posición en el mapa. La dirección de avance (<span class='info-tag'>'right'</span><span> o </span><span class='info-tag'>'left'</span><span>) es opcional y por defecto será </span><span class='info-tag'>'right'</span>." //
                + "            </div>" //
                + "        </div>" //
                + "    </div>" //
                + "    <div class='mt-6'>" //
                + "        <h3>Sentidos</h3>" //
                + "        <div>" //
                + "            <div><span class='info-tag'>warrior.think(message)</span></div>" //
                + "            <div class='ml-3 mt-2'>" //
                + "                Piensa en voz alta (similar a un <span class='info-tag'>console.log</span>). La propiedad <span class='info-tag'>message</span> es el texto que se mostrará en consola." //
                + "            </div>" //
                + "        </div>" //
                + "    </div>");

        dto.setOriginalCode("/**\r\n" //
                + " *\r\n" //
                + " * Comportamiento del jugador\r\n" //
                + " * \r\n" //
                + " */\r\n" //
                + "class Player implements Play {\r\n" //
                + "    \r\n" //
                + "    \r\n" //
                + "  public play(warrior : Warrior) : void {\r\n" //
                + "\r\n" //
                + "    //TODO: Implementar logica del jugador\r\n" //
                + "    if (TileType.Enemy == warrior.lookAt()) warrior.attack();\r\n" //
                + "    else warrior.walk();\r\n" //
                + "\r\n" //
                + "  }\r\n" //
                + "    \r\n" //
                + "}");

        return dto;
    }

    private QuestLevelMapDto getLevelOne() {
        QuestDto quest = new QuestDto();
        quest.setId(1L);
        quest.setName("El castillo de Typescript");

        QuestLevelMapDto dto = new QuestLevelMapDto();
        dto.setQuest(quest);
        dto.setLevelId(1);
        dto.setName("Level 1 - La entrada");

        List<List<Integer>> map = new ArrayList<>();

        String mapRaw = "7,8,8,8,8,8,8,8,8,8,9;4,0,11,0,0,0,0,81,0,99,6;1,2,2,2,2,2,2,2,2,2,3";

        for (String row : mapRaw.split(";")) {
            map.add(Arrays.asList(row.split(",")).stream().map(Integer::parseInt).collect(Collectors.toList()));
        }

        dto.setMap(map);

        dto.setLib("/** Contiene las posibles acciones de un guerrero */\r\n" //
                + "      interface Warrior {\r\n" //
                + "        /** Avanza una posición en el mapa.\r\n" //
                + "         * * *direction (optional)* -> La dirección de avance ('right' o 'left'). *Por defecto será 'right'.*\r\n" //
                + "         */\r\n" //
                + "        public walk(direction?: string): void;\r\n" //
                + "        /** Piensa en voz alta (similar a un console.log).\r\n" //
                + "         * * *message* -> El texto que piensa el guerrero.\r\n" //
                + "        */\r\n" //
                + "        public think(message: string): void;        \r\n" //
                + "      }\r\n" //
                + "      interface Play {\r\n" //
                + "        public play(warrior: Warrior) : void;\r\n" //
                + "      }");

        dto.setChapterInfo("<div class='p-2 text-lg font-italic text-justify'>" //
                + "        Atraviesas la entrada del castillo, con cierto nerviosismo, y llegas a un largo pasillo con unas escaleras al fondo. Cerca de esas escaleras, puedes ver una espada vieja y oxidada que podría serte de utilidad, si las cosas se torcieran más adelante.<br/>Decides coger la espada antes de subir las escaleras." //
                + "    </div>" //
                + "    <div class='info-tip'>" //
                + "        <b>TIP</b>: Intenta avanzar hacia delante dentro del método <span class='info-tag'>play()</span> de la clase <span class='info-tag'>Player</span>." //
                + "    </div>" //
                + "    <h2 class='mt-4'>Habilidades</h2>" //
                + "    <div class='mt-2'>" //
                + "        <h3>Acciones (solo una por turno)</h3>" //
                + "        <div>" //
                + "            <div><span class='info-tag'>warrior.walk(direction?)</span></div>" //
                + "            <div class='ml-3 mt-2'>" //
                + "                Avanza una posición en el mapa. La dirección de avance (<span class='info-tag'>'right'</span><span> o </span><span class='info-tag'>'left'</span><span>) es opcional y por defecto será </span><span class='info-tag'>'right'</span>." //
                + "            </div>" //
                + "        </div>" //
                + "    </div>" //
                + "    <div class='mt-6'>" //
                + "        <h3>Sentidos</h3>" //
                + "        <div>" //
                + "            <div><span class='info-tag'>warrior.think(message)</span></div>" //
                + "            <div class='ml-3 mt-2'>" //
                + "                Piensa en voz alta (similar a un <span class='info-tag'>console.log</span>). La propiedad <span class='info-tag'>message</span> es el texto que se mostrará en consola." //
                + "            </div>" //
                + "        </div>" //
                + "    </div>");

        dto.setOriginalCode("/**\r\n" //
                + " *\r\n" //
                + " * Comportamiento del jugador\r\n" //
                + " * \r\n" //
                + " */\r\n" //
                + "class Player implements Play {\r\n" //
                + "    \r\n" //
                + "    \r\n" //
                + "  public play(warrior : Warrior) : void {\r\n" //
                + "\r\n" //
                + "    //TODO: Implementar logica del jugador\r\n" //
                + "    warrior.walk();\n" //
                + "\r\n" //
                + "  }\r\n" //
                + "    \r\n" //
                + "}");

        return dto;
    }

}
