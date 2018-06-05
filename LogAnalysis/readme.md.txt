this application is about:
 the third project (log analysis) from full stack web developer nandegree at udacity platform 
 link :https://eg.udacity.com/course/full-stack-web-developer-nanodegree--nd004

 get data from database named news by preform complex quries to answer some questions like
 1.what authors has maxium number of views
 2.what articles has maxium number of views
 3.the day that has error rate more than 1%

libraries:
    psycopg2 library to connect database log_analysis (postgresql databases)

contents:
 python file named log_analysis
 text file first_task contain the result of run first_task 
 textfile second_task contain the result of run second task
 textfile third task contain result of run third task

database instructions:
   share the file named newsdata.sql with the shared directory between your host and vagrant
   open vagrant 
   enter username vagrant password vagrant
   connect ssh by typing command (winpty ssh vagrant)  
   navigate to vagrant directory by command cd /vagrant
   type command psql -d news -f newsdata.sql to enter values in newsdata.sql on news database
   write command python log_analysis.py to run the log_analysis.py file and show the result
   
   
    

operating instracutions:
    open python interperter idle
    press ctr+o to open python file log_analysis
    press f5 or from run menu press run 
    
    anthor way is that
    share file in the directory that shared between your host and your vagrant machine
    cd to vagrant by command cd /vagrant
    type command: python log_analysispy
     



