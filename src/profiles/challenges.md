# Profile Module Challenges

## Challenge 1

1. Create a route to handle GET requests to our /profiles endpoint.

2. It should return an empty array.

3. Grab the query parameter 'location' and return an array with on profile object with its only property/value being the location.

---

## Challenge 2

1. Get all profiles.

---

## Challenge 3

1. Set up the route for returning a single profile.

2. It should take an ID param and return an object with that ID.

---

## Challenge 4

1. Create the service method in the 'profile.service.ts' file. It should take an ID and return a profile object.

2. Change the controller method we set up for getting single profiles to call our newly created service method and return the result from that.

---

## Challenge 5

1. Create a DTO File for our create route's body. Hook that up in the controller.

2. The class should have 2 fields (name & description) which are both strings.

3. Return the body we're receiving back to the client.

---

## Challenge 6

1. Create a new 'create' function in the service file. It'll take the body of the post request as a parameter, which will be the body that we're getting in the controller.

2. It needs to create a new profile and add it to the 'profiles' array.

3. Each profile has an 'id', 'name', and 'description'.

4. Remember, the backend is where you'll typically create IDs for new resources, not the client. You'll notice that in the original array, we're creating unique IDs. We'll need to create a new unique id for our new profile. Notice how we're using 'randomUUID()' to do that.

5. We'll also want to return the new profile we've created to the controller, and have that return it as a response to the client.

6. You should receive a response from your Nest app with the unique 'id', 'name' and 'description' if you've done this successfully. It'll have a status code of 201 and have the same response body as when we tried to retrieve a single profile.

---

## Challenge 7

1. Create a class named UpdateProfileDto in update-profile.dto.ts with both name and description as strings, and export that class.

2. Create a route in profiles.controller.ts to handle a PUT request. It should take in an ID as a param, and a body with a name and description. Then, return an object with the id, name, and description as a response.

---

## Challenge 8

1. Add an 'update' method in the service layer. It should take an 'id' and the updated profile object we get from the body. That object will contain a 'name' and 'description'.

2. It should find the matching profile based on the id.

3. It should update that profile in the profiles array.

4. It should return the updated profile.

5. Then, call that function in your PUT controller method and return the result.

---

## Challenge 9

1. Change HttpStatus.OK to use the proper property on HttpStatus that serves back a status code of 204 back to the client.

---

## Challenge 10

1. Create a method in the service file to handle the delete request.

2. It should take an id and delete the profile that matches that id. If there is no match, don't do anything with the profiles array.

3. Regardless of whether or not it finds a match, don't worry about returning anything in the service method. In a later lesson, we'll handle the case where there's no match.

4. Our controller is already properly responding with a 204 and an empty body, so you just need to call the service method in the controller.

---
