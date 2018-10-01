package main

import "fmt"

func main() {
	//普通のfor
	for i := 0; i < 3; i++ {
		fmt.Println(i)
	}
	//所謂foreach
	for i, t := range []int{5, 6, 7} {
		fmt.Printf("i=%d,t=%d\n", i, t)
	}
	//while
	w := 0
	for w < 2 {
		fmt.Println(w)
		w++
	}

	for {
		fmt.Println("break!")
		break
	}
}
