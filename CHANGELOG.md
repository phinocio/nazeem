# Nazeem Changelog
<!-- TOC -->

- [Nazeem Changelog](#nazeem-changelog)
	- [v0.10.0 - 2021-01-02](#v0100---2021-01-02)
	- [v0.9.1 - 2021-01-01](#v091---2021-01-01)
	- [v0.9.0 - 2021-01-01](#v090---2021-01-01)

<!-- /TOC -->
___

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
