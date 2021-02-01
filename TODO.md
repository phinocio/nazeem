## TODO

---

### #abandoned-prison functionality.

-   [x] on server join, apply Prisoner role.
-   [x] Remove prisoner role on 'I agree'

### Database

-   [ ] Set up a simple DB in order to track users bans/kicks/warnings, etc.

### Member management

-   [ ] Ban/kick/warnings (need DB to track).

### Misc

-   [x] !pins command

-   [ ] Log deleted msgs to a specific channel.

## Permissions Handler

- [ ] Implement a PermissionsHandler to deal with command permissions outside of the commands themselves. Likely using an attribute similar to `identifier` for the command to define what permissions it needs.