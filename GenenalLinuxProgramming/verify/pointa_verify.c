#include <stdio.h>

int main(void)
{
  //int型変数のアドレス
  int in1,in2,in3;
  printf("in1:%p\n",&in1);
  printf("in2:%p\n",&in2);
  printf("in3:%p\n",&in3);

  //配列のアドレス
  int array[10];
  printf("array__(%p)\n",array);
  printf("array[0]__(%p)\n",&array[0]);
  printf("array[1]__(%p)\n",&array[1]);
  printf("array[2]__(%p)\n",&array[2]);

  //「int型の変数のアドレス」を記憶する為のポインタ変数p
  int *p;
  // int型の変数i
  int i;
  // &演算子を用いて変数iのアドレスを求めて、ポインタ変数pに代入する
  p = &i;
  // pの値とiのアドレス値は一緒になるはず
  printf("p = %p\n",p);
  printf("i = %p\n",&i);

  // ポインタ変数の最も基本的な使い方

  int *p2,i2;

  // ポインタ変数モード：読み書きしたいメモリのアドレスを代入
  p2 = &i2;

  // 通常変数モード：ポインタ変数pを通常変数モードに切り替えて10を代入
  // 実際に10が格納されるメモリのアドレスはiのアドレス
  *p2 = 10;

  printf("*p2 = %d\n",*p2);
  printf("i2 = %d\n",i2);

  return 0;
}
