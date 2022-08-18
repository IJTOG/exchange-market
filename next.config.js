/** @type {import('next').NextConfig} */
const withAntdLess = require("next-plugin-antd-less");
const path = require("path");

const nextConfig = withAntdLess({
  reactStrictMode: true,
  swcMinify: true,
  modifyVars: { "@primary-color": "#1441E5" },
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {},

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
    // prependData: `@import "variables.module.scss";`
  },

  webpack(config) {
    return config;
  }
});

module.exports = nextConfig;
