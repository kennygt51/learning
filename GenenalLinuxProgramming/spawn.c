/* fork() exec() wait()の仕様確認の為、プログラムを実行し結果を待つ*/
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/wait.h>

int
main(int argc, char *argv[])
{
  pid_t pid;

  if (argc != 3) {
    fprintf(stderr, "Usage: %s <command> <arg>\n",argv[0]);
    exit(1);
  }
  pid = fork();/* 子プロセスのPIDが戻る */
  /* 以下のコードは、親・子両方のプロセスで実行される */

  /* エラー処理 */
  if (pid < 0) {
    fprintf(stderr, "Usage: %s <command> <arg>\n", argv[0]);
    exit(1);
  }

  if (pid == 0) {   /* fork()の返り値が0の場合、つまり子プロセスで行われる処理*/
    /* */
    execl(argv[1],argv[1],argv[2],NULL);
    /* exec()はプロセスの上書き 呼び出しが成功すれば、この時点で本プログラムは消滅 */
    /* 呼び出しが戻ったら、失敗したということなので、エラー処理 */
    perror(argv[1]);
  } else {   /* fork()の返り値が0以外（子プロセスのPID）場合、つまり親プロセスで行われる処理 */
    int status;

    waitpid(pid, &status,0); /* 子プロセスが終了するのを待つ */
    printf("child (PID=%d) finished",pid);

    if (WIFEXITED(status)) /*WIFEXITED:exitで終了したら非0 それ以外なら0*/
      printf("exit, status=%d\n",WEXITSTATUS(status));
    else if (WIFSIGNALED(status)) /* WIFEXITED:signalで終了したら非0 それ以外なら0 */
      printf("signal, sig=%d\n",WTERMSIG(status));
    else
      printf("abnormal exit\n");
    exit(0);
  }
}
