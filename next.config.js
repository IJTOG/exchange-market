/** @type {import('next').NextConfig} */
const withAntdLess = require("next-plugin-antd-less");
const path = require("path");

const nextConfig = withAntdLess({
  reactStrictMode: false,
  swcMinify: true,
  modifyVars: { "@primary-color": "#1441E5" },
  lessVarsFilePathAppendToEndOfContent: false,
  cssLoaderOptions: {},

  sassOptions: {
    includePaths: [path.join(__dirname, "styles")]
  },

  webpack(config) {
    return config;
  }
});

module.exports = nextConfig;
