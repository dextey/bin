package main

import "fmt"

func main(){
	defer fmt.Println("defer in action")
	defer fmt.Println("defer in action-2")
	defer fmt.Println("defer in action-3")
	fmt.Println("Introduction to defer")
	defer deferloop()
}

func deferloop() {
	for i := 0; i < 5; i++ {
		defer fmt.Println(i)
	}
}