const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require('path');
const deps = require("../package.json").dependencies;
module.exports = (env,localtest) => {
  const consumReactTsURL = localtest && localtest==='true' ? env['appConfig']['consumReactTsURL_forLocalTest'] :env['appConfig']['consumReactTsURL']; 
  const consumVueTsURL = localtest && localtest==='true' ? env['appConfig']['consumVueTsURL_forLocalTest'] :env['appConfig']['consumVueTsURL']; 
  const consumVueJsURL = localtest && localtest==='true' ? env['appConfig']['consumVueJsURL_forLocalTest'] :env['appConfig']['consumVueJsURL']; 
  return {
    // output: {
    //   publicPath: "http://localhost:3003/",
    // },
  
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
      alias:{
        '@': path.resolve(__dirname, '..' , 'src')
      }
    },
  
    devServer: {
      // port: 3002,
      port:4001,
      historyApiFallback: true,
    },
  
    module: {
      rules: [
        {
          test: /\.m?js/,
          type: "javascript/auto",
          resolve: {
            fullySpecified: false,
          },
        },
        {
          test: /\.(css|s[ac]ss)$/i,
          use: ["style-loader", "css-loader", "postcss-loader"],
        },
        {
          test: /\.(ts|tsx|js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
  
    plugins: [
      new ModuleFederationPlugin({
        name: "hostReactTs",
        filename: "remoteReactTsEntry.js",
        remotes: {
          'remoteReactTs': `remoteReactTs@${consumReactTsURL}/remoteReactTsEntry.js`,
          'remoteVueJs': `remoteVueJs@${consumVueJsURL}/remoteVueJsEntry.js`,
        },
        exposes: {},
        shared: {
          ...deps,
          react: {
            singleton: true,
            requiredVersion: deps.react,
          },
          "react-dom": {
            singleton: true,
            requiredVersion: deps["react-dom"],
          },
        },
      }),
      new HtmlWebPackPlugin({
        template: "./src/index.html",
      }),
    ],
  }
} ;
