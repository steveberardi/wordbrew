/*
    PurgeCSS Issue:

    The problem with using PurgeCSS with react-bootstrap is that components
    in react-bootstrap add classnames dynamically and PurgeCSS doesn't
    detect them that way. PurgeCSS doesn't run JS in any way.

    Options for purging CSS with Bootstrap:

        1. Remove react-bootstrap

        2. Explicitly set bootstrap classes on react-bootstrap components

        3. Add all used bootstrap classes to purgecss safelist (below), can use regex

        4. Create plugin/script that automatically finds used classes?


    References:
        https://stackoverflow.com/questions/63865512/react-bootstrap-purgecss-next-js
        
        https://stackoverflow.com/questions/62279045/purgecss-with-react-bootstrap-possible

        https://github.com/Developmint/nuxt-purgecss/issues/14

*/

module.exports = {
    content: [
        'build/**/*.html',
        'build/*.js'
    ],
    css: ['build/*.css'],
    output: "build/",
    safelist: {
        standard: [
            /^btn.*/,
            /^col.*/,
            /^bg.*/,
            /^navbar.*/,
        ],
    }
  }
