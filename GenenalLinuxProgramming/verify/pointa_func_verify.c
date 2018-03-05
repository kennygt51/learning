#include <stdio.h>

void func(int *pvalue); /* プロトタイプ宣言 */

int main(void)
{
  // int型の変数valueに10を代入
  int value = 10;
  printf("&value = %p\n",&value);

  // valueのアドレス値（0F6Fみたいな感じ）を引数として渡して実行。
  // func()の中でvalueのアドレスの中身が書き換わる
  func(&value);
  printf("value = %d\n",value);
  return 0;
}

void func(int *pvalue)
{
  // 引数として渡されたアドレス値を表示
  printf("pvalue = %p\n",pvalue);
  // 通常変数モードに切り替えてpvalueに代入されたアドレスの中身を書き換える
  *pvalue = 100;
  // returnでは何も返さずに終了する
  return;
}
