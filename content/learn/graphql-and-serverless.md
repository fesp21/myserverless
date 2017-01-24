---
title: Trek10 + PlayBrain Customer Story
description: "GraphQL and Rendering HTML with Serverless"
layout: Default
---

# GraphQL and Rendering HTML with Serverless

### Background
<img width="400px" class="right" src="https://s3-us-west-2.amazonaws.com/assets.site.serverless.com/partners/playbrain.png">
<a href="http://playbrain.jp/">PlayBrain</a>, a Tokyo based creative agency for the Games Industry, works with developers and publishers to establish and promote their games by combining a deep understanding of how passion drives user loyalty and engagement with extensive advertising experience in Japan and around the world. Their clients include Riot Games, Blizzard Entertainment, Electronic Arts, Supercell, Twitch, and more.


PlayBrain was born from a belief that the best communication for games comes from gaming knowledge and advertising knowhow. Building on that belief, and a mission to spread love for games, when PlayBrain set out to develop a new community platform, <a HREF="http://dekki.com/">DEKKI</a>, Trek10 was called on to design and build a massively scalable backend infrastructure to support it.

### The Challenge

Announced at the Tokyo Game Show in September, DEKKI, described as a cross between <a href="http://www.medium.com">Medium</a> and sites like <a href="http://www.mobafire.com">Mobafire</a> and <a href="http://www.hearthpwn.com">HearthPwn</a>, promises to bring together the industry’s favorite games and platforms to enable users to share strategies and opinions on the games they love. That said, conceiving of an intuitive, multi-lingual platform that is simple to use is one thing. Delivering a user experience that differentiates itself in the fast paced, ultra-competitive gaming industry is an entirely different story.

PlayBrain had identified AWS as the infrastructure of choice for DEKKI, but in order to deliver the performance required, PlayBrain knew it needed a partner with deep expertise in leveraging AWS platform services to build serverless systems. The challenge put forward to Trek10 was simple, “Build an elegant system that is infinitely scalable… and low cost.

### Why Serverless

 Trek10 designed and built a serverless infrastructure for PlayBrain that is centered around event-driven computing with AWS Lambda. Trek10 also chose to leverage the Serverless Framework as a core technology to support PlayBrain’ project. The choice was made based not only on its team’s previous experience and deep knowledge of Serverless, but also its constant re-evaluation of all the tools and methodologies currently available in the serverless space.

<blockquote>Looking beyond the buzz, Serverless is undeniably the best framework for simplifying software development with AWS Lambda & API Gateway. Continuous integration and deployment with Serverless and Jenkins allows our clients to rapidly develop new features, maintain high code quality with good unit test coverage, and automate deployments to sandbox and production environments. <br/><b>Andy Warzon</b> - <i>Founder & CEO, Trek10</i></blockquote>

The architecture in all cases relies on the highly performant GraphQL, Lambda, API Gateway, DynamoDB (GLAD) stack and CloudFront for edge caching of static content to speed up read times of the application content. The infrastructure is managed with CloudFormation and the Serverless framework. Trek10 implemented ci/cd pipelines within a privately hosted GitLab instance to orchestrate the deployment of various Serverless stages across the development and production account, making development and software lifecycle as frictionless as possible.

To allow for a more constant iteration on content and more elegant handling of PlayBrain’s multilingual needs, Trek10 recommended leveraging a Serverless HTML generation of content, invoking lambda executions against the same consumable GraphQL API the more dynamic ReactJS frontend also consumes. Using API Gateway lambda proxying, the Serverless “HTML generation” renders highly cacheable HTML and in practically infinitely scalable way.

<img width="700px" class="center" src="https://s3-us-west-2.amazonaws.com/assets.site.serverless.com/partners/DEKKI-infrastructure.png">

### Results

 The Serverless Framework played a key role in meeting the base requirements of creating a highly available and scalable application, while reducing both the development and ownership costs. In addition to streamlining the development process by enabling Trek10 to quickly scaffold the necessary endpoints, Serverless afforded PlayBrain a simple system for continuous deployment throughout the development process.

<img width="600px" class="right" src="https://s3-us-west-2.amazonaws.com/assets.site.serverless.com/partners/DEKKIpost1.png">

Serverless allowed Trek10 and PlayBrain to work in parallel on the frontend ReactJS based editors and backend API and rendering engine. Trek10 estimates that when compared to a project leveraging typical infrastructure (EC2 / Docker based), Serverless saves roughly 40%-60% of typical infrastructure development time, allowing the Trek10 team to focus on the core value.

The operational cost estimates are roughly $1700/month to service approximately 40 million page requests, with the vast majority of that going towards CloudFront data transfer costs. At scale, Trek10 estimates the Lambda and DynamoDB costs to be less than $200/month!

One of the great wins of the Serverless framework on the Dekki project is that when Trek10 needed to add a data pipeline for pulling in and aggregating third party data, they didn’t need an entirely different tool. Scheduled Lambda functions replaced cron with a few simple lines in the Serverless configuration, and there was no need to worry about provisioning another server for data processes. All Trek10 needed to do was write concise functions and event pipelines that serviced exactly what they needed, and deploy them just like any other function. One tool, one platform, one great experience.

<blockquote> The Serverless Framework enabled us to focus on the specifics of our application’s functionality and not have to worry about endless infrastructure configuration. Pay only for what you use, let AWS handle the scaling and resiliency, and don’t look back. <br/><b> Steven Sacks</b> - <i> Director of Engineering, PlayBrain </i></blockquote>

There are no obvious bottlenecks that would keep the system from achieving as much concurrency as is needed in the future; the AWS services being used can achieve, for all practical purposes, essentially unlimited scalability, and scaling is nothing more than an issue of linear cost. More money is directly proportional to the additional scale. And of course, there is no Auto Scaling, clustering or load balancing to build & manage, no containers to create and ship, and no security patching to worry about. NoOps is still a dream, but for now, both PlayBrain and Trek10 agree that rapid development and LessOps with AWS and the Serverless Framework is a no-brainer.
