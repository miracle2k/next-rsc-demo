/**@jsxRuntime classic */
/** @jsx jsx */
import {css, jsx} from '@emotion/react';
import { Suspense } from 'react'

// Shared Components
import Spinner from '../components/spinner'

// Server Components
import SystemInfo from '../components/server-info.server'

// Client Components
import Page from '../components/page.client'
import Story from '../components/story.client'
import Footer from '../components/footer.client'

// Utils
import fetchData from '../lib/fetch-data'
import { transform } from '../lib/get-item'
import useData from '../lib/use-data'

function StoryWithData({ id }) {
  const data = useData(`s-${id}`, () => fetchData(`item/${id}`).then(transform))
  return <Story {...data} />
}

function NewsWithData() {
  const storyIds = useData('top', () => fetchData('topstories'))
  return (
    <>
      {storyIds.slice(0, 30).map((id) => {
        return (
          <Suspense fallback={<Spinner />} key={id}>
            <StoryWithData id={id} />
          </Suspense>
        )
      })}
    </>
  )
}

export default function News() {
  return (
    <Page css={css`
      font-weight: bold;
    `}>
      <Suspense fallback={<Spinner />}>
        <NewsWithData />
      </Suspense>
      <Footer />
      <SystemInfo />
    </Page>
  )
}
