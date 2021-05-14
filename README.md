# covidrescue.co.in

#### ⚡️ Get `real-time`, `verified` leads on Oxygen, Remdesivir, ICU, Beds, Food and more based on your location. Get notifications on Vaccine at your mail whenever it is available.

## 🏠 **Home Page**

![Vaccine Availability](https://raw.githubusercontent.com/PlaceholderTech/covidrescue.co.in/master/readmeGifs/twitter.gif)

## 💉 **Vaccine Availability Notifier Page**

![Vaccine Availability](https://raw.githubusercontent.com/PlaceholderTech/covidrescue.co.in/master/readmeGifs/availability.gif)

## 🐥 Features

- ⚡️ Get real-time verified leads on resources.
- 🔥 Fast, real-time, built with `Next.js`, `Twitter-api`, `CoWIN API` and `AWS`
- 🚀 Get Covid-19 State based on States, Areas, Cities and Overall India.
- 🇮🇳 Map wise distribution of Active cases, Total Recovered, Total till now etc.
- 🤙🏻 Real-time slots list available on the website itself.
- 📍 Location-based filtering for tweets. (All the Indian cities are included)

## 🔩 Installation

Installation is simple. To run the project locally, follow the below steps:

**Clone the repository**

- `git clone https://github.com/PlaceholderTech/covidrescue.co.in.git`

**Install the packages**

- `npm install` or `yarn`

Create a `.env.local` file to setup your environment variables. Example of .env file is provided in the repository as `.env.example`

```bash
TWITTER_API_KEY = ''
TWITTER_API_SECRET = ''
TWITTER_BEARER_TOKEN = ''
TWITTER_ACCESS_TOKEN = ''
TWITTER_ACCESS_TOKEN_SECRET = ''
GOVT_DATA_API = ''
EMAIL=''
APPLICATION_PASSWORD=''

MYSQL_HOST=''
MYSQL_DATABASE=''
MYSQL_USERNAME=''
MYSQL_PASSWORD=''
MYSQL_PORT=''
```

#### 🕊 Setting up Twitter API for fetching tweets

For the Twitter posts to work, you need to create a Twitter Standard V2 Account. You can do it [here](https://developer.twitter.com/en/docs/getting-started).

Approving of the Developer portal may take 1 day or more.
Once you have the Twitter API credentials, populate the `.env.example` file and you're good to go.

#### 💻 Setting up MySQL for storing users

Note: Users are deleted when the notification is sent to the user.

Setup a MySQL server on your system. Create a user and get the following credentials:

```bash
MYSQL_HOST
MYSQL_DATABASE
MYSQL_USERNAME
MYSQL_PASSWORD
MYSQL_PORT
```

#### ✉️ Sending Emails

- Make your Gmail application `less secure`. Visit [This Link](https://myaccount.google.com/lesssecureapps) for more information.
- Once you're done, Feed your Email and Password in `.env.local` file.

```bash
EMAIL=''
APPLICATION_PASSWORD=''
```

For sending the automated emails, We've written a **Cron Job** that pings the `CoWIN API` every 1 minute. You can find the script under `/scripts` folder.

You can run that script on your local node-express server for running the corn job.

## 🦾 Usage

To run the application locally:

```bash
npm run dev
```

or

```bash
yarn dev
```

## Built with

- [Next.js](https://nextjs.org/)
- [AWS EC2](https://aws.amazon.com)
- [Tailwind CSS](https://tailwindcss.com)
- [Tailwind-kit](https://tailwind-kit.com)
- [MySQL](https://www.mysql.com/)
- [Firebase](https://console.firebase.com)
- [Heroicons](https://heroicons.com)
- [Twitter API](https://developer.twitter.com)
- [CoWIN API](https://apisetu.gov.in/public/marketplace/api/cowin)
- [Node Cron](https://www.npmjs.com/package/node-cron)

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)

Developed by [Manu Arora](https://manuarora.in), [Kishore Raghavendra Gunnam](https://github.com/kishore-gunnam) and [Abhinav Sharma](https://abhinav.sh)
