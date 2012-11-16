# How I got here

### discovering node and github

I don't think i've ever enjoyed getting to grips with a new language / platform as much as I have over the last few weeks with javascript / node.js. I'm not 100% sure on why, I guess its a fortunate allignment of the right technology, tools and community as well as me being in the right kind of mindset to appreciate it and finding the time to play around with it.

Regarding the tools, I want to especially big up [npm](https://npmjs.org/) which makes deploying other peoples modules so easy and painfree. It also of course makes publishing modules very straightforward, which has the lovely benefit of meaning people have devloped and shared loads of useful packages making knocking together applications really fast and fun.

Which kind of brings me to the community and to [github](https://github.com/). I'm only just getting started here really but already feel i'm starting to appreciate the whole 'social coding' / open source ethos much more than I have before. Its a great resource and of course it hosts this blog thanks to [github pages] (http://pages.github.com/).

### making this blog

When I decided to create this blog after learning about github pages, I looked around at a few static blog generators for node. None of them really felt right to me so I figured I would just make my own simple markdown to html generator using [Jade](http://jade-lang.com/). Whilst experimenting with that, I realised I wanted to be able to have the jade template include an external markdown file and parse it to html, which was not currently possible. A quick look in the issues for Jade showed a couple of other people wanting this feature so I figured I'd have a go at implementing it, my first ever [pull request](https://github.com/visionmedia/jade/pull/814#issuecomment-10378376). Still pending at the moment, so will have to see if it even makes it into a Jade release. In the meantime, i'm using it in the generator for this blog, which is a bit rough and ready at the moment, but hopefully i'll have time to refine in the coming weeks.

I should also big up the brilliant [Hakim](https://github.com/hakimel) whose [Meny](http://lab.hakim.se/meny/) experiment has helped me add a little polish to the appearance!





