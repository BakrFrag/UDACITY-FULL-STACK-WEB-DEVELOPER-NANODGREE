#!/usr/bin/env python

import psycopg2
try:
    con = psycopg2.connect('dbname={0}'.format('news'))
except Exception as e:
    print str(e)
cur = con.cursor()
first_query = """SELECT articles.title,COUNT(articles.title) AS NUM_VIEWS FROM articles
INNER JOIN log ON log.path LIKE CONCAT('/article/',articles.slug) WHERE log.
status LIKE('200 OK') GROUP BY articles.title ORDER BY NUM_VIEWS DESC LIMIT 3 ;
"""
second_query = """SELECT authors.name , COUNT(authors.name) FROM authors INNER JOIN articles
ON authors.id=articles.author INNER JOIN log ON log.path LIKE CONCAT
('/article/',articles.slug) WHERE log.status LIKE '200 OK' GROUP BY
authors.name ORDER BY COUNT(authors.name) DESC;"""

third_query = """SELECT TO_CHAR(DATE, 'FMMONTH FMDD, YYYY'), ERR/TOTAL AS RATIO FROM (SELECT
TIME::DATE AS DATE,COUNT(*) AS TOTAL,SUM((STATUS != '200 OK')::INT)::FLOAT AS
ERR FROM log GROUP BY DATE) AS ERRORS WHERE ERR/TOTAL > 0.01;"""

first_header = "What are the most popular three articles of all time? \n"
second_header = "Who are the most popular article authors of all time? \n"
third_header = "On which days did more than 0.01 of requests lead to errors?\n"


def first_task():
                print first_header
                print"title", "\t\t", "views"
                task = file("first_task.txt", "w")
                task.write(first_header)
                headers = "title \t\t views\n"
                task.write(headers)
                cur.execute(first_query)
                for i in cur.fetchall():
                        result = str(i[0])+"\t\t"+str(i[1])
                        print result
                        task.write(result)
                task.close()


def second_task():
                print second_header
                print "name \t\t count"
                task = file("second_task.txt", "w")
                task.write(second_header)
                headers = "name \t\t count\n"
                task.write(headers)
                cur.execute(second_query)
                for i in cur.fetchall():
                            result = str(i[0])+"\t\t"+str(i[1])
                            print result
                            task.write(result)
                task.close()


def third_task():
                print third_header
                print"to_char", "\t\t", "ratio"
                task = file("third_task.txt", "w")
                task.write(third_header)
                headers = "to_char \t\t ratio\n"
                task.write(headers)
                cur.execute(third_query)
                for i in cur.fetchall():
                            result = str(i[0])+"\t\t"+str(i[1])
                            print result
                            task.write(result)
                task.close()


if __name__ == '__main__':
        first_task()
        second_task()
        third_task()
con.close()
