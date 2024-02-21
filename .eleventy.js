module.exports = function(eleventyConfig) {
    // Adiciona suporte para copiar arquivos estáticos diretamente para _site
    eleventyConfig.addPassthroughCopy({"src/static": "/"});
  
    return {
      dir: {
        input: "src",
        includes: "_includes",
        layouts: "_includes/layouts",
        output: "_site"
      }
    };
  };