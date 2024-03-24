# **Neura - WhatsApp Bot**

## Description

This is an automated WhatsApp bot which performs tasks like downloading media from other social media platforms(Twitter, Instagram, and YouTube), generating stickers, performing calculations, live cricket scores, job searches, weather updates, and many more.

> <br/>This project is purely written in TypeScript.
> <br/><br/>

<br/>

## Usage

The associated process will be finished when a new message is formed with the message body's first word including the name of the module prefixed with "." or "!" or "#" or "$".

> To tag all participants use &emsp;&emsp;"!"<br>
> To tag only admins use &emsp;&emsp;&emsp;"#"<br>
> To tag only non-admins use &emsp;"$"<br>
> To tag none use &emsp;&emsp;&emsp;&emsp;&emsp;&emsp; "."<br>

### Converting image/video to sticker

```
To make a media message into a sticker, use the command "#sticker". Even without quoting the media, you might send a message along with it.
```

<br/>

## Installation and Running

> \
> You must have git, node, and npm installed on your PC in order to do this. (For a better experience, use VSCode as your editor and install the ESLint and Error Lens Extensions.)<br/><br/>

1. Clone the repositery

```
git clone https://github.com/sree-charan/Neura.git
```

2. Install necessary packages

```
npm install
```

3. Run

```
For deploying use
> npm start

For testing
> npm test
```

<br/>

## Contribution

- Fork the repository
- Follow Installation and Running
- Add new module in /modules folder
- Follow ESLint rules before creating a pull request.
- It must have below snippet with proper filename

```ts
import WAWebJS from "whatsapp-web.js"
const process = async (
  message: WAWebJS.Message,
  client: WAWebJS.Client,
  options: WAWebJS.MessageSendOptions
) => {
  // Your module code here
}
module.exports = {
  name: "name_of_module",
  process,
}
```

<br/>

## Testing

For testing, use **_npm test_**. All module names will begin with "test\_" while being tested.

> For instance, when testing, you would use **_#test_alive_** instead of _#alive_ to verify whether the bot is still alive. By doing this, conflicts caused by running two processes at once will be eliminated.
