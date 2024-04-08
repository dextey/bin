package main

import (
	"fmt"
	"io"
	"net/http"
)

const url = "https://example.com"

func main() {
	fmt.Print("Web request in Go lang\n")

	response,err :=http.Get(url)

	checkerr(err)
	fmt.Printf("\nresponse : %T\n\n",response)
	defer response.Body.Close()
	
	dataBytes,err := io.ReadAll(response.Body)
	checkerr(err)
	fmt.Print(string(dataBytes),"\n")
}

func checkerr(err error){
	if err != nil{
		panic(err)
	}
}