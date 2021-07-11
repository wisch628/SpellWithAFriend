# Spell with a Friend :bee: :bee:
![ezgif-3-c838c2750560](https://user-images.githubusercontent.com/76498844/125205820-be696400-e249-11eb-9871-3b3cfba01f54.gif)

### About:
Spell with a Friend is an application that scrapes live data from NYTimes Games to allow users to play a multiplayer version of the Spelling Bee. Users can submit words, see other players’ words, chat with friends, and save game data to come back and play later. Games are inactivated at 3 am when the NYTimes Spelling Bee letters reset.

You can start spelling at https://spellwithafriend.com/.

## Tech Stack
Spell with a Friend is built using React and Redux on the frontend and Node.js, Express, Sequelize, and PostgreSQL on the backend. The live data is fetched from the NYTimes using Puppeteer, and the live user updates and chat are built using Socket.io.

Spell with a Friend is deployed on an AWS EC2.
