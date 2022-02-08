# view-spot-finder-node
Case Coding Challenge – Mapping Algorithm


## Instructions

Run on command line:

```sh
node viewSpot.js <path/to/mesh/file.json> <number of view spots>
```

Or run as lambda function (with test data): 

```sh 
serverless invoke -f viewSpotFinder -p test/test_data/mesh.json -l
```

or locally

```sh 
serverless invoke local -f viewSpotFinder -p test/test_data/mesh.json -l
```