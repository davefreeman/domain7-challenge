import NewsAPI from 'newsapi';
import { decorate, observable, computed } from 'mobx'

import key from './key';

const newsapi = new NewsAPI( key.key );

/**
 * Handles the interactions with the API / Maintains state for the app
**/
class NewsStore {
	page = 1;
	query = '';
	entries = [];
	isLoading = false;

	constructor()
	{
		this.next = this.next.bind( this );
		this.prev = this.prev.bind( this );
		this.goToPage = this.goToPage.bind( this );
	}

	/* -------------------------- PAGINATION FUNCTIONS ------------------------------- */

    // Fetch the current page number
    get currentPage()
    {
    	return this.page;
    }

    // Get a list of pages the user has visited ( e.g. return an array [ 1, 2, 3, ... ])
    get pages()
    {
    	if( this.page === 1 )
    	{
    		return [ 1 ];
    	}

    	const pages = [];
    	for( var i = this.page; i > 0; i-- )
    	{
    		pages.unshift( i );
    	}

    	return pages;
    }

    // Go to the prev page
	prev()
	{
		this.page -= 1;
		if( this.page <= 0 )
		{
			this.page = 1;
		}

		this.updateResults();
	}

	// Go to the next page
	next()
	{
		this.page += 1;
		this.updateResults();
	}

	// Jump to a specific page
	goToPage( e )
	{
		const target = e.currentTarget.getAttribute( 'data-page' ); 
		this.page = target;
		this.updateResults();
	}

	/* -------------------------- STATE FUNCTIONS ------------------------------- */

	// Check to see if entries exist
    get empty()
    {
    	return this.entries.length === 0;
    }

	// Get all the news entries
	get news() 
	{
		return this.entries;
	}

	// Check to see if we are loading the results
	get loading()
	{
		return this.isLoading;
	}

	// Search for the current search term
	search( query ) {
		this.page = 1;
		this.query = query;
		this.updateResults();
	}

	// Fetch new results from the API
	updateResults()
	{
		this.isLoading = true;
		newsapi.v2.everything({
			q: this.query,
			language: 'en',
			page: this.page,
		}).then( (resp) => {
			this.isLoading = false;
			this.entries = resp.articles;
		});
	}
}

// Apply mobx bindings
decorate(NewsStore, {
	page: observable,
	query: observable,
	entries: observable,
	isLoading : observable,

	news: computed,
	pages: computed,
	empty: computed,
	currentPage: computed,
});

const observableNewsStore = new NewsStore();
export default observableNewsStore;