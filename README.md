# Steam Group Members
A node module to get a steam groups members list using promises.

# Installation
`npm install steam-group-members`

# Example usage
To see example usage please find the [example.js](https://github.com/b3none/steam-group-members/blob/master/example.js)

```javascript
const steamGroup = require('steam-group-members');

let steamGroupUrl = 'https://steamcommunity.com/groups/voidrealitygaming';

// Get a list of all the steam group members.
steamGroup.getMembers(steamGroupUrl)
    .then(members => console.log(members));

// Grab a list of members on a specific page (default: 1)
steamGroup.getPageMembers(steamGroupUrl, 2)
    .then(pageMembers => console.log(pageMembers));

// Find a member in the steam group.
steamGroup.findMember(steamGroupUrl, '76561198028510846')
    .then(isMember => console.log(isMember));
```

# Roadmap
- Input parameter validation
- Look at implementing a caching system