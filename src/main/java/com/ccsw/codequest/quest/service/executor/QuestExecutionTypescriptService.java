package com.ccsw.codequest.quest.service.executor;

import java.io.File;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ccsw.codequest.quest.model.QuestLevelMapDto;
import com.ccsw.codequest.quest.model.executor.ExecutionResultDto;
import com.ccsw.codequest.quest.model.executor.SystemCommandResultTo;
import com.ccsw.codequest.quest.service.QuestExecutionService;
import com.ccsw.codequest.quest.service.QuestService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service("typescriptExecutor")
public class QuestExecutionTypescriptService implements QuestExecutionService {

    @Autowired
    QuestService questService;

    @Override
    public ExecutionResultDto executeCode(Integer questId, String code) {

        SystemCommandResultTo result = new SystemCommandResultTo();

        QuestLevelMapDto questLevelMap = questService.getLevel(questId);

        try {

            //File rootDir = new ClassPathResource("quest/castleTypescript").getFile();
            File rootDir = new File("C:\\sources\\codequest\\server\\src\\main\\resources\\quest\\castleTypescript");
            File binDir = new File(rootDir, "bin");

            prepareProject(rootDir, code, questLevelMap);

            if (binDir != null && binDir.isDirectory())
                deleteDirectoryRecursion(binDir.toPath());

            result = SystemCommandExecutor.ExecuteSyncCommand("npx.cmd tsc", rootDir);
            result = SystemCommandExecutor.ExecuteSyncCommand("node Application.js", binDir);

            if (StringUtils.hasText(result.getOut()) == false) {
                System.out.println("Error al procesar: " + result.getErr());
                return new ExecutionResultDto(-1L);
            }

            ObjectMapper mapper = new ObjectMapper();
            return mapper.readValue(result.getOut(), ExecutionResultDto.class);

        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error al procesar: " + result.getErr());
            return new ExecutionResultDto(-1L);
        }

    }

    private void prepareProject(File rootDir, String code, QuestLevelMapDto questLevelMap) throws IOException {

        File inputSrcDir = new File(rootDir, "src/input");
        File playerSrc = new File(inputSrcDir, "Player.ts");

        StringBuilder playerCode = new StringBuilder();

        playerCode.append("import { Play } from \"../game/Play\";\n");
        playerCode.append("import { TileType } from \"../types/TileType\";\n");
        playerCode.append("import { Warrior } from \"../Warrior\";\n");
        playerCode.append("\n");
        playerCode.append(code.replaceAll("class Player implements Play", "export class Player implements Play"));

        writeTextFile(playerCode.toString(), playerSrc.toPath());

        File levelSrc = new File(inputSrcDir, "LevelData.ts");
        String levelCode = convertMap(questLevelMap.getMap());

        writeTextFile(levelCode, levelSrc.toPath());
    }

    private String convertMap(List<List<Integer>> map) {

        StringBuilder sb = new StringBuilder();

        sb.append("export const LEVEL_MAP : number[][] = [");

        boolean firstRow = true;

        for (List<Integer> row : map) {

            if (firstRow == false)
                sb.append(",");

            sb.append("[");

            boolean firstColumn = true;

            for (Integer tile : row) {

                if (firstColumn == false)
                    sb.append(",");

                sb.append(tile);
                firstColumn = false;
            }

            sb.append("]");
            firstRow = false;
        }

        sb.append("];");

        return sb.toString();
    }

    private void writeTextFile(String content, Path file) throws IOException {
        Files.writeString(file, content);
    }

    private void deleteDirectoryRecursion(Path path) throws IOException {

        if (Files.isDirectory(path, LinkOption.NOFOLLOW_LINKS)) {
            try (DirectoryStream<Path> entries = Files.newDirectoryStream(path)) {
                for (Path entry : entries) {
                    deleteDirectoryRecursion(entry);
                }
            }
        }
        Files.delete(path);
    }

}
