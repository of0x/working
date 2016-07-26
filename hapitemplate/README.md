# My HAPI Template

This is a simple hapi application I built to learn hapi. It has some package foo,
with a pointer to a license file ("SEE LICENSE IN LICENSE.txt" is a magic phrase)
and built in testing (the script section invokes lab, which defaults to the
./test directory).

Because of it's bare bones nature it could be used as a template for other hapi
applications. It demonstrates modules (server.js points to src/server/server.js),
using a configuration object and logging be means of a plugin (see
http://hapijs.com/tutorials/plugins for a discussion on how that works).  

## TODO
serve an index.html page that describes what each route does and includes a
sample call.
