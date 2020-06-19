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
- - photo
- - name
- - phone (private)
- - email (private)
- - id
- - tagline
- - styles
- - certifications { name, provider }
- - bio
- - links { instagram, facebook, insight timer, website, other }
- - verified

- student
- - phone (private)
- - email (private, visible to teacher)
- - photo
- - favorite_styles []

- classes
- - title
- - tagline
- - description
- - location (online link, geolocation)
- - time
- - styles

## todo

- https://medium.com/@grigorylapshin/oauth-in-react-native-with-expo-c383ee371f4a
- https://docs.expo.io/versions/latest/sdk/in-app-purchases/

## read these

- https://expo.canny.io/feature-requests/p/ability-to-work-in-expo-client-after-detaching
- https://docs.expo.io/introduction/why-not-expo/
- https://docs.expo.io/introduction/managed-vs-bare/#managed-workflow
- https://medium.com/@rafael.rpadovani/stripe-payments-with-sca-in-react-native-15a4926e14f
