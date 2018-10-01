package main
import "fmt"

func main() {
  //配列の定義
  var a [3]int
  b := [2]string{"hoge","fuga"}

  //初期値を指定すると長さを省略
  c := [...]int{1,2}
  //インデックスを指定して値を割り当てる
  d := [3]int{1:1,2:10}

  fmt.Println(a[0])//0
  fmt.Println(b[1])//fuga
  fmt.Println(d[0],d[1],d[2])//0 1 10
  fmt.Println(len(c))//3

  //スライスの定義
  var e []int
  f := []string{"hoge","fuga"}
  g := []int{1,2}

  fmt.Println(e)//[]
  fmt.Println(f[1])//fuga
  fmt.Println(g[1])//2
  
  //マップの定義
  m := map[string]int{"a":1,"b":2}
  m["b"] = 10
  fmt.Println(m["a"],m["b"])
}
