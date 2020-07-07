# WeatherApp
This is a simple project made to explore the features of Node.Js and Express.Js.<br>
Two free APIs are used
<li>Mapbox
<li>DarkSky
<br>
The app takes text input.
First it converts the text to geographical coordinates using mapbox API. With these coordinates, darksky API is called which gives the weather details of that area.
<br>
The response from darksky API is a JSON string from which we take out the required data and display the current weather condition.
