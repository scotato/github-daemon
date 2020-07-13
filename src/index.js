const { graphql } = require("@octokit/graphql");
require("dotenv-defaults").config();

async function queryRepo({ owner, name }) {
  const query = await graphql({
    query: `query ($owner: String!, $name: String!) {
      repository(owner:$owner, name:$name) {
        id
        name
        url
        description
        createdAt
        pushedAt
        updatedAt
        homepageUrl
        openGraphImageUrl
        usesCustomOpenGraphImage
        isPrivate
        primaryLanguage {
          color
          name
        }
        stargazers {
          totalCount
        }
        ref(qualifiedName: "master") {
          target {
            ... on Commit {
              history(first: 1) {
                totalCount
                nodes {
                  authoredDate
                  committedDate
                }
              }
            }
          }
        }
        refs(refPrefix: "refs/tags/", last: 1) {
          edges {
            node {
              name
            }
          }
        }
      }
    }`,
    owner,
    name,
    headers: {
      authorization: `bearer ${process.env.GITHUB_TOKEN}`,
    },
  });

  return query.repository;
}

async function app() {
  const repository = await queryRepo({
    owner: "scotato",
    name: "github-daemon",
  });

  console.log(repository);
}

app();
