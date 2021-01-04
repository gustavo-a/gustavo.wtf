import React from 'react'
import algoliasearch from 'algoliasearch/lite'
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom'
import SearchResults from '@components/shared/search/searchResults'

const searchClient = algoliasearch(
  '8SMK2YF7PT',
  '0e4052ce98f42ca4171937d84cede94e'
)

const searchField = () => (
  <>
    <InstantSearch searchClient={searchClient} indexName="gustavo.wtf">
      <SearchBox />
      <Hits hitComponent={SearchResults} />
    </InstantSearch>
  </>
)

export default searchField
