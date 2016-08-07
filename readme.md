Usage:

`node pogo.js [config]`

Config:

1. `-a` - Auth service:
  * ptc
  * google
2. `-u` - PTC username or Google Email
3. `-p` - Password
4. `-l` - Location where at it should make account. Format is `lat,lng`
5. `-n` - Nickname to pick for your trainer.

Example usage: 

`node pogo.js -a ptc -u MRokas -p over9001 -l 13.37 -90.01 -n MRokas`
`node pogo.js -a google -u example@gmail.com -p over9001 -l 13.37 -90.01 -n MRokas`