/* mkdir(2)を用いてディレクトリを作成する */
#include <stdio.h>
#include <stdlib.h>
#include <sys/stat.h>
#include <sys/types.h>

int
main(int argc, char *argv[])
{
  int i;

  if (argc < 2) {
    fprintf(stderr,"%s:no arguments\n",argv[0]);
    exit(1);
  }

  /* 引数に指定したディレクトリを作成する */
  for (i = 1; i < argc; i++) {
    if (mkdir(argv[i],0777) < 0) {
      perror(argv[i]);
      exit(1);
    }
  }
}
