package com.ccsw.codequest.quest.service.executor;

import java.io.File;
import java.io.IOException;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.LinkOption;
import java.nio.file.Path;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import com.ccsw.codequest.quest.model.executor.ExecutionResultDto;
import com.ccsw.codequest.quest.model.executor.SystemCommandResultTo;
import com.ccsw.codequest.quest.service.QuestExecutionService;
import com.fasterxml.jackson.databind.ObjectMapper;

@Service("typescriptExecutor")
public class QuestExecutionTypescriptService implements QuestExecutionService {

    @Override
    public ExecutionResultDto executeCode(Integer questId, String code) {

        SystemCommandResultTo result = new SystemCommandResultTo();

        try {

            File rootDir = new ClassPathResource("quest/castleTypescript").getFile();
            File binDir = new File(rootDir, "bin");

            prepareProject(rootDir, code);

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

    private void prepareProject(File rootDir, String code) throws IOException {

        File inputSrcDir = new File(rootDir, "src/input");
        File playerSrc = new File(inputSrcDir, "Player.ts");

        StringBuilder playerCode = new StringBuilder();

        playerCode.append("import { Play } from \"../game/Play\";\n");
        playerCode.append("import { TileType } from \"../types/TileType\";\n");
        playerCode.append("import { Warrior } from \"../Warrior\";\n");
        playerCode.append("\n");
        playerCode.append(code.replaceAll("class Player implements Play", "export class Player implements Play"));

        writeTextFile(playerCode.toString(), playerSrc.toPath());
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
