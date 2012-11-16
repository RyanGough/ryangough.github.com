fs = require 'fs'
jade = require 'jade'

blogposts = fs.readdirSync('./posts')
postLayout =  fs.readFileSync('./layout/blogpost.jade', 'utf8')
pageData = []
linkIndex = []

createPage = (postfile, htmlfile) ->
  console.log "creating #{htmlfile} from #{postfile}"
  layout = postLayout.replace('#{postfile}', postfile)
  fn = jade.compile(layout, { filename: './layout/blogpost.jade' })
  fs.writeFileSync(htmlfile, fn({'index': linkIndex}))

for postfile in blogposts
  pageDataItem = {}
  pageDataItem.postfile = postfile
  pageDataItem.htmlfile = postfile.replace('.md', '.html')
  pageDataItem.dateTime = fs.statSync('./posts/' + postfile).mtime.getTime()
  pageData.push(pageDataItem)

if pageData.length

  pageData = pageData.sort (a, b) ->
     return a.dateTime - b.dateTime

  linkIndex = pageData.map (a) ->
      return a.htmlfile

	createPage(pageData[0].postfile, 'index.html')
	createPage(pageData[0].postfile, pageData[0].htmlfile)
	remainingPages = pageData.splice(1)
	for page in remainingPages
		createPage(page.postfile, page.htmlfile)