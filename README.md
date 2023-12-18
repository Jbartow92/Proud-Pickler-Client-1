# The Proud Pickler

## Problem Solved

"The Proud Pickler" is a meticulously crafted platform dedicated to uniting pickleball enthusiasts, providing a space to showcase their unique pickleball identities. Within the esteemed Proud Pickler (PP) community, users can articulate perspectives, explore nearby courts, and share captivating imagery. The application stands as a dedicated space for proliferating the delight of pickleball and fostering an environment where users can unfurl their creative expressions with unparalleled freedom.

## Wireframes

Wireframes for each view can be found [here](https://miro.com/welcomeonboard/Q2E5c0F4RHMxb3VsZDhmeG5CUUF3eHhtbDViOWhxdklyaEFmTENFT001czl3cGd2T0NVVlJ5cVlhbXMxVm9LcXwzNDU4NzY0NTYyNTMwNTAzNzE4fDI=?share_link_id=250262685946).

## Entity Relationship Diagram (ERD)

User-related data and at least one many-to-many relationship are visualized in the ERD, accessible [here](https://dbdiagram.io/d/Proud-Pickle-6543f65a7d8bbd646560af8d).

## Project MVP: Stories & Criteria

### User Stories

1. **View All Posts**
   - As a user, I should be able to see a list of all posts.
   - Given the user wants to view all posts,
   - When the user clicks on a "Posts" link in the navbar,
   - Then the user will be redirected to a posts page.

2. **View All Courts**
   - As a user, I should be able to see a list of all courts.
   - Given the user wants to view all courts,
   - When the user clicks on a "Courts" link in the navbar,
   - Then the user will be redirected to a courts page.

3. **View My Posts**
   - As a user, I should be able to view my posts.
   - Given the user wants to view their posts,
   - When the user clicks on a "Profile" link in the navbar,
   - Then the user will be redirected to the user’s profile page.

4. **Post Ideas**
   - As a user, I should be able to post my ideas for the world to see.
   - Given the user wants to create a post,
   - When the user clicks on the "Add a new post" button,
   - Then the user will be directed to fill out and submit a new post form. A new post will then be added, and the user will be redirected to the post page.

5. **Edit Own Post**
   - As a user, I should be able to edit my own post.
   - Given the user wants to edit a post,
   - When the user clicks on the "Edit" button,
   - Then the user will be directed to fill out and submit an edit post form. An updated post will then be added, and the user will be redirected to the user’s profile page.

6. **Add Court Location**
   - As a user, I should be able to add a court location.
   - Given the user wants to add a court,
   - When the user clicks on the "Add a new court" button,
   - Then the user will be directed to fill out and submit a new court form. A new court will then be added, and the user will be redirected to the courts page.

### Stretch Goals

7. **View All Coaches**
   - As a user, I should be able to see a list of all coaches.
   - Given the user wants to view all coaches,
   - When the user clicks on a "Coaches" link in the navbar,
   - Then the user will be redirected to a coaches page.

8. **Add Myself as a Coach**
   - As a user, I should be able to add myself as a coach.
   - Given the user wants to add themselves as a coach,
   - When the user clicks on the "Add coach" button,
   - Then the user will be directed to fill out and submit a new coach form. A new coach will then be added, and the user will be redirected to the coaches page.

## Technologies Used

- Front-end: React
- Back-end: Django Rest Framework
- Styling: tailwind CSS

## Initialize
- Install dependencies: npm install
- Run the code npm run dev