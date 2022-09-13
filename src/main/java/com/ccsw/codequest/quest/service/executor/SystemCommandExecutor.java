package com.ccsw.codequest.quest.service.executor;

import java.io.File;
import java.io.IOException;
import java.nio.charset.Charset;

import org.apache.commons.io.IOUtils;
import org.springframework.util.StringUtils;

import com.ccsw.codequest.quest.model.executor.SystemCommandResultTo;

/**
 * @author pajimene
 *
 */
public class SystemCommandExecutor {

    private static long DEFAULT_TIME = 60 * 1000l;

    private static Process actualProcess = null;

    /**
    * Recupera el proceso en ejecucion
    * @return
    */
    public static Process getActualProcess() {

        return actualProcess;
    }

    public static SystemCommandResultTo ExecuteSyncCommand(String command, File rootFolder) throws IOException {

        return ExecuteSyncCommand(command, rootFolder, DEFAULT_TIME);
    }

    /**
    * Ejecuta un comando en consola y devuelve su resultado
    * @param command
    * @param rootFolder La carpeta donde queremos ejecutarlo
    * @return
    * @throws IOException
    */
    public static SystemCommandResultTo ExecuteSyncCommand(String command, File rootFolder, long timeout) throws IOException {

        String[] commands = command.split(" ");

        SystemCommandResultTo resultTo = new SystemCommandResultTo();
        resultTo.setTimeout(false);

        Runtime rt = Runtime.getRuntime();
        long initTime = System.currentTimeMillis();
        Process proc = rt.exec(commands, null, rootFolder);
        actualProcess = proc;

        Thread thread = new Thread(new Runnable() {

            @Override
            public void run() {

                try {
                    Thread.sleep(timeout);
                } catch (InterruptedException e) {
                }

                if (proc != null && proc.isAlive()) {
                    resultTo.setTimeout(true);
                    resultTo.setExitValue(-1);
                    proc.destroyForcibly();
                }

            }

        });
        thread.start();

        try {
            Thread.sleep(500);
        } catch (InterruptedException e1) {
            e1.printStackTrace();
        }

        String stderr = null;
        String stdout = null;

        if (proc.getErrorStream().available() > 0)
            stderr = IOUtils.toString(proc.getErrorStream(), Charset.defaultCharset());

        if (proc.getInputStream().available() > 0)
            stdout = IOUtils.toString(proc.getInputStream(), Charset.defaultCharset());

        if (StringUtils.hasText(stdout) && stdout.endsWith("\r\n")) {
            stdout = stdout.substring(0, stdout.length() - 2);
        }
        if (StringUtils.hasText(stderr) && stderr.endsWith("\r\n")) {
            stderr = stderr.substring(0, stderr.length() - 2);
        }

        long endTime = System.currentTimeMillis();
        long executionTime = endTime - initTime;
        resultTo.setExecutionTime(executionTime);

        actualProcess = null;

        if (!resultTo.isTimeout()) {
            try {
                proc.waitFor();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
            resultTo.setErr(stderr);
            resultTo.setOut(stdout);
            resultTo.setExitValue(proc.exitValue());
        }

        return resultTo;
    }

}
