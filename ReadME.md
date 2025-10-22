String Analyzer Service

A RESTful API built with Node.js, Express, and NeDB, designed to analyze strings and store their computed properties — including length, palindrome status, and SHA256 hash.

It also supports natural language filtering via query parameters for searching stored strings.

Features
* Analyze strings and compute properties:

* Character count

* Palindrome detection

* SHA256 hash

* Store results in a lightweight NeDB database (file-based, no setup needed)

* Retrieve all analyzed strings

* Search strings by natural language (query parameter)

* Delete or fetch specific string analyses

* Fully tested with Jest + Supertest

TECH STACK

* Backend Framework: Nodejs/Express.js
* Database: NedB
* Testing: Jest & Supertest
* Environment Config: Dotenv
* Hashing: crypto

TESTING

 Server: http://localhost:8080
 npm start

Run Test: npm test