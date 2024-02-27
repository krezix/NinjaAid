const sitemap = require("@quasibit/eleventy-plugin-sitemap");


module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy({"src/static": "/"});
  
    eleventyConfig.addPlugin(sitemap, {
      sitemap: {
        hostname: "https://ninjaaid.link",
        changefreq: "monthly",
        priority: 0.7
      },
    });


    return {
      dir: {
        input: "src",
        includes: "_includes",
        //layouts: "_includes/layouts",
        output: "_site"
      }
    };
  };