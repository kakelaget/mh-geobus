Miljøhack-Geobus
================

A simple api wrapper for SIRI provided by en-tur in Norway.

Routes
------

``/test`` Simple test route

``/geotest`` Initial implementation of geoposition wrapper

* Supports ``lineRef`` as a query parameter

LineRef is on the format ``OPERATOR:LINE_IDENTIFIER:ROUTE_NUMBER``,
e.g. ``RUT:Line:17``.

Deploy
------

This application can be deployed in Docker.
The Docker image is available on Dockerhub_.


.. _Dockerhub: https://hub.docker.com/r/sklirg/mh-geobus
