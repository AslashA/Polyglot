const { resolve } = require('path')

const extensionPath = resolve(__dirname, 'Polyglot.safariextension')

module.exports = {
  mode: 'development',
  entry: {
    global: ['./src/global/global.ts'],
    content: ['./src/content/content.ts'],
  },
  output: {
    path: extensionPath,
    filename: '[name].entry.js',
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        include: '/src/content/*.ts',
        exclude: /node_modules/,
        options: {
          instance: 'content',
          configFile: './tsconfig.content.json',
        },
      },
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        exclude: /node_modules/,
        options: {
          instance: 'global',
          configFile: './tsconfig.global.json',
        },
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
