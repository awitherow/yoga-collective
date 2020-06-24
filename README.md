# yoga-collective

## version 1.0 idea

provide a stupid simple user interface

for yoga instructors to

- create a profile
- share their classes
- keep track of students who registered for their classes

for yoga students to

- create their profile
- find classes
- save favorite teachers
- save favorite styles
- get notifications about upcoming favorite classes
- attend classes

## data structure

- teacher
- - id
- - phone (private)
- - email (private)
- - photo
- - firstName
- - lastName
- - tagline
- - styles
- - bio
- - link
- - verified

- student
- - phone (private)
- - email (private, visible to teacher)
- - photo
- - firstName
- - lastName
- - styles [strings]
- - favTeachers [id of teachers]

- classes
- - id
- - teacherId
- - title
- - description
- - location (online link, geolocation)
- - date
- - time
- - styles

## todo

- https://medium.com/@lukepighetti/yes-you-can-query-firebase-with-graphql-e79a45990f22
