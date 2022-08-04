const path = require(`path`);
const {
  locales,
  removeTrailingSlash,
  localizedSlug,
  findKey,
} = require(`./src/i18n/i18n`);

exports.onCreatePage = ({ page, actions }) => {
  const { createPage, deletePage } = actions;

  deletePage(page);

  Object.keys(locales).map((lang) => {
    const localizedPath = locales[lang].default ? page.path : `${locales[lang].path}${page.path}`;
    return createPage({
      ...page,
      path: removeTrailingSlash(localizedPath),
      context: {
        ...page.context,
        locale: lang,
      },
    });
  });
};

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions;
  if (node.internal.type === `Mdx`) {
    const name = path.basename(node.fileAbsolutePath, `.mdx`);
    const isDefault = name === `index`;
    const defaultKey = findKey(locales, (o) => o.default === true);
    const slug = path.parse(getNode(node.parent).relativeDirectory);

    const lang = isDefault ? defaultKey : name.split(`.`)[1];

    createNodeField({ node, name: `locale`, value: lang });
    createNodeField({ node, name: `isDefault`, value: isDefault });
    createNodeField({ node, name: `slug`, value: `${slug.base}/` });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  const postTemplate = require.resolve(`./src/pages/blog/post.tsx`);

  const result = await graphql(`
    {
      blog: allFile(filter: { 
        sourceInstanceName: { eq: "blog" }
        internal: {mediaType: {eq: "text/mdx"}}      
      }) {
        edges {
          node {
            relativeDirectory
            childMdx {
              fields {
                locale
                isDefault
              }
              frontmatter {
                title
              }
              id
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    return;
  }

  const postList = result.data.blog.edges;

  postList.forEach(({ node: post }) => {
    const postId = post.childMdx.id;
    const slug = post.relativeDirectory;
    const { title } = post.childMdx.frontmatter;

    const { locale } = post.childMdx.fields;
    const { isDefault } = post.childMdx.fields;

    createPage({
      path: localizedSlug({ isDefault, locale, slug }),
      component: postTemplate,
      context: {
        postId,
        locale,
        title,
      },
    });
  });
};
