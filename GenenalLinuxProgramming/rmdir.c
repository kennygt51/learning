/* rmdir(2)を用いてディレクトリを削除する */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int
main(int argc, char *argv[])
{
  int i;

  if (argc < 2) {
    fprintf(stderr,"%s:no arguments\n",argv[0]);
    exit(1);
  }

  /* 引数に指定したディレクトリを削除する */
  for (i = 1; i < argc; i++) {
    if (rmdir(argv[i]) < 0) {
      perror(argv[i]);
      exit(1);
    }
  }
}
