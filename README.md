# Database-Seed

Database-Seed is a node application that populates a database using the data coming from .xlsx files.

## Installation

Use the package manager npm or yarn to install the dependencies.

```bash
npm install
```
## Configuration
Create a ```.env.development``` file in the root folder with 2 variables:
#### ```MONGO_URL="The Mongo DB Connection URI"```

#### ```DROP_DATABASE="true or false"``` #Indicates if app should clean/drop the actual database before perform new inserctions

## Usage
Fill the .xlsx files in ```src/input-files``` directory, these are models for each entity data. P.S: Don't modify the document structure. You don't need to fill all documents only those you desire to load data from.

To start the application run the ```dev``` script

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.
Make sure you create your branches based on ```develop```

## License
[MIT](https://choosealicense.com/licenses/mit/)