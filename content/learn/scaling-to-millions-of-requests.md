---
title: Parallax + David Guetta Customer Story
description: "How Parallax used Serverless to build a campaign for David Guetta"
layout: Default
---

# Scaling to Millions With David Guetta


### Background

<a href="https://parall.ax/" target="_blank">Parallax</a>, a UK-based digital marketing agency, was tasked with building out a web app for fans to engage with David Guetta’s new release –<a href="https://thisonesforyou.com/" target="_blank">This One’s For You</a> – the official anthem of the Union of European Football Associations (UEFA) 2016 European Championship finals.

A huge part of the marketing campaign surrounding David Guetta’s track “This One’s For You” revolved around fans collaborating on the song’s actual production. As the focal point of the official anthem of the UEFA EURO 2016 finals the app was sure to receive a lot of traffic and building a high-quality, engaging experience was of the upmost importance. The UEFA, in conjunction with sports group <a href="http://www.performgroup.com/" target="_blank">Perform</a>, tasked Parallax with building a simple, intuitive web app that clearly explains the premise, allows high fidelity voice recording and generates shareable content.

### The Challenge

Parallax needed to figure out a way of creating a virtual recording studio to enable a million unique fans to sing along with David Guetta - their voices would then be sorted and compiled for inclusion in the final song.

The main challenge they faced was creating the background architecture to handle the voice recording. UEFA required a stable platform that also looked the part, so they needed a solution that would not only meet their initial brief, but would scale to handle what could potentially be very spikey traffic.

<img src="https://s3-us-west-2.amazonaws.com/assets.site.serverless.com/blog/legacy/2016/09/Social-4.jpg">

They also had to build in the functionality to create and easily share custom content - namely, personalized album artwork featuring names and team flags. From an engagement point of view, this was absolutely essential. On top of that, the site had to work seamlessly on all devices, operate in twelve languages and incorporate embedded video content.

### Why Serverless

Parallax’s regular stack is LAMP, built on top of CloudFront, Elastic Load Balancers and EC2 nodes. In order to accomplish their goal with this stack they would have to build a queueing system for the image generation, then spin up EC2 nodes dedicated to generating those images based on the throughput.

After thinking it through, the team decided that they could accomplish the same goal much more simply using a serverless architecture on AWS Lambda. This would allow them to focus on writing the business logic in a simple Lambda function and letting Amazon do all the hard work of scaling to meet demand.

They settled on using the Serverless Framework and CloudFormation to orchestrate the entire platform in code, building a completely scaleable architecture. Development took around six or seven weeks in total, though there was plenty of research and prototyping done beforehand to determine the correct architecture design.

<blockquote>Going serverless allowed us to concentrate on writing the features without worrying about how to scale it. The Serverless Framework allowed us to stop worrying about the underlying architecture, but was flexible enough to dip into if needed. <br/><b>James Hall</b> - <i>Director at Parallax</i></blockquote>

Thanks to Node.js they were able to reuse the validation code across the frontend and backend. They could also check the proof-of-concept,and do some load testing, for free as part of the the Amazon Web Services 1 million request/month free usage tier. This meant they could play around until everything was exactly how they needed it to be.

### Results

Feedback from the client was uniformly positive. They exceeded their goal with over a million individual users and the site was visited from over 50 countries - it was even mentioned in a tweet from David Guetta himself! They also met their goals from a performance point of view. In fact, the performance turned out to follow the opposite pattern of what’s expected in traditional architectures - when they recevied more traffic, the site actually got faster.

In the end the Serverless Framework, and a serverless approach in general, helped Parallax deliver an experience that would have been much much more difficult and much more expensive using a traditional application architecture.

Check out the <a href="https://serverless.com/framework/docs/" target="_black">docs</a> to give the Serverless Framework a try yourself.
