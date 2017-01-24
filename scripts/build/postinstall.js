// Post install to build components
const cwd = process.cwd()
const path = require('path')
const exec = require('child_process').exec
const fs = require('fs')
const rimraf = require('rimraf')
const docsConfig = require('../docs/config')
const blogConfig = require('../blog/config')
const docsRepoPath = docsConfig.serverlessRepoPath
const blogRepoPath = blogConfig.blogRepoPath
const seperator = '--------------------------'

console.log('cwd', cwd)
if (process.env.IS_NETLIFY_ENV) {
  console.log('in NETLIFY CI context, don\'t clone stuff just download it')
} else if (cwd.indexOf('node_modules') > -1) {
  console.log('in node_module context, don\'t clone/download extra stuff')
} else {
  // in normal project site. check for serverless and serverless-blog folder
  console.log(seperator)
  console.log('Installing external content')
  console.log(seperator)
    // Handle blog folder
  const blogExists = fileOrDirExists(blogRepoPath)
  const isBlogGitRepo = fileOrDirExists(path.join(blogRepoPath, '.git'))
  if (!blogExists) {
    // check for git  path.join(blogRepoPath, '.git')
    console.log('No serverless blog repo found. Clone it from github')
    cloneRepo('git@github.com:serverless/blog.git', blogConfig.repoBranch, 'serverless-blog')
  }
  if (blogExists && !isBlogGitRepo) {
    console.log('Blog folder exists but isnt github repo')
    rimraf(blogRepoPath, () => {
      console.log('Empty ./serverless-blog directory and clone repo')
      cloneRepo('git@github.com:serverless/blog.git', blogConfig.repoBranch, 'serverless-blog')
    })
  } else {
    // console.log(`Local Blog Repo found`)
    // updateRepo(blogRepoPath)
    // console.log(seperator)
  }
  if (isBlogGitRepo) {
    console.log('Local Blog Repo found')
    updateRepo(blogRepoPath)
  }

  // Handle docs folder
  const docsExists = fileOrDirExists(docsRepoPath)
  const docsIsGitRepo = fileOrDirExists(path.join(docsRepoPath, '.git'))
  if (!docsExists) {
    // check for git  path.join(blogRepoPath, '.git')
    console.log('No serverless docs repo found. Clone it from github')
    console.log(seperator)
    console.log('NOTE: serverless docs repo is big. Might take a minute to download')
    cloneRepo('git@github.com:serverless/serverless.git', docsConfig.repoBranch, 'serverless')
  }
  if (docsExists && !docsIsGitRepo) {
    console.log('Docs folder exists but isn\'t github repo')
    rimraf(docsRepoPath, () => {
      console.log('Empty ./serverless directory and clone repo')
      cloneRepo('git@github.com:serverless/serverless.git', docsConfig.repoBranch, 'serverless')
    })
  } else {
    // console.log(`Local Docs Repo found`)
    // updateRepo(docsRepoPath)
    // console.log(seperator)
  }
  if (docsIsGitRepo) {
    console.log('Local Docs Repo found')
    updateRepo(docsRepoPath)
  }
}
// TODO: replace clone with https://github.com/tunnckoCore/gitclone
function cloneRepo(repo, branch, path) {
  console.log(seperator)
  console.log(`Cloning repo down ${branch} branch of ${repo} to ./${path}`)
  const finalPath = (path) ? ` ${path}` : ''
  const command = `git clone -b ${branch} ${repo}${finalPath}`
  const child = exec(command, { cwd }, (error, stdout, stderr) => {
    if (error) {
      console.warn(error)
    }
  })
  child.stdout.on('data', (data) => {
    console.log(data)
  })
  child.stderr.on('data', (data) => {
    console.log(data)
  })
  child.on('close', (code) => {
    console.log(`${repo} successfully cloned`)
    console.log(seperator)
  })
}

function updateRepo(filePath) {
  const name = path.basename(filePath)
  console.log(`Run git pull on ./${name}`)
  const command = 'git pull'
  const child = exec(command, { cwd: filePath }, (error, stdout, stderr) => {
    if (error) {
      console.warn(error)
    }
    // console.log(stdout)
  })
  child.stdout.on('data', (data) => {
    console.log(data)
    console.log(`./${name} repo updated`)
  })
  child.stderr.on('data', (data) => {
    console.log(data)
  })
  child.on('close', (code) => {
    console.log(seperator)
  })
}

function fileOrDirExists(filePath) {
  // console.log(filePath)
  try {
    fs.statSync(filePath)
    return true
  } catch (err) {
    return false
  }
}
