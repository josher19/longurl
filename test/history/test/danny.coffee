auth_danny = (error, brs, status) ->
	if error then throw error
	brs.fill 'username', 'danny', ->
		brs.fill 'password', 'devitto', ->
			brs.pressButton 'Sign In', ->
				assert.equal(brs.location.pathname, '/')
				console.log "new html content " + brs.html

describe 'authenticate', ->
	it 'should successfully authenticate user danny', (auth_danny) ->
		browser.visit "https://localhost:3000/sessions/new", { debug: true }, (error, brs, st) ->
			console.log "Exploring doc " + brs.html
			auth_danny(error, brs, st)
