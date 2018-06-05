# importing module used on the project
from media import Movie
from fresh_tomatoes import open_movies_page



idiots = Movie("3Idiots",
               """
               3 friendsare students and roommates at the prestigious Imperial
               College of Engineering (ICE)
               """,
               """
               https://upload.wikimedia.org/wikipedia/en/d/df/
               3_idiots_poster.jpg
               """,
               "https://www.youtube.com/watch?v=xvszmNXdM4w")

"""
 second instance variable of class Movie
 from module media media.py
"""

pursuit = Movie("The Pursuit of Happyness",
                """
                man work hard and search for a job to achive happynes
                for his family
                """,
                """
                https://upload.wikimedia.org/wikipedia/en/8/81/
                Poster-pursuithappyness.jpg
                """",
                "https://www.youtube.com/watch?v=89Kq8SDyvfg")



wild = Movie("Into The wild",
             """
            the film is presented in a nonlinear narrative, cutting 
             back and forth between McCandless' time
             spent in the Alaskan wilderness and his
             two-year travels leading up to his journey to Alaska.
             """
             ,
             
             """
             https://20ui41tp7v127j03rcnp97oh-wpengine.netdna-ssl.com/
             wp-content/uploads/2017/01/lloyd_wild.jpg
             """
             ,
             "https://www.youtube.com/watch?v=lwtZgBFKlzs")

# list of instance variables we created

movies = [idiots, pursuit, wild]
open_movies_page(movies)
