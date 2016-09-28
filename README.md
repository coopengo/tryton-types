## Tryton Session

THIS PROJECT IS STILL A WORK IN PROGRESS !

[tryton](http://www.tryton.org/) is a very extensible ERP written in Python.

tryton-session is a **part** of a bigger package (tryton-api) that is:
- aimed to be a simple library to interact with a tryton server (trytond) from javascript (node or browser)
- could be considered as a [proteus](https://github.com/tryton/proteus) like library for javascript

### History

- This project started as a portage of [sao](https://github.com/tryton/sao) on nodejs
- This migration faced many problems due to sao design as a clone of [GTK client](https://github.com/tryton/tryton)
    - session is unique
    - usage of jQuery for all (ajax, object manipulation, etc)
- This project has progressively moved from a translation to a rewrite as we decided to
    - use more ES6 features (Promises, Arrow functions, etc)
    - use standard libraries for utils functions (underscorejs)
    - make it more event driven (some ideas from backbonejs)
    - support some extra features like session serialization, triggers on start/stop, etc

### Credits

- [sao](https://github.com/tryton/sao)
- [tryton](https://github.com/tryton/tryton)

### Contents

tryton-types exposes types constructors for tryton (decimal, date, etc)
