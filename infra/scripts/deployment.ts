import { exec as child_process_exec } from 'node:child_process';
import { promisify } from 'node:util';

const exec = promisify(child_process_exec);

const availableEnvironments = ['preview', 'production'] as const;
type Environment = (typeof availableEnvironments)[number];

const env = process.env.ENVIRONMENT as Environment;

if (!availableEnvironments.includes(env)) {
  console.log('> Invalid environment specified');
  console.log(`> Available environments: ${availableEnvironments.join(', ')}`);
  process.exit(0);
}

deployment(env);

async function deployment(env: Environment) {
  const vercelToken = process.env.VERCEL_TOKEN;

  if (!vercelToken) {
    console.log('> VERCEL_TOKEN is not set');
    process.exit(0);
  }

  console.log('> Start deployment process..\n');

  console.log(`> Pulling ${env} environment variables`);
  await exec(`vercel pull --yes --environment=${env} --token=${vercelToken}`);

  console.log('> Building project');
  await exec(`vercel build --token=${vercelToken}`);

  const isProd = env === 'production';
  const prodFlag = isProd ? '--prod' : '';

  console.log(`> Deploying project in ${env} environment`);
  const { stdout: previewUrl } = await exec(
    `vercel deploy --prebuilt --token=${vercelToken} ${prodFlag}`,
  );

  console.log('> Deployment completed successfully');

  if (!isProd) {
    await createPullRequestComment(previewUrl);
  }
}

async function createPullRequestComment(comment: string) {
  const githubToken = process.env.GITHUB_TOKEN;
  const pullRequestNumber = process.env.PR_NUMBER;

  await fetch(
    `https://api.github.com/repos/souzagabriel26/smart-translator/issues/${pullRequestNumber}/comments`,
    {
      method: 'POST',
      headers: {
        'X-GitHub-Api-Version': '2022-11-28',
        Authorization: `Bearer ${githubToken}`,
        Accept: 'application/vnd.github+json',
      },
      body: JSON.stringify({
        body: comment,
      }),
    },
  );
}
