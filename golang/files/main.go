package main

import (
	"fmt"
	"io"
	"io/ioutil"
	"os"
)

func main() {
	fmt.Print("Files in Go lang \n")

	content := "Seceret Data stored in file"

	file, err :=  os.Create("./go.dev1.txt")

	checkErr(err)
	
	length,err := io.WriteString(file,content)

	checkErr(err)

	fmt.Printf("%v\n",length)
	defer file.Close()
	readFile(file.Name())
}

func readFile(filename string) {

	dataBytes ,err := ioutil.ReadFile(filename)
	checkErr(err)
	fmt.Print(dataBytes,"\n")
	fmt.Print(string(dataBytes),"\n")
}

func checkErr(err error){
	if err != nil {
		panic(err)
	}
}