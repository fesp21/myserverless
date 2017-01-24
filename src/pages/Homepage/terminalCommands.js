module.exports = [
  {
    text: 'Install serverless globally',
    type: 'comment',
    skip: true
  },
  {
    text: 'npm install serverless -g',
    type: 'command'
  },
  {
    text: 'Create an AWS Lambda function in Node.js',
    type: 'comment',
    skip: true
  },
  {
    text: 'serverless create --template aws-nodejs',
    type: 'command'
  },
  {
    text: 'Deploy to live AWS account',
    type: 'comment',
    skip: true
  },
  {
    text: 'serverless deploy',
    type: 'command'
  },
  {
    text: 'Function deployed!',
    type: 'comment',
    skip: true
  },
  {
    text: 'http://api.amazon.com/users/update',
    type: 'command',
    skip: true
  },
  {
    text: '',
    type: 'empty',
    skip: true
  },
  {
    text: 'Read the <a href="https://serverless.com/framework/docs/">docs</a> or connect with the <a href="https://gitter.im/serverless/serverless">community</a>',
    type: 'cta',
    skip: true
  },
]
