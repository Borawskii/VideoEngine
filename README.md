# VideoEngine
A lightweight video streaming engine written in Node.js

Steps:

1.) Install this anywhere on your server

2.) Make sure your IP tables are configured properly, this program runs on
    port 3000.
    
3.) Dump all of your video files (.mp4) into the `media/upload` folder. Upon
    start of the node server, it will sort those videos into their respective\n
    alphabetical folder in `media/video/#, A, B, C, ... Z`

4.) Now, if you set up your iptables and permissions correctly, you can open your
    browser, type in the url pointing to your ip and port `3000`, and there will be
    a search bar that renders from the html. Type in whatever you want and press enter,
    or the search button.
