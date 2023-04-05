module.exports = {
  apps: [
    {
      name: 'gpt-shell-server',
      script: 'dist/main.js',
      instances: '4',
      exec_mode: 'cluster',
      env_stable: {
        NODE_ENV: 'stable',
      },
      env_pre: {
        NODE_ENV: 'preonline',
      },
      env_prod: {
        NODE_ENV: 'production',
      }
    }
  ],
};
