package main
import "fmt"

func main() {
  var a int = 1

  switch i:=0; a {
  case 1:
    fmt.Println(i + 1) //1
    fallthrough
  case 2:
    fmt.Println(i + 2) //2
  case 3,4:
    fmt.Println(i + 3) //実行されない
  default:
    fmt.Println(i) //実行されない
  }
}
