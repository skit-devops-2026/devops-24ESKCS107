

FROM nginx:alpine

COPY Home.html /usr/share/nginx/html/index.html
COPY Dashboard.html /usr/share/nginx/html/Dashboard.html
COPY Workout.html /usr/share/nginx/html/Workout.html
COPY Progress.html /usr/share/nginx/html/Progress.html

COPY Home.css /usr/share/nginx/html/Home.css
COPY Dashboard.css /usr/share/nginx/html/Dashboard.css
COPY Workout.css /usr/share/nginx/html/Workout.css
COPY Progress.css /usr/share/nginx/html/Progress.css

COPY images/ /usr/share/nginx/html/images/

EXPOSE 80
