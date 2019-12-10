# Chat System

Create conversations and chat in real time with your contacts.


### Prerequisites

- Make sure you have mongodb installed and available on localhost on port 27017 without username and password authentication. 
- Make sure you have Redis and running on default port 6379

### Installing

#### backend-services installation instructions:

from the terminal Run:
```
cd backend-services
```

Start installing:
```
- make sure you have yarn version: 1.15.2 and node v10.13.0
- run from the terminal: yarn install
- run from the terminal: yarn watch
- start in another terminal tab: yarn build
- enter into the build directory and run: node worker.js
```

##### Built With

* Socket.io 
* Express
* Mongoose js

#### chat-frontend installation instructions

from the terminal Run:
```
cd chat-frontend
```

Start installing:
```
- make sure you have yarn version: 1.15.2 and node v10.13.0
- run from the terminal: yarn install
- run from the terminal: yarn start
```

##### Built With

* React js
* Mobx
* Socket.io


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
