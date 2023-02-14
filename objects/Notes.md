Objects
-------

Time to take a deeper look at another type of storage: **object**.

The object initializer syntax starts with an open curly-brace `{` and ends with a close curly-brace `}` with a list of key-value pairs in the middle. Let's take a look at a `person` object:

```
const person = {
    hairColor: 'brown',
    toes: 10,
    grumpy: true
}

```

 This object shows that we can use **numbers**, **strings** and **booleans** as values.

This person has "brown" `hairColor`, 10 `toes` and is `grumpy`, unfortunately. 

We can retrieve these values by key:

```
console.log( person.toes ); // 10
console.log( person.hairColor ); // brown

```

We can even store other **objects** as values.

---


Retrieve Values
---------------

Time to **retrieve values** from our object.

Givenan object with the following keys and values:

```
const team = {
    name: "Milan AC",
    wins: 86,
    inPlayoffs: false,
};

```

The key `name` corresponds to the string `"Milan AC"`.

If we wanted to retrieve the name of the team, we can do this in **two** ways:

```
console.log( team.name ); // Milan AC
console.log( team['name'] ); // Milan AC

```

We can use the `.` property accessor operator or we can use brackets `[]` just like with arrays!


--- 

Array of Objects
----------------

Things get really interesting when we start to put objects inside arrays and vice-versa.

Let's take our team example again:

```
const team = {
    name: "Milan AC",
    wins: 86,
    inPlayoffs: false,
};

```

In a league, we might have **many** teams:

```
const teams = [team1, team2, team3];
for(let i = 0; i < teams.length; i++) {
    console.log(teams[i].name);
}

```

This example loops over each team and logs out the name of each team.

> This code assumes that each team has a `name` property. If the team is an object without a `name` property, this will log `undefined`.