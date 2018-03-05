/* rename(2)を用いて、実体に対するファイル名を変更する */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int
main(int argc, char *argv[])
{
  int i;

  if (argc != 3) {
    fprintf(stderr, "%s: wrong arguments\n", argv[0]);
    exit(1);
  }
  /* argv[1]をargv[2]に変更する */
  if (rename(argv[1],argv[2]) < 0) {
    perror(argv[1]);
    exit(1);
  }
  exit(0);
}
