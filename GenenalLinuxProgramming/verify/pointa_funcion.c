#include <stdio.h>

void func(int);

int main(void)
{
    //関数ポインタ変数を宣言
    void (*pointer)(int);
    //関数ポインタにfunc関数のアドレスを代入。
    pointer=func;
    //関数ポインタから引数に100を渡してfunc関数を実行。
    (*pointer)(100);
    return 0;
}


void func(int value)
{
    printf("%d\n",value);
}
