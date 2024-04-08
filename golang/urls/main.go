package main

import (
	"fmt"
	"net/url"
)

const URL = "https://example.com:80/info?data=1&id=0d134f4989cb389"

func main() {

	fmt.Print("URLS in golang \n")
	fmt.Printf("%v\n", URL)

	result, _ := url.Parse(URL)

	fmt.Println(result.Scheme)
	fmt.Println(result.Host)
	fmt.Println(result.Path)
	fmt.Println(result.Port())
	fmt.Println(result.RawQuery)
	fmt.Println()
	fmt.Println()

	params := result.Query()
	fmt.Printf("Type : %T\n", params)
	fmt.Println(params)

	partsofUrl := &url.URL{
		Scheme: "https",
		Host:   "dex.io",
	}

	anotherURL := partsofUrl.String()
	fmt.Println(anotherURL)
}
