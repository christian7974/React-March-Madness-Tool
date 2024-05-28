# March Madness Tool 
## Christian Tropeano

# Description of Project
This is a newer version of my previous March Madness Tool that I created using React and Tailwind.css. This project was a way for me to enhance my skills in React while also working on something that I actually enjoyed (March Madness).  

This project calls my [API](!https://github.com/christian7974/College-Basketball-API) which contains the statistics for every NCAA D1 Men's Basketball team.

I also wanted practice in using different frameworks and other libraries (I used [Material UI](!https://mui.com/material-ui/) for the Autocomplete feature) which is another reason why I pursued this project. I had an earlier version of this project using EJS, however I wanted to redesign it was very awkward to work in.

# Functionality
Users can choose two teams from the dropdown menus and the statistics for those two teams will be shown as well as color coded.

# Problems I Encountered
One problem that I had was sometimes, the entire page would go blank when I would switch teams too quick which could have been caused from the API taking too long to produce a body and an empty object would be rendered, crashing the app. I alleviated this problem by adding a "loading" state to allow the API to fetch the data.

# Things I Would Have Done Differently
One thing that I would have done differently is to implement my own Autocomplete feature, as it is very cumbersome to change the styling on a component from Material UI.  

I also would have split up the appliation into more components (for instance, a component that is composed of the table), however I want to get a better handle on the Context API before to prevent prop drilling. In a small program like this, there are not too many states to manage, however in larger programs I could not get away with having a lot of state in the main component.

# Features To Be Implemented
- Ability to have a variable amount of teams compared
- Have a list of favorite teams that the user can add and can compare with