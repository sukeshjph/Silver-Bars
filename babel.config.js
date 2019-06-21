module.exports = api => {
  api.cache(false);
  return {
    plugins: [
      "@babel/plugin-transform-object-assign",
      "@babel/plugin-transform-modules-commonjs",
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-transform-async-to-generator",
      "@babel/plugin-transform-runtime"     
    ],
    presets: [
      [
        "@babel/preset-env",
        {
          useBuiltIns: "usage",
          modules: "commonjs"
        }
      ],
      "@babel/preset-typescript",
    ]
  };
};
