/* 構造体の検証 */

#include <stdio.h>

struct employee {
	int year;	/* 年次　*/
	int number;	/* 社員番号　*/
	char department[64];	/* 部署名　*/
	char name[64];	/* 社員名　*/
	double stature;	/* 身長　*/
	double weight;	/* 体重　*/
};

int main()
{
  struct employee data;

  data.year = 4;
  printf("%d\n",data.year);

  return 0;
}
