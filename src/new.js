// when a user search a symptom may find other histories with the same symptom

// when a suer goes to the home page, they will search a search bar
// when they click and type on the search bar that will be a symptom
// you sill use that symptom word and find all the post that have that symptom tag

// ---

// to do a query to the db will find symptom name into symptom collection
// connect to firebase database 
// then fetch the sympton list sorting alphabetically and filtering on the typing

// ---

// things I need to start programming:
// - databe  URL
// - in where places will be stored the fetching, 
// - when I get a collection I will stored it into the redux store or component state




// const DATAB_URL = 'https://s3.console.aws.amazon.com/s3/buckets/recovery-advisor/symptoms/'

// const options = {
//     method: "POST",
//     headers: { "Content-Type": "application/json" }
// };

// const fetchSymptons = async () => {
//     const res = await fetch(DATAB_URL, options);
//     const data = await res.json();
//     return data.data.symptoms
// }

// console.log(fetchSymptoms())

// access database 
// open the bucket
// open the symptoms document
// we have return the list of symptoms
// print out the list of symptoms