# Nazeem Changelog
<!-- TOC -->

- [Nazeem Changelog](#nazeem-changelog)
	- [v0.11.2 - 2021-01-23](#v0112---2021-01-23)
	- [v0.11.1 - 2021-01-20](#v0111---2021-01-20)
	- [v0.11.0 - 2021-01-06](#v0110---2021-01-06)
	- [v0.10.1 - 2021-01-04](#v0101---2021-01-04)
	- [v0.10.0 - 2021-01-02](#v0100---2021-01-02)
	- [v0.9.1 - 2021-01-01](#v091---2021-01-01)
	- [v0.9.0 - 2021-01-01](#v090---2021-01-01)

<!-- /TOC -->
___

## v0.11.2 - 2021-01-23

- Fix thumbnail image.

## v0.11.1 - 2021-01-20

- Remove console.log that was spamming log file.

## v0.11.0 - 2021-01-06

- Changed the reddit feed to store the most recent post in a file to prevent sending again on bot restart
- Added a specific `readTxt` method to the Storage helper.
- Moved `!msg.author.bot` to the EventHandler check so MessageHandler does not run on bot messages including Webhooks.

## v0.10.1 - 2021-01-04

- Remove test text

## v0.10.0 - 2021-01-02

- Add new !gff command to give info on Game Folder Files

## v0.9.1 - 2021-01-01

- Removed some console.logs to prevent log file on server from bloating.

## v0.9.0 - 2021-01-01

- Added changelog.
- Added "redditFeed" option to config file.
- Removed "twitchNotify" option from config file.
- Deleted TwitchNotify event.
- Add nohup.out to gitignore.
- Added crypto-js v4.0.0 for purposes of ensuring not sending duplicate posts.
- Created cron task to check subreddit for new posts and send them to a channel.
