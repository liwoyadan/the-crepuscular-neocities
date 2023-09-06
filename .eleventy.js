const sass = require("sass");
const path = require("path");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/css");
    eleventyConfig.addPassthroughCopy("src/img");
    eleventyConfig.addPassthroughCopy("src/webfonts");
    eleventyConfig.addPassthroughCopy("src/js");
    eleventyConfig.addPassthroughCopy("src/favicon.ico");

    // Compile Sass to CSS
    eleventyConfig.addTemplateFormats("scss");
    eleventyConfig.addExtension("scss", {
        outputFileExtension: "css",

        compile(content, inputPath) {
            let parsed = path.parse(inputPath)
            if(parsed.name.startsWith("_")) {
                return;
            }

            console.log('Compiling scss...', inputPath)

            return (data) => {
                let result = sass.compile(inputPath)
                return result.css
            }
        }
    });

    return {
        passthroughFileCopy: true,
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "public",
        },
    };
};