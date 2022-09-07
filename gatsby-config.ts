/* eslint-disable global-require */
import type { GatsbyConfig } from 'gatsby';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

// const remarkMath = require('remark-math');
// const rehypeKatex = require('rehype-katex');

const config: GatsbyConfig = {
  siteMetadata: {
    title: `talking3d`,
    siteUrl: `https://www.talking3d.com`,
  },
  plugins: [
    'gatsby-plugin-postcss',
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    `gatsby-remark-images`,
    `gatsby-plugin-gatsby-cloud`,
    `gatsby-remark-katex`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        remarkPlugins: [remarkMath],
        rehypePlugins: [rehypeKatex],
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 640,
              linkImagesToOriginal: false,
              disableBgImage: true,
              // wrapperStyle: 'position: absolute; border: solid 2px blue;'
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `blog`,
        path: `${__dirname}/src/blog`,
        ignore: [`**/.*`],
      },
    },
    `gatsby-transformer-json`,
  ],
};

export default config;
