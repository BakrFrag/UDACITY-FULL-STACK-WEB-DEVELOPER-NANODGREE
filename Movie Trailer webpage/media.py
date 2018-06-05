# import modules
# we use webbrowser module to open url or html page from our machine

import webbrowser


class Movie():
    # documentation of class Movie
    """
    this class provide a way to store movies information
    """
    # constructor method invoked when instatance created __init__

    def __init__(self, title, storyline, poster_image_url,
                 trailer_youtube_url):
        self.title = title
        self.storyline = storyline
        self.poster_image_url = poster_image_url
        self.trailer_youtube_url = trailer_youtube_url

    # this method show_trailer display the trailer of video on browser

    def show_trailer(self):
        webbrowser.open(self.trailer_youtube_url)
