/* link(2)を使ってハードリンクを作成する */
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>

int
main(int argc, char *argv[])
{
  int i;

  if (argc != 3) {
    fprintf(stderr,"%s:arguments error\n",argv[0]);
    exit(1);
  }

  /* argv[1]のファイルの実体に対してargv[2]という名前をつける　*/
  if (link(argv[1],argv[2]) < 0) {
    perror(argv[1]);
    exit(1);
  }
}
