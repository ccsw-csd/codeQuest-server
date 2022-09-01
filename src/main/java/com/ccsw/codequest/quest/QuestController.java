package com.ccsw.codequest.quest;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.ccsw.codequest.quest.model.QuestDto;
import com.ccsw.codequest.quest.model.QuestLevelMapDto;
import com.ccsw.codequest.quest.model.QuestStatusDto;

@RequestMapping(value = "/quest")
@RestController
public class QuestController {

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
        QuestDto quest = new QuestDto();
        quest.setId(1L);
        quest.setName("El castillo de Typescript");

        QuestLevelMapDto dto = new QuestLevelMapDto();
        dto.setQuest(quest);
        dto.setLevelId(id);
        dto.setName("Level 1 - La entrada");
        dto.setTiles(new String[][] { //
                { "wall-tl", "wall-t", "wall-t", "wall-t", "wall-t", "wall-t", "wall-t", "wall-t", "wall-t", "wall-t", "wall-tr" }, //
                { "wall-l", "none", "player", "none", "none", "none", "none", "item-sword", "none", "ladder", "wall-r" }, //
                { "wall-bl", "wall-b", "wall-b", "wall-b", "wall-b", "wall-b", "wall-b", "wall-b", "wall-b", "wall-b", "wall-br" } //
        });

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
