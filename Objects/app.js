const user = {
    name: 'saunak',
    address: {
        city: "surat",
        pin: 394110,
        location: {
            lat: 23.2,
            lng: 77.4,
        }
    }
}

let location = user?.address?.location
console.log(location)
// let { lng, lat } = user.address.location;

// for (let key in user) {
//     console.log(key, user[key]);
// }

// let user2 = { ...user }
// user2.name = "shiv"
// user2.address.city = "bharuch"
// console.log(user2);
// console.log(user);

