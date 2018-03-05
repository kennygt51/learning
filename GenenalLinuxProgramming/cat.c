#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>

// (関数の)static:記述したファイルのみでの使用を宣言する
// void:返り値の無い関数
// const:定数として扱う時に宣言する
static void do_cat(const char *path);
static void die(const char *s);

int
main(int argc, char *argv[])
{
  int i;
  if (argc < 2) {
    // stderrというストリームに文字列を出力する
    fprintf(stderr,"%s: file name not given \n", argv[0]);
    exit(1);
  }
  for (i = 1; i < argc; i++) {
    do_cat(argv[i]);    // メイン処理
  }
  exit(0);
}

# define BUFFER_SIZE 2048 // 定数の宣言

static void do_cat(const char *path)
{
  int fd;
  unsigned char buf[BUFFER_SIZE];
  int n;
  fd = open(path,O_RDONLY);
  if (fd < 0) die (path);
  for (;;) {
    n = read(fd,buf,sizeof buf);
    if (n < 0) die(path);
    if (n == 0) break;  //read(2)は最後まで読み終わったら0を返す
    if (write(STDOUT_FILENO,buf,n) < 0) die(path);
  }
  if (close(fd) < 0) die(path);
}

static void die(const char *s)
{
  perror(s);
  exit(1);
}
