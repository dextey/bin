package main

import "fmt"

type User struct {
	Name string
	Age int
}

func (u User) GetStatus(){
 fmt.Println(u.Age)
}

func main(){
	// fmt.Println("Hello world")
	john := User{"john",16}
	fmt.Println(john)
	john.GetStatus()
} 