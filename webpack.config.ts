import path from 'path';
import { Configuration } from 'webpack';
import TerserPlugin from 'terser-webpack-plugin';
import { exec } from 'child_process';

const DEBUG = process.env.NODE_ENV !== 'production';

const config: Configuration = {
  mode: DEBUG ? 'development' : 'production',
  entry: {
    main: './src/index.ts',
    config: './src/js/config/index.ts',
  },
  resolve: {
    extensions: ['.ts', '.js', '.json'],
    alias: {
      '~/src': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    {
      // code will be packaged and uploaded automatically only watch mode
      apply: (compiler) => {
        compiler.hooks.afterEmit.tap('AfterEmitPlugin', (compilation) => {
          compiler.options.watch &&
            exec('npm package && npm upload', (err, stdout, stderr) => {
              if (stdout) process.stdout.write(stdout);
              if (stderr) process.stderr.write(stderr);
            });
        });
      },
    },
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            unused: true,
            dead_code: true,
            drop_console: true,
          },
          output: { comments: false },
        },
      }),
    ],
  },
  output: {
    path: path.resolve(__dirname, 'src/dist'),
    filename: '[name].bundle.js',
    publicPath: '/',
  },
  module: {
    strictExportPresence: true,
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
      },
      {
        test: /\.scss$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }, { loader: 'sass-loader' }],
      },
      {
        test: /\.[tj]sx?$/,
        include: path.resolve(__dirname, 'src'),
        use: [
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [{ loader: 'style-loader' }, { loader: 'css-loader' }],
      },
    ],
  },
};

export default config;
