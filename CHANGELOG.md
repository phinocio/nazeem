# Nazeem Changelog
<!-- TOC -->

- [Nazeem Changelog](#nazeem-changelog)

<!-- /TOC -->
___

## v0.17.0 - 2021-11-08

- Updated error type for catches.
- Implemented a cron that runs every x time (TBD) to yeet people with the prisoner role.

## v0.16.1 - 2021-11-08

- Updated NPM packages.

## v0.16.0 - 2021-08-22

- Updated npm packages.
- Removed some commands no longer in use/superceded by CarlBot.

## v0.14.1 - 2021-02-03

- Change general help command to only show admin/mod commands if an admin/mod uses the command.

## v0.14.0 - 2021-02-03

- Add bool attribute 'isUserCommand' to each command to be able to split up the help menu depending on who calls it.
- Implement check on help command to determine who called it (mod+ or user) and respond with appropriate commands (all for mod+).
- Changed specific help command (!help ban) to not give info to users that don't have access to those commands.

## v0.13.0 - 2021-01-31

- Created `!mute <user> <reason?>` command to mute a user.
- Created `!unmute <user> <reason?>` command to unmute a user.
- Update TODO.

## v0.12.0 - 2021-01-25

- Implement a !slowmode command to set a channel to slowmode.

## v0.11.2 - 2021-01-23

- Fix thumbnail image for redditfeed command.

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
