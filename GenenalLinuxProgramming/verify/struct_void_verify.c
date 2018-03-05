/* 構造体で関数に引数を渡すコードの検証 */

#include <stdio.h>
#include <string.h>

typedef struct {
	int year;	/* 年次　*/
	int number;	/* 社員番号　*/
	char department[64];	/* 部署名　*/
	char name[64];	/* 社員名　*/
	double stature;	/* 身長　*/
	double weight;	/* 体重　*/
} employee;

void employee_print(employee data);

int main(void)
{
  employee data;

  data.year = 5;
  data.number = 1000;
  strcpy(data.department,"営業部");
  strcpy(data.name,"北三分楽");
  data.stature = 175.4;
  data.weight = 540.3;

  employee_print(data); /* 関数呼び出し */

  return 0;
}

void employee_print(employee data)
{
  printf("[YEAR]:%d\n",data.year);
  printf("[NUMBER]:%d\n",data.number);
  printf("[DEPARTMENT]:%s\n",data.department);
  printf("[NAME]:%s\n",data.name);
  printf("[STATURE]:%f\n",data.stature);
  printf("[WEIGHT]:%f\n",data.weight);
  return;
}
