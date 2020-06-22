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
    ( FUTURE )
- - links { instagram, facebook, insight timer, website, other }
- - verified
- - certifications { name, provider }

- student
- - phone (private)
- - email (private, visible to teacher)
- - photo
- - firstName
- - lastName
- - fav_styles [strings]
- - fav_teachers [id of teachers]

- classes
- - teacherId
- - title
- - tagline
- - description
- - location (online link, geolocation)
- - date
- - time
- - styles

## todo

- https://medium.com/@lukepighetti/yes-you-can-query-firebase-with-graphql-e79a45990f22
