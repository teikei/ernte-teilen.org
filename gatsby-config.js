const browserslist = require("browserslist");
const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    {
      resolve: `gatsby-plugin-sass`,
      options: {
        postCssPlugins: [autoprefixer({ browsers: browserslist() })]
      }
    }
  ]
};
